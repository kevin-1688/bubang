/* ═══════════════════════════════════════════════
   BǑ-BĀNG — bubang.js  ·  Security-hardened v2
   ═══════════════════════════════════════════════ */

'use strict';

/* ─── 1. NAV SCROLL & ACTIVE LINK ────────────── */
(function initNav() {
  const nav      = document.getElementById('nav');
  if (!nav) return;
  const SECTIONS = ['hero','story','gameplay','endings','team','press','contact'];

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    let current = '';
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 100) current = id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ─── 2. MOBILE MENU ─────────────────────────── */
function toggleMenu() {
  const menu   = document.getElementById('mobile-menu');
  const burger = document.getElementById('burger');
  if (!menu || !burger) return;
  const isOpen = menu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  const menu   = document.getElementById('mobile-menu');
  const burger = document.getElementById('burger');
  if (!menu || !burger) return;
  menu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

/* ─── 3. SMOOTH ANCHOR SCROLL ────────────────── */
(function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      // Only allow same-page anchors — no javascript: or data: URIs
      const href = a.getAttribute('href');
      if (!/^#[a-zA-Z][\w-]*$/.test(href)) return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      e.preventDefault();
      closeMenu();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ─── 4. SCROLL REVEAL ───────────────────────── */
(function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || '0', 10);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .tl-item, .ending-row').forEach(el => io.observe(el));
})();

/* ─── 5. WAITLIST FORM ───────────────────────── */

// Client-side rate limit: 3 submissions per session
let _submitCount = 0;
const _SUBMIT_LIMIT = 3;

// Input sanitisation (defence-in-depth alongside server-side)
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function isValidEmail(email) {
  if (!email || email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

async function submitWaitlist() {
  // Client-side rate limit
  if (_submitCount >= _SUBMIT_LIMIT) {
    showFormStatus('error', '本次瀏覽已達提交上限，請重新整理頁面');
    return;
  }

  const nameEl    = document.getElementById('f-name');
  const emailEl   = document.getElementById('f-email');
  const roleEl    = document.getElementById('f-role');
  const messageEl = document.getElementById('f-message');
  const btn       = document.getElementById('f-submit');
  const btnText   = document.getElementById('f-submit-text');
  if (!nameEl || !emailEl || !btn || !btnText) return;

  const name    = nameEl.value.trim();
  const email   = emailEl.value.trim();
  const role    = roleEl?.value || '';
  const message = messageEl?.value.trim() || '';

  // Client-side validation
  if (name.length < 1)       { showFormStatus('error', '請填寫姓名'); return; }
  if (name.length > 100)     { showFormStatus('error', '姓名過長'); return; }
  if (!isValidEmail(email))  { showFormStatus('error', '請填寫有效的 Email'); return; }
  if (message.length > 1000) { showFormStatus('error', '留言不超過 1000 字'); return; }

  btn.disabled        = true;
  btnText.textContent = '送出中…';
  clearFormStatus();

  try {
    _submitCount++;

    const res = await fetch('/api/waitlist', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      // Send raw values — server will sanitise
      body: JSON.stringify({
        name, email,
        role:    role || 'other',
        message: message || null,
        locale:  navigator.language || 'zh-TW',
        source:  'website',
      }),
      // Abort after 10 seconds
      signal: AbortSignal.timeout(10_000),
    });

    // Only parse JSON if response has a body
    const ct   = res.headers.get('content-type') || '';
    const data = ct.includes('application/json') ? await res.json() : {};

    if (res.ok && data.success) {
      showFormStatus('success', '✓ 成功加入候補名單！確認信已寄出，感謝你的支持。');
      btnText.textContent = '已加入 ✓';
      // Clear fields
      [nameEl, emailEl, messageEl].forEach(el => { if (el) el.value = ''; });
      if (roleEl) roleEl.value = '';
    } else if (res.status === 429) {
      showFormStatus('warn', '請求過於頻繁，請稍後再試');
      btn.disabled = false;
      btnText.textContent = '加入候補名單 →';
    } else if (res.status === 409) {
      showFormStatus('warn', '這個 Email 已經在候補名單上了！');
      btn.disabled = false;
      btnText.textContent = '加入候補名單 →';
    } else {
      showFormStatus('error', escapeHtml(data.error) || '發生錯誤，請稍後再試');
      btn.disabled = false;
      btnText.textContent = '加入候補名單 →';
    }
  } catch (err) {
    const msg = err.name === 'TimeoutError' ? '請求逾時，請稍後再試' : '網路錯誤，請稍後再試';
    showFormStatus('error', msg);
    btn.disabled = false;
    btnText.textContent = '加入候補名單 →';
  }
}

function showFormStatus(type, msg) {
  const el = document.getElementById('form-status');
  if (!el) return;
  // Use textContent (never innerHTML) to avoid XSS
  el.textContent  = msg;
  el.className    = 'form-status ' + type;
  el.style.display = 'block';
}

function clearFormStatus() {
  const el = document.getElementById('form-status');
  if (el) el.style.display = 'none';
}

/* ─── 6. PRESS KIT DOWNLOAD TRACKING ────────── */
function trackDownload(kitType) {
  // Allowlist kit types on client too
  const allowed = new Set(['fact_sheet','logo_pack','screenshots','press_release']);
  if (!allowed.has(kitType)) return;

  fetch('/api/press-download', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      kit_type: kitType,
      referrer: document.referrer || null,
    }),
  }).catch(() => {}); // silent fail — tracking is non-critical
}

/* ─── 7. HERO CTA → FOCUS EMAIL INPUT ───────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-focus-email]').forEach(btn => {
    btn.addEventListener('click', () => {
      const el = document.getElementById('f-email');
      if (!el) return;
      el.focus();
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
});
