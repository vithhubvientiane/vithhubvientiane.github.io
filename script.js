// ─── LANGUAGE SWITCHER ───
function setLang(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('[data-lang="' + lang + '"]').forEach(el => el.classList.add('active'));
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    
    const activeBtn = document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
    document.documentElement.lang = lang === 'la' ? 'lo' : lang;
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

// ─── LEAD FORM SUBMISSION ───
function submitLead() {
    const name = document.getElementById('f-name').value.trim();
    const contact = document.getElementById('f-contact').value.trim();
    const product = document.getElementById('f-product').value.trim();
    const pkg = document.getElementById('f-package').value;
    const phase = document.getElementById('f-phase').value;

    if (!name || !contact) {
        if(!name) document.getElementById('f-name').style.borderColor = 'var(--red)';
        if(!contact) document.getElementById('f-contact').style.borderColor = 'var(--red)';
        return;
    }

    const msg = encodeURIComponent(
        `สนใจจองบูธ VITH Hub\n` +
        `ชื่อ/บริษัท: ${name}\n` +
        `ติดต่อ: ${contact}\n` +
        `สินค้า: ${product}\n` +
        `Package: ${pkg}\n` +
        `Phase: ${phase}`
    );

    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);

    document.getElementById('leadForm').innerHTML = `
        <div style="text-align:center;padding:2rem 1rem;">
            <div style="font-size:3rem;margin-bottom:1rem;">🎉</div>
            <div style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--gold);margin-bottom:0.5rem;">ขอบคุณมากครับ!</div>
            <p style="color:var(--muted);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
            <a href="https://line.me/ti/p/YOUR_LINE_ID?text=${msg}" target="_blank" class="pkg-btn-fill" style="text-decoration:none; padding: 12px 24px; border-radius: 99px; background: #06C755;">
                💬 ส่งข้อมูลผ่าน LINE ทันที
            </a>
        </div>
    `;
}
