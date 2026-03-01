// ─── VITH HUB · script.js ───

const LINE_ID = '@cef8930n';
const LINE_URL = 'https://line.me/ti/p/' + LINE_ID;

// ─── LANGUAGE ───
function setLang(lang) {
  // ซ่อนทุก data-lang ก่อน
  document.querySelectorAll('[data-lang]').forEach(el => el.classList.remove('active'));

  if (lang === 'la') {
    // แสดง Lao — ถ้า parent ไหนไม่มี [data-lang="la"] ให้ fallback แสดง Thai แทน
    document.querySelectorAll('[data-lang="la"]').forEach(el => el.classList.add('active'));
    document.querySelectorAll('[data-lang="th"]').forEach(el => {
      const parent = el.parentElement;
      if (!parent.querySelector('[data-lang="la"]')) {
        el.classList.add('active');
      }
    });
  } else {
    document.querySelectorAll('[data-lang="' + lang + '"]').forEach(el => el.classList.add('active'));
  }

  // อัปเดตปุ่มภาษา
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector('.lang-btn[onclick="setLang(\'' + lang + '\')"]');
  if (btn) btn.classList.add('active');

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
  const bar = document.getElementById('progressBar');
  if (bar) bar.style.width = pct + '%';
});

// ─── FLOOR PLAN (Lightbox System) ───
function openLightbox() {
  const lb = document.getElementById('floorplanLightbox');
  if (lb) {
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // ล็อกไม่ให้เลื่อนหน้าจอ
  }
}

function closeLightbox() {
  const lb = document.getElementById('floorplanLightbox');
  if (lb) {
    lb.style.display = 'none';
    // คืนค่าการเลื่อนหน้าจอให้กลับมาเป็นปกติ
    document.body.style.overflow = 'auto'; 
    document.body.style.height = 'auto';
  }
}

// เพิ่มฟีเจอร์กด Esc เพื่อปิด Lightbox
document.addEventListener('keydown', e => { 
  if (e.key === 'Escape') closeLightbox(); 
});
// ─── FAQ ───
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
  nameEl.style.borderColor = contactEl.style.borderColor = '';
  if (!name || !contact) {
    if (!name)    nameEl.style.borderColor    = 'var(--red)';
    if (!contact) contactEl.style.borderColor = 'var(--red)';
    return;
  }
  const msg = encodeURIComponent('สนใจจองบูถ VITH Hub\nชื่อ/บริษัท: '+name+'\nติดต่อ: '+contact+'\nสินค้า: '+product+'\nPackage: '+pkg+'\nPhase: '+phase);
  const toast = document.getElementById('toast');
  if (toast) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 4000); }
  document.getElementById('leadForm').innerHTML =
    '<div style="text-align:center;padding:2rem 1rem;">'+
    '<div style="font-size:3rem;margin-bottom:1rem;">🎉</div>'+
    '<div style="font-family:\'Bebas Neue\',sans-serif;font-size:2rem;margin-bottom:0.5rem;">ขอบคุณมากครับ!</div>'+
    '<p style="color:var(--muted);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง<br>inbox LINE เราได้เลยเพื่อความเร็วยิ่งขึ้น</p>'+
    '<a href="'+LINE_URL+'?text='+msg+'" target="_blank" style="display:inline-block;background:#06C755;color:#fff;padding:12px 28px;border-radius:99px;font-weight:800;font-size:0.95rem;text-decoration:none;">💬 ส่งข้อมูลผ่าน LINE ทันที</a></div>';
}

// ─── POPUP ───
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
  btn.style.background = 'rgba(6,199,85,0.15)';
  btn.style.borderColor = 'rgba(6,199,85,0.4)';
  btn.style.color = '#06C755';
  btn.disabled = true;
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

// Countdown
const POPUP_TARGET = new Date('2026-03-25T00:00:00+07:00');
function updatePopupCountdown() {
  const diff = POPUP_TARGET - new Date();
  if (diff <= 0) return;
  const s = v => String(Math.floor(v)).padStart(2,'0');
  const g = id => document.getElementById(id);
  if (g('popupDays'))  g('popupDays').textContent  = s(diff/86400000);
  if (g('popupHours')) g('popupHours').textContent = s((diff%86400000)/3600000);
  if (g('popupMins'))  g('popupMins').textContent  = s((diff%3600000)/60000);
  if (g('popupSecs'))  g('popupSecs').textContent  = s((diff%60000)/1000);
}
updatePopupCountdown();
setInterval(updatePopupCountdown, 1000);

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('vith-lang');
  if (saved && ['th','la','en'].includes(saved)) setLang(saved);
  else setLang('th');
});

// Auto-open popup
window.addEventListener('load', () => setTimeout(openPopup, 1200));
