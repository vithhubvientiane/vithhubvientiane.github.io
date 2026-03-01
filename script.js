// ─── VITH HUB · script.js ───

const LINE_ID = '@cef8930n';
const LINE_URL = 'https://line.me/ti/p/' + LINE_ID;

// ─── LANGUAGE ───
function setLang(lang) {
  // ซ่อนทุก element ที่มี data-lang
  document.querySelectorAll('[data-lang]').forEach(el => el.classList.remove('active'));
  // แสดงเฉพาะ lang ที่เลือก
  document.querySelectorAll('[data-lang="' + lang + '"]').forEach(el => el.classList.add('active'));
  // อัปเดตปุ่มภาษา — ใช้ try/catch ป้องกัน error
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  try {
    const activeBtn = document.querySelector('.lang-btn[onclick="setLang(\'' + lang + '\')"]');
    if (activeBtn) activeBtn.classList.add('active');
  } catch(e) {}
  // ตั้ง html lang attribute
  document.documentElement.lang = lang === 'la' ? 'lo' : lang;
  // บันทึกค่า
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
  const bar = document.getElementById('progressBar');
  if (bar) bar.style.width = pct + '%';
});

// ─── INTERACTIVE FLOOR PLAN ───
function showZone(zoneId) {
  document.querySelectorAll('.zone-card').forEach(card => card.classList.remove('zone-active'));
  document.querySelectorAll('.hotspot').forEach(h => h.classList.remove('active'));

  const card = document.getElementById('zone-' + zoneId);
  if (card) {
    card.classList.add('zone-active');
    card.style.opacity = '0.4';
    requestAnimationFrame(() => {
      card.style.transition = 'opacity 0.25s ease';
      card.style.opacity = '1';
    });
    if (window.innerWidth < 800) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  const hotspot = document.querySelector('[data-zone="' + zoneId + '"]');
  if (hotspot) hotspot.classList.add('active');
}

// ─── FAQ TOGGLE ───
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
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
    'สนใจจองบูถ VITH Hub\n' +
    'ชื่อ/บริษัท: ' + name + '\n' +
    'ติดต่อ: ' + contact + '\n' +
    'สินค้า: ' + product + '\n' +
    'Package: ' + pkg + '\n' +
    'Phase: ' + phase
  );

  const toast = document.getElementById('toast');
  if (toast) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 4000); }

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

// ─── POPUP FUNCTIONS ───
function openPopup() {
  const el = document.getElementById('popupOverlay');
  if (el) el.classList.add('popup-open');
}
function closePopup() {
  const el = document.getElementById('popupOverlay');
  if (el) el.classList.remove('popup-open');
}
function handlePopupOverlayClick(e) {
  if (e.target === document.getElementById('popupOverlay')) closePopup();
}
function handlePopupRemind() {
  const btn = document.getElementById('popupRemindBtn');
  if (!btn) return;
  btn.textContent = '✅ จะแจ้งให้นะครับ!';
  btn.style.background   = 'rgba(6,199,85,0.15)';
  btn.style.borderColor  = 'rgba(6,199,85,0.4)';
  btn.style.color        = '#06C755';
  btn.disabled = true;
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

// COUNTDOWN to March 25, 2026
const POPUP_TARGET = new Date('2026-03-25T00:00:00+07:00');
function updatePopupCountdown() {
  const diff = POPUP_TARGET - new Date();
  if (diff <= 0) return;
  const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = String(val).padStart(2,'0'); };
  set('popupDays',  Math.floor(diff/86400000));
  set('popupHours', Math.floor((diff%86400000)/3600000));
  set('popupMins',  Math.floor((diff%3600000)/60000));
  set('popupSecs',  Math.floor((diff%60000)/1000));
}
updatePopupCountdown();
setInterval(updatePopupCountdown, 1000);

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved language
  const saved = localStorage.getItem('vith-lang');
  if (saved && ['th', 'la', 'en'].includes(saved)) {
    setLang(saved);
  } else {
    setLang('th'); // default
  }
});

// Auto-open popup หลังหน้าโหลดเสร็จ
window.addEventListener('load', () => {
  setTimeout(openPopup, 1200);
});
