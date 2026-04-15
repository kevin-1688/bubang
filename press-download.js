// ═══════════════════════════════════════════════════
// BÚ-BĀNG — /api/press-download.js  ·  Security v2
// ═══════════════════════════════════════════════════

const SUPABASE_URL         = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ALLOWED_ORIGIN       = process.env.ALLOWED_ORIGIN || 'https://bubang.awack.tw';

const ALLOWED_KIT_TYPES = new Set(['fact_sheet','logo_pack','screenshots','press_release']);

// Simple in-memory rate limiter (same pattern as waitlist)
const rateMap = new Map();
function isRateLimited(ip) {
  const now = Date.now(), window = 60_000, limit = 20;
  const entry = rateMap.get(ip) || { count: 0, resetAt: now + window };
  if (now > entry.resetAt) { entry.count = 0; entry.resetAt = now + window; }
  entry.count++;
  rateMap.set(ip, entry);
  if (rateMap.size > 200) {
    for (const [k, v] of rateMap) { if (now > v.resetAt) rateMap.delete(k); }
  }
  return entry.count > limit;
}

// Hash IP for GDPR-friendly storage
function hashIp(ip) {
  if (!ip) return null;
  let h = 2166136261;
  for (let i = 0; i < ip.length; i++) {
    h ^= ip.charCodeAt(i);
    h = (h * 16777619) >>> 0; // FNV-1a 32-bit
  }
  return h.toString(16);
}

function setSecurityHeaders(res, origin) {
  if (origin && origin === ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cache-Control', 'no-store');
}

export default async function handler(req, res) {
  const origin = req.headers['origin'] || '';
  setSecurityHeaders(res, origin);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST')   return res.status(405).end();

  // Origin check
  if (origin && origin !== ALLOWED_ORIGIN) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Rate limit
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
             || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    res.setHeader('Retry-After', '60');
    return res.status(429).end();
  }

  const { kit_type, referrer } = req.body || {};

  // Validate kit_type against allowlist
  if (!ALLOWED_KIT_TYPES.has(kit_type)) {
    return res.status(400).json({ error: 'Invalid kit_type' });
  }

  // Sanitise referrer (only keep URL, max 500 chars)
  const cleanReferrer = typeof referrer === 'string'
    ? referrer.slice(0, 500).replace(/[<>"]/g, '')
    : null;

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/press_downloads`, {
      method: 'POST',
      headers: {
        apikey:        SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        Prefer:         'return=minimal',
      },
      body: JSON.stringify({ kit_type, ip_hash: hashIp(ip), referrer: cleanReferrer }),
    });
  } catch (err) {
    // Tracking is non-critical — swallow errors silently
    console.error('press_downloads insert error:', err);
  }

  return res.status(200).json({ success: true });
}
