// ─── VITH HUB · script.js ───

const LINE_ID = '@cef8930n';
const LINE_URL = 'https://line.me/ti/p/' + LINE_ID;

// ─── LANGUAGE ───
function setLang(lang) {
  document.querySelectorAll('[data-lang]').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('[data-lang="' + lang + '"]').forEach(el => el.classList.add('active'));
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.lang-btn[onclick="setLang(\'' + lang + '\')"]').classList.add('active');
  document.documentElement.lang = lang === 'la' ? 'lo' : lang;
  localStorage.setItem('vith-lang', lang);
}

// ─── SCROLL REVEAL ───
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── PROGRESS BAR ───
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  document.getElementById('progressBar').style.width = pct + '%';
});

// ─── INTERACTIVE FLOOR PLAN ───
function showZone(zoneId) {
  // Highlight all cards, dim non-selected
  document.querySelectorAll('.zone-card').forEach(card => {
    card.classList.remove('zone-active');
  });

  // Remove active from hotspots
  document.querySelectorAll('.hotspot').forEach(h => h.classList.remove('active'));

  // Activate selected zone card
  const card = document.getElementById('zone-' + zoneId);
  if (card) {
    card.classList.add('zone-active');
    // Animate
    card.style.opacity = '0.4';
    requestAnimationFrame(() => {
      card.style.transition = 'opacity 0.25s ease';
      card.style.opacity = '1';
    });
    // Scroll panel into view on mobile
    if (window.innerWidth < 800) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // Activate hotspot
  const hotspot = document.querySelector('[data-zone="' + zoneId + '"]');
  if (hotspot) hotspot.classList.add('active');
}

// ─── FAQ TOGGLE ───
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  // Open clicked (if it was closed)
  if (!isOpen) item.classList.add('open');
}

// ─── LEAD FORM ───
function submitLead() {
  const name    = document.getElementById('f-name').value.trim();
  const contact = document.getElementById('f-contact').value.trim();
  const product = document.getElementById('f-product').value.trim();
  const pkg     = document.getElementById('f-package').value;
  const phase   = document.getElementById('f-phase').value;

  const nameEl    = document.getElementById('f-name');
  const contactEl = document.getElementById('f-contact');
  nameEl.style.borderColor    = '';
  contactEl.style.borderColor = '';

  if (!name || !contact) {
    if (!name)    nameEl.style.borderColor    = 'var(--red)';
    if (!contact) contactEl.style.borderColor = 'var(--red)';
    return;
  }

  const msg = encodeURIComponent(
    'สนใจจองบูธ VITH Hub\n' +
    'ชื่อ/บริษัท: ' + name + '\n' +
    'ติดต่อ: ' + contact + '\n' +
    'สินค้า: ' + product + '\n' +
    'Package: ' + pkg + '\n' +
    'Phase: ' + phase
  );

  // Toast
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);

  // Thank-you state
  document.getElementById('leadForm').innerHTML =
    '<div style="text-align:center;padding:2rem 1rem;">' +
      '<div style="font-size:3rem;margin-bottom:1rem;">🎉</div>' +
      '<div style="font-family:\'Bebas Neue\',sans-serif;font-size:2rem;margin-bottom:0.5rem;">ขอบคุณมากครับ!</div>' +
      '<p style="color:var(--muted);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง<br>สามารถ inbox LINE เราได้เลยเพื่อความเร็วยิ่งขึ้น</p>' +
      '<a href="' + LINE_URL + '?text=' + msg + '" target="_blank"' +
        ' style="display:inline-block;background:#06C755;color:#fff;padding:12px 28px;border-radius:99px;font-weight:800;font-size:0.95rem;text-decoration:none;">' +
        '💬 ส่งข้อมูลผ่าน LINE ทันที' +
      '</a>' +
    '</div>';
}

// ─── PACKAGE TOGGLE (Space Only / Full Managed) ───
const PRICES = {
  space:   { a: '฿12,000', shock: '฿10,000', b: '฿7,000', c: '฿5,000' },
  managed: { a: '฿17,500', shock: '฿15,000', b: '฿12,000', c: '฿10,000' }
};

function switchPkg(mode) {
  // Toggle button states
  document.getElementById('toggleSpace').classList.toggle('active', mode === 'space');
  document.getElementById('toggleManaged').classList.toggle('active', mode === 'managed');

  // Update prices
  const p = PRICES[mode];
  document.getElementById('price-a').textContent     = p.a;
  document.getElementById('price-shock').textContent = p.shock;
  document.getElementById('price-b').textContent     = p.b;
  document.getElementById('price-c').textContent     = p.c;

  // Show/hide managed features
  const isManaged = mode === 'managed';
  ['feat-a-managed','feat-shock-managed','feat-b-managed','feat-c-managed'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = isManaged ? 'inline-flex' : 'none';
  });

  // Show/hide managed includes box
  const box = document.getElementById('managedIncludes');
  if (box) {
    box.style.display = isManaged ? 'block' : 'none';
  }

  // Update price column label
  const label = document.getElementById('priceLabel');
  if (label) {
    label.innerHTML = isManaged
      ? '<span style="color:var(--red)">Full Managed</span>'
      : '<span>Space Only</span>';
  }
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  // Restore language
  const saved = localStorage.getItem('vith-lang');
  if (saved && ['th', 'la', 'en'].includes(saved)) setLang(saved);
});

// ══════════════════════════════════
// POPUP: VITH × BIG C · ขอบใจเด้อ
// ══════════════════════════════════

function openPopup() {
  document.getElementById('popupOverlay').classList.add('popup-open');
}
function closePopup() {
  document.getElementById('popupOverlay').classList.remove('popup-open');
}
function handlePopupOverlayClick(e) {
  if (e.target === document.getElementById('popupOverlay')) closePopup();
}
function handlePopupRemind() {
  const btn = document.getElementById('popupRemindBtn');
  btn.textContent = '✅ จะแจ้งให้นะครับ!';
  btn.style.cssText += ';background:rgba(6,199,85,0.15);border-color:rgba(6,199,85,0.4);color:#06C755;';
  btn.disabled = true;
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

// COUNTDOWN to March 25, 2026
const POPUP_TARGET = new Date('2026-03-25T00:00:00+07:00');
function updatePopupCountdown() {
  const diff = POPUP_TARGET - new Date();
  if (diff <= 0) { return; }
  document.getElementById('popupDays').textContent  = String(Math.floor(diff/86400000)).padStart(2,'0');
  document.getElementById('popupHours').textContent = String(Math.floor((diff%86400000)/3600000)).padStart(2,'0');
  document.getElementById('popupMins').textContent  = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
  document.getElementById('popupSecs').textContent  = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
}
updatePopupCountdown();
setInterval(updatePopupCountdown, 1000);

// Auto-open: แสดงครั้งแรกที่เปิดเว็บ (ถ้ายังไม่เคยปิด session นี้)
window.addEventListener('load', () => {
  if (!sessionStorage.getItem('popupSeen')) {
    setTimeout(openPopup, 1200);
    sessionStorage.setItem('popupSeen', '1');
  }
});
