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
  // Hide all zone cards
  document.querySelectorAll('.zone-card').forEach(card => card.classList.add('hidden'));
  // Remove active from all hotspots
  document.querySelectorAll('.hotspot').forEach(h => h.classList.remove('active'));

  // Show selected zone
  const card = document.getElementById('zone-' + zoneId);
  if (card) {
    card.classList.remove('hidden');
    // Animate in
    card.style.opacity = '0';
    card.style.transform = 'translateY(12px)';
    requestAnimationFrame(() => {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }

  // Activate clicked hotspot
  const hotspot = document.querySelector('[data-zone="' + zoneId + '"]');
  if (hotspot) hotspot.classList.add('active');

  // On mobile: scroll to panel
  if (window.innerWidth < 800) {
    const panel = document.querySelector('.floorplan-panel');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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
