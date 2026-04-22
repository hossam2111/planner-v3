const fs = require('fs');

let html = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/index.html', 'utf8');

// 1. Fix the tabs inline style
const tabsStr = `<div class="tabs" style="margin-inline:16px;max-width:828px">`;
html = html.replace(tabsStr, `<div class="tabs">`);

// 2. Add PWA Install Banner inside scApp, before hdr
const appScreenHdr = `    <!-- Header -->`;
const pwaBanner = `    <!-- PWA Install Banner -->
    <div id="pwaInstallBanner" style="display:none; background:var(--s2); border:1px solid var(--gold); border-radius:var(--rsm); padding:10px 16px; margin:20px 16px 0; align-items:center; justify-content:space-between; animation:fadeUp 0.3s ease; box-shadow:var(--shg)">
      <div>
        <div style="font-weight:900; color:var(--gold2); font-size:0.85rem; margin-bottom:2px">تثبيت التطبيق</div>
        <div style="font-size:0.68rem; color:var(--t2)">أضف "مخططي" للشاشة الرئيسية لسهولة الوصول</div>
      </div>
      <button onclick="installPWA()" style="background:linear-gradient(135deg,var(--gold2),var(--gold)); color:#000; border:none; border-radius:4px; padding:6px 14px; font-family:'Tajawal',sans-serif; font-weight:800; font-size:0.75rem; cursor:pointer;">تثبيت</button>
    </div>

    <!-- Header -->`;
html = html.replace(appScreenHdr, pwaBanner);
fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/index.html', html, 'utf8');


let js = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', 'utf8');

// 3. Add PWA Javascript logic at the bottom
const pwaCode = `
/* ══════════════════════════════
   PWA INSTALLATION
══════════════════════════════ */
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('pwaInstallBanner');
  if(banner) {
    banner.style.display = 'flex';
  }
});
window.installPWA = async function() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      const banner = document.getElementById('pwaInstallBanner');
      if(banner) banner.style.display = 'none';
    }
    deferredPrompt = null;
  }
};
`;
if(!js.includes('installPWA')) {
    fs.appendFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', pwaCode, 'utf8');
}


let css = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/style.css', 'utf8');
// 4. Force 16px font-size on inputs to stop iOS Safari zoom
const cssAdds = `
/* Mobile Input Zoom Fixes */
.add-inp, .t-note-inp, .field-inp, .edit-inp { font-size: 16px !important; }
.tabs { margin-inline: 0 !important; max-width: 100% !important; }
.login-box { max-width: 90% !important; }
`;
if(!css.includes('Mobile Input Zoom Fixes')) {
    fs.appendFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/style.css', cssAdds, 'utf8');
}

console.log("Fixes applied successfully.");
