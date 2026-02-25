// ─── การจัดการภาษา ───
function setLang(lang) {
  document.querySelectorAll('[data-lang]').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('[data-lang="' + lang + '"]').forEach(el => el.classList.add('active'));
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  
  // เพิ่ม active ให้ปุ่มที่คลิก
  const activeBtn = Array.from(document.querySelectorAll('.lang-btn')).find(b => b.textContent.toLowerCase().includes(lang === 'la' ? 'lao' : lang));
  if (activeBtn) activeBtn.classList.add('active');
}

// ─── ระบบ Scroll Reveal (Animation) ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── แถบความคืบหน้า (Progress Bar) ───
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
});

// ─── การส่งข้อมูลผ่าน LINE ───
function submitLead() {
  const name = document.getElementById('f-name').value;
  const contact = document.getElementById('f-contact').value;
  if (!name || !contact) return alert('กรุณากรอกข้อมูลให้ครบถ้วน');
  
  const msg = encodeURIComponent(`สนใจจองบูธ VITH Hub\nชื่อ: ${name}\nติดต่อ: ${contact}`);
  window.open(`https://line.me/ti/p/YOUR_LINE_ID?text=${msg}`, '_blank');
}
