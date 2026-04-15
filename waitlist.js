// ═══════════════════════════════════════════════════
// BÚ-BĀNG — /api/waitlist.js
// Vercel Serverless Function  ·  Security-hardened v2
// ═══════════════════════════════════════════════════

const SUPABASE_URL         = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const RESEND_API_KEY       = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL         = process.env.NOTIFY_EMAIL || 'studio@awack.tw';
const ALLOWED_ORIGIN       = process.env.ALLOWED_ORIGIN || 'https://bubang.awack.tw';

// ── In-memory rate limiter (per cold-start instance) ──────────────
// For production, replace with Upstash Redis or Vercel KV.
const rateMap = new Map(); // ip → { count, resetAt }

function isRateLimited(ip) {
  const now    = Date.now();
  const window = 60_000;  // 1 minute
  const limit  = 5;       // max 5 submissions / IP / minute

  const entry = rateMap.get(ip) || { count: 0, resetAt: now + window };
  if (now > entry.resetAt) {
    entry.count   = 0;
    entry.resetAt = now + window;
  }
  entry.count++;
  rateMap.set(ip, entry);

  // Prune stale entries every ~200 requests to avoid unbounded growth
  if (rateMap.size > 200) {
    for (const [k, v] of rateMap) {
      if (now > v.resetAt) rateMap.delete(k);
    }
  }

  return entry.count > limit;
}

// ── Input sanitisation ─────────────────────────────────────────────
function stripHtml(str) {
  return str.replace(/<[^>]*>/g, '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;',
  }[c]));
}

function isValidEmail(email) {
  // RFC-5321 practical limit: 254 chars; local part ≤ 64
  if (!email || email.length > 254) return false;
  const [local, domain] = email.split('@');
  if (!local || !domain || local.length > 64) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

const ALLOWED_ROLES = new Set(['player','press','publisher','investor','partner','other']);

// ── Supabase helper ────────────────────────────────────────────────
function supabaseFetch(path, options = {}) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('Supabase env vars missing');
  }
  return fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...options,
    headers: {
      apikey:        SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer:         'return=minimal',
      ...(options.headers || {}),
    },
  });
}

// ── Email helper ───────────────────────────────────────────────────
async function sendEmail({ to, subject, html }) {
  if (!RESEND_API_KEY) return;
  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: 'BÚ-BĀNG <noreply@awack.tw>', to, subject, html }),
  });
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
  }
}

// ── Security headers helper ────────────────────────────────────────
function setSecurityHeaders(res, origin) {
  const allowed = ALLOWED_ORIGIN;

  // Only allow the real site origin — not wildcard
  if (origin && origin === allowed) {
    res.setHeader('Access-Control-Allow-Origin', allowed);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Harden response
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Security-Policy', "default-src 'none'");
}

// ── Main handler ───────────────────────────────────────────────────
export default async function handler(req, res) {
  const origin = req.headers['origin'] || '';
  setSecurityHeaders(res, origin);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  // ① Origin check (CSRF-lite for browser requests)
  if (origin && origin !== ALLOWED_ORIGIN) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // ② Content-Type guard
  const ct = req.headers['content-type'] || '';
  if (!ct.includes('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }

  // ③ Rate limiting
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
             || req.socket?.remoteAddress
             || 'unknown';
  if (isRateLimited(ip)) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: '請求過於頻繁，請稍後再試' });
  }

  // ④ Parse & validate body
  const body = req.body || {};

  // Reject unexpected large payloads (Vercel already limits to 1MB but be explicit)
  if (JSON.stringify(body).length > 8_000) {
    return res.status(413).json({ error: 'Payload too large' });
  }

  const { name, email, role, message, locale, source } = body;

  if (!name  || typeof name  !== 'string') return res.status(400).json({ error: '請填寫姓名' });
  if (!email || typeof email !== 'string') return res.status(400).json({ error: '請填寫 Email' });

  const cleanName    = stripHtml(name.trim()).slice(0, 100);
  const cleanEmail   = email.trim().toLowerCase().slice(0, 254);
  const cleanRole    = ALLOWED_ROLES.has(role) ? role : 'other';
  const cleanMessage = message && typeof message === 'string'
                       ? stripHtml(message.trim()).slice(0, 1000)
                       : null;
  const cleanLocale  = typeof locale === 'string' ? locale.slice(0, 10) : 'zh-TW';
  const cleanSource  = typeof source === 'string' ? source.slice(0, 50) : 'website';

  if (cleanName.length < 1)   return res.status(400).json({ error: '請填寫姓名' });
  if (!isValidEmail(cleanEmail)) return res.status(400).json({ error: '請填寫有效的 Email' });

  // ⑤ Insert to Supabase
  let insertRes;
  try {
    insertRes = await supabaseFetch('/waitlist', {
      method: 'POST',
      body: JSON.stringify({
        name: cleanName, email: cleanEmail, role: cleanRole,
        message: cleanMessage, locale: cleanLocale, source: cleanSource,
      }),
    });
  } catch (err) {
    console.error('Supabase fetch error:', err);
    return res.status(502).json({ error: '後端服務暫時無法使用，請稍後再試' });
  }

  if (insertRes.status === 409) {
    return res.status(409).json({ error: '這個 Email 已經在候補名單上了！' });
  }
  if (!insertRes.ok) {
    console.error('Supabase insert failed:', insertRes.status, await insertRes.text());
    return res.status(500).json({ error: '伺服器錯誤，請稍後再試' });
  }

  // ⑥ Emails (fire-and-forget, non-blocking)
  const roleLabels = {
    player:'玩家', press:'媒體', publisher:'發行商',
    investor:'投資人', partner:'合作夥伴', other:'其他',
  };

  // Confirmation to registrant
  sendEmail({
    to: cleanEmail,
    subject: 'BÚ-BĀNG 毋忘 — 你已加入候補名單',
    html: `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"></head>
<body style="background:#090810;color:#D4C9B8;font-family:Georgia,serif;margin:0;padding:0">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;padding:48px 24px">
<tr><td>
  <p style="font-family:monospace;font-size:11px;letter-spacing:.2em;color:#4a4540;text-transform:uppercase;margin-bottom:2rem">台灣 · 1952 · 白色恐怖時期</p>
  <h1 style="font-size:2.5rem;font-weight:400;letter-spacing:.05em;margin-bottom:.5rem;line-height:1">BÚ-BĀNG</h1>
  <p style="font-family:monospace;font-size:.8rem;letter-spacing:.3em;color:#8a7f70;margin-bottom:3rem">毋忘 · 無望</p>
  <p style="font-size:1.1rem;line-height:1.9;margin-bottom:1.5rem">Hi ${cleanName}，</p>
  <p style="font-size:1rem;line-height:1.9;color:#8a7f70;margin-bottom:1.5rem">
    你已成功加入 BÚ-BĀNG 候補名單。MVP 上線時，你會是第一批收到通知的人。
  </p>
  <p style="font-style:italic;font-size:1rem;line-height:1.9;border-left:2px solid #C4622D;padding-left:1.25rem;margin-bottom:2.5rem">
    「在一切都被剝奪的年代，身體是最後的自由。」
  </p>
  <p style="font-family:monospace;font-size:10px;letter-spacing:.12em;color:#4a4540;border-top:1px solid rgba(212,201,184,.1);padding-top:1.5rem">
    © 2026 Awack Studio · BÚ-BĀNG
  </p>
</td></tr></table></body></html>`,
  }).catch(err => console.error('Confirm email error:', err));

  // Internal notification
  sendEmail({
    to: NOTIFY_EMAIL,
    subject: `[BÚ-BĀNG] 新報名：${cleanName} (${roleLabels[cleanRole]})`,
    html: `<table style="font-family:monospace;font-size:13px;border-collapse:collapse;width:100%">
<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#999;width:80px">姓名</td><td style="padding:8px;border-bottom:1px solid #eee">${cleanName}</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#999">Email</td><td style="padding:8px;border-bottom:1px solid #eee">${cleanEmail}</td></tr>
<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#999">身份</td><td style="padding:8px;border-bottom:1px solid #eee">${roleLabels[cleanRole]}</td></tr>
<tr><td style="padding:8px;color:#999;vertical-align:top">留言</td><td style="padding:8px">${cleanMessage || '—'}</td></tr>
</table>`,
  }).catch(err => console.error('Notify email error:', err));

  return res.status(200).json({ success: true, message: '成功加入候補名單！確認信已寄出。' });
}
