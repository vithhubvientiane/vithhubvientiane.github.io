// ─── การสลับภาษา ───
function setLang(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('[data-lang="' + lang + '"]').forEach(el => el.classList.add('active'));
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    
    // ค้นหาปุ่มที่กดและเพิ่มคลาส active
    const activeBtn = document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
}

// ─── ระบบ Scroll Reveal (ทำให้เนื้อหาค่อยๆ เลื่อนขึ้นมา) ───
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── แถบ Progress Bar ด้านบน ───
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
});
