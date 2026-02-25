// สลับภาษา
function setLang(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('[data-lang="' + lang + '"]').forEach(el => el.classList.add('active'));
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    
    // หาปุ่มที่กดตามภาษา
    const currentBtn = Array.from(document.querySelectorAll('.lang-btn')).find(b => b.textContent.toLowerCase().includes(lang === 'la' ? 'lao' : lang));
    if (currentBtn) currentBtn.classList.add('active');
}

// เลื่อนแสดงผล (Scroll Reveal)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// แถบ Progress Bar
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
});

// ส่งข้อมูล
function submitLead() {
    const name = document.getElementById('f-name').value;
    const contact = document.getElementById('f-contact').value;
    if(!name || !contact) return alert('กรุณากรอกข้อมูลให้ครบ');
    window.open(`https://line.me/ti/p/YOUR_LINE_ID?text=สนใจจองบูธ: ${name} (${contact})`, '_blank');
}
