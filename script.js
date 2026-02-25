// สลับภาษา
function setLang(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('[data-lang="' + lang + '"]').forEach(el => el.classList.add('active'));
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    
    // ค้นหาปุ่มที่ถูกคลิก
    const btns = document.querySelectorAll('.lang-btn');
    btns.forEach(btn => {
        if(btn.innerText.toLowerCase().includes(lang === 'la' ? 'lao' : lang)) {
            btn.classList.add('active');
        }
    });
    document.documentElement.lang = lang === 'la' ? 'lo' : lang;
}

// Scroll Reveal
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Progress Bar
window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    document.getElementById('progressBar').style.width = pct + '%';
});

// ฟังก์ชันส่งข้อมูล (Lead Form)
function submitLead() {
    const name = document.getElementById('f-name').value;
    const contact = document.getElementById('f-contact').value;
    if(!name || !contact) return alert('กรุณากรอกชื่อและเบอร์ติดต่อ');
    
    const msg = encodeURIComponent(`สนใจจองบูธ VITH Hub\nชื่อ: ${name}\nติดต่อ: ${contact}`);
    window.open(`https://line.me/ti/p/YOUR_LINE_ID?text=${msg}`, '_blank');
}
