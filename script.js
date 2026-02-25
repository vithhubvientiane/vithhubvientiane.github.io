// Scroll Reveal System
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
});

// Language Switcher (Simple Version)
function setLang(lang) {
    alert("ระบบภาษากำลังอัปเดตข้อมูลภาษา " + lang.toUpperCase());
    // ส่วนนี้สามารถเพิ่มระบบสลับข้อความในอนาคตได้ครับ
}

// Form Submit
function submitLead() {
    const name = document.getElementById('f-name').value;
    const contact = document.getElementById('f-contact').value;
    if(!name || !contact) return alert('กรุณากรอกข้อมูลให้ครบ');
    window.open(`https://line.me/ti/p/YOUR_LINE_ID?text=สนใจจองบูธจากคุณ ${name} (${contact})`, '_blank');
}
