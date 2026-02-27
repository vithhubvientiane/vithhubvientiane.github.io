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
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── PROGRESS BAR ───
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  document.getElementById('progressBar').style.width = pct + '%';
});

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

  // Show toast
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

// ─── RESTORE LANG ON LOAD ───
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('vith-lang');
  if (saved && ['th','la','en'].includes(saved)) setLang(saved);
});
