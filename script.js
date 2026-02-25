function setLang(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('[data-lang="' + lang + '"]').forEach(el => el.classList.add('active'));
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
}

// ระบบ Scroll Reveal และ Progress Bar จากโค้ดเดิมของคุณ
window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    document.getElementById('progressBar').style.width = pct + '%';
});

function submitLead() {
    // ดึงค่าจาก Form และส่งไป LINE (ตามโค้ดต้นฉบับของคุณ)
}
