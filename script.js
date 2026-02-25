function setLang(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('[data-lang="' + lang + '"]').forEach(el => el.classList.add('active'));
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = Array.from(document.querySelectorAll('.lang-btn')).find(b => b.textContent.toLowerCase().includes(lang === 'la' ? 'lao' : lang));
    if (activeBtn) activeBtn.classList.add('active');
    document.documentElement.lang = (lang === 'la' ? 'lo' : lang);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
});

function submitLead() {
    const name = document.getElementById('f-name').value;
    const contact = document.getElementById('f-contact').value;
    if (!name || !contact) return alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    const msg = encodeURIComponent(`สนใจจองบูธ VITH Hub\nชื่อ/บริษัท: ${name}\nติดต่อ: ${contact}`);
    window.open(`https://line.me/ti/p/YOUR_LINE_ID?text=${msg}`, '_blank');
}
