const LINE_URL = 'https://line.me/ti/p/@cef8930n';

// 1. ระบบภาษา
function setLang(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => el.classList.remove('active'));
    document.querySelectorAll(`[data-lang="${lang}"]`).forEach(el => el.classList.add('active'));
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang-select') === lang);
    });
    localStorage.setItem('vith-lang', lang);
}

// 2. ระบบสลับราคา (Toggle)
const PRICES = {
    space:   { a: '฿12,000', b: '฿7,000' },
    managed: { a: '฿17,500', b: '฿12,000' }
};

function switchPkg(mode) {
    document.getElementById('toggleSpace').classList.toggle('active', mode === 'space');
    document.getElementById('toggleManaged').classList.toggle('active', mode === 'managed');

    document.getElementById('price-a').innerText = PRICES[mode].a;
    document.getElementById('price-b').innerText = PRICES[mode].b;
    document.getElementById('priceLabel').innerText = (mode === 'managed') ? 'Full Managed' : 'Space Only';

    document.getElementById('managedIncludes').style.display = (mode === 'managed') ? 'block' : 'none';
}

// 3. แผนผังบูธ
function showZone(zoneId) {
    document.querySelectorAll('.zone-card').forEach(c => c.style.display = 'none');
    const activeCard = document.getElementById(`zone-${zoneId}`);
    if(activeCard) {
        activeCard.style.display = 'block';
        if(window.innerWidth < 800) activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// 4. ส่งฟอร์ม (LINE Redirect)
function submitLead() {
    const name = document.getElementById('f-name').value;
    if(!name) return alert("กรุณากรอกชื่อ");
    
    document.getElementById('toast').classList.add('show');
    setTimeout(() => {
        window.open(`${LINE_URL}?text=สนใจจองบูธชื่อ:${name}`, '_blank');
    }, 1000);
}

// 5. Popup & Scroll Reveal
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('popupOverlay').classList.add('popup-open'), 1500);
});

function closePopup() { document.getElementById('popupOverlay').classList.remove('popup-open'); }

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
