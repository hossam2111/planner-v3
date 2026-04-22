const fs = require('fs');

let html = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/index.html', 'utf8');

// 1. Remove the old banner
const bannerHtml = `    <!-- PWA Install Banner -->
    <div id="pwaInstallBanner" style="display:none; background:var(--s2); border:1px solid var(--gold); border-radius:var(--rsm); padding:10px 16px; margin:20px 16px 0; align-items:center; justify-content:space-between; animation:fadeUp 0.3s ease; box-shadow:var(--shg)">
      <div>
        <div style="font-weight:900; color:var(--gold2); font-size:0.85rem; margin-bottom:2px">تثبيت التطبيق</div>
        <div style="font-size:0.68rem; color:var(--t2)">أضف "مخططي" للشاشة الرئيسية لسهولة الوصول</div>
      </div>
      <button onclick="installPWA()" style="background:linear-gradient(135deg,var(--gold2),var(--gold)); color:#000; border:none; border-radius:4px; padding:6px 14px; font-family:'Tajawal',sans-serif; font-weight:800; font-size:0.75rem; cursor:pointer;">تثبيت</button>
    </div>`;
if (html.includes(bannerHtml)) {
    html = html.replace(bannerHtml, "");
} else {
    // try replacing with regex if formatting differs
    html = html.replace(/<!-- PWA Install Banner -->[\s\S]*?<\/button>\s*<\/div>/g, '');
}

// 2. Insert new Modal
const modalHtml = `
<!-- PWA Install Modal -->
<div class="pomo-overlay" id="pwaInstallModal" style="display:none; z-index:9999;">
  <div style="position:relative; width:90%; max-width:360px; background:#111823; border:1px solid rgba(200,168,75,.2); border-radius:24px; padding:30px 20px; text-align:center; box-shadow:0 15px 40px rgba(0,0,0,0.6), 0 0 30px rgba(200,168,75,0.1); animation: fadeUp 0.3s ease">
    
    <button onclick="document.getElementById('pwaInstallModal').style.display='none'" style="position:absolute; top:15px; left:15px; width:30px; height:30px; border-radius:50%; background:transparent; border:2px solid #8997aa; color:#8997aa; font-size:1.1rem; line-height:26px; cursor:pointer; display:flex; align-items:center; justify-content:center;">&times;</button>
    
    <div style="width:75px; height:75px; margin:0 auto 20px; border-radius:20px; background:#162030; display:flex; align-items:center; justify-content:center; box-shadow:0 0 25px rgba(200,168,75,0.4); border:2px solid var(--gold);">
      <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="var(--gold2)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    </div>
    
    <h2 style="font-size:1.4rem; font-weight:900; color:#fff; margin-bottom:8px">تثبيت التطبيق</h2>
    <p style="font-size:0.85rem; color:#8997aa; margin-bottom:28px; line-height:1.6">ثبّت التطبيق على جهازك للوصول السريع وتجربة أفضل</p>
    
    <div style="text-align:right; margin-bottom:28px; padding-right:10px">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px">
        <div style="width:36px; height:36px; border-radius:50%; background:rgba(74,159,255,0.1); display:flex; align-items:center; justify-content:center; color:#4a9fff;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
        </div>
        <span style="font-size:0.85rem; font-weight:700; color:#e6dcc8">وصول سريع من الشاشة الرئيسية</span>
      </div>
      <div style="display:flex; align-items:center; gap:12px">
        <div style="width:36px; height:36px; border-radius:50%; background:rgba(46,201,138,0.1); display:flex; align-items:center; justify-content:center; color:#2ec98a;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        </div>
        <span style="font-size:0.85rem; font-weight:700; color:#e6dcc8">يعمل بدون انترنت</span>
      </div>
    </div>

    <button onclick="installPWA()" style="width:100%; padding:14px; background:linear-gradient(135deg, #a66cf5, #6c46e3); border:none; border-radius:12px; color:#fff; font-family:'Tajawal', sans-serif; font-size:1rem; font-weight:800; cursor:pointer; margin-bottom:12px; display:flex; align-items:center; justify-content:center; gap:10px; transition: opacity .2s">
      تثبيت التطبيق
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
    </button>
    <button onclick="document.getElementById('pwaInstallModal').style.display='none'" style="background:none; border:none; color:#8997aa; font-family:'Tajawal', sans-serif; font-size:0.85rem; font-weight:700; cursor:pointer; padding:8px; opacity:0.8">التثبيت لاحقاً</button>
  </div>
</div>
`;
if (!html.includes('pwaInstallModal')) {
    html = html.replace('</body>', `${modalHtml}\n</body>`);
    fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/index.html', html, 'utf8');
}

let appJs = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', 'utf8');
appJs = appJs.replace(/pwaInstallBanner/g, 'pwaInstallModal');
fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', appJs, 'utf8');

console.log("Replaced PWA banner with full Modal!");
