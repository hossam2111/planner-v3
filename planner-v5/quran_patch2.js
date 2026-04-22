const fs = require('fs');

/* --- UPDATE APP.JS --- */
let appJs = fs.readFileSync('app.js', 'utf8');

// 1. Add quranPage to defaultState
appJs = appJs.replace('wird: {},', 'wird: {},\n    quranPage: 1,');

// 2. Add functions
const quranFunctions = [
"/* ══════════════════════════════",
"   QURAN READER",
"══════════════════════════════ */",
"function openQuranReader() {",
"  if (!S.quranPage) S.quranPage = 1;",
"  document.getElementById('quranOverlay').style.display = 'flex';",
"  renderQuranPage();",
"}",
"",
"function closeQuranReader() {",
"  document.getElementById('quranOverlay').style.display = 'none';",
"  saveState();",
"  showToast('تم حفظ تقدمك بنجاح', 'gold');",
"}",
"",
"function changeQuranPage(step) {",
"  let p = S.quranPage + step;",
"  if (p < 1) p = 1;",
"  if (p > 604) p = 604;",
"  S.quranPage = p;",
"  renderQuranPage();",
"}",
"",
"function renderQuranPage() {",
"  const p = S.quranPage;",
"  const pStr = p.toString().padStart(3, '0');",
"  const imgUrl = 'https://files.quran.app/hafs/madani/width_1024/page' + pStr + '.png';",
"  ",
"  const imgEl = document.getElementById('quranPageImg');",
"  const loader = document.getElementById('quranLoader');",
"  ",
"  loader.style.display = 'block';",
"  imgEl.style.opacity = '0';",
"  ",
"  imgEl.onload = function() {",
"    loader.style.display = 'none';",
"    imgEl.style.opacity = '1';",
"  };",
"  ",
"  imgEl.onerror = function() {",
"    loader.textContent = 'خطأ في التحميل، تأكد من اتصالك بالإنترنت';",
"  };",
"  ",
"  imgEl.src = imgUrl;",
"  document.getElementById('quranPageNum').textContent = 'صفحة ' + p;",
"}"
].join('\\n');

if (!appJs.includes('openQuranReader')) {
    appJs += '\\n' + quranFunctions;
    fs.writeFileSync('app.js', appJs, 'utf8');
}


/* --- UPDATE INDEX.HTML --- */
let html = fs.readFileSync('index.html', 'utf8');

// A. Quran Overlay
const overlayHtml = [
"<!--  QURAN READER OVERLAY  -->",
"<div class=\"quran-overlay\" id=\"quranOverlay\" style=\"display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:#111823; z-index:10000; flex-direction:column;\">",
"  ",
"  <div style=\"background:var(--s2); padding:15px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--bdr); padding-top:calc(15px + env(safe-area-inset-top));\">",
"    <button onclick=\"closeQuranReader()\" style=\"background:linear-gradient(135deg, var(--gold2), var(--gold)); border:none; border-radius:8px; padding:8px 15px; color:#000; font-family:'Tajawal', sans-serif; font-weight:900; font-size:0.95rem; cursor:pointer;\">",
"      حفظ وإغلاق ✓",
"    </button>",
"    <div style=\"font-weight:800; color:var(--t2); font-size:1.2rem;\">القرآن الكريم</div>",
"  </div>",
"",
"  <div style=\"flex:1; overflow-y:auto; overflow-x:hidden; position:relative; display:flex; justify-content:center; align-items:center; background:#0a0f16; touch-action: pan-y;\" id=\"quranImgContainer\">",
"    <div id=\"quranLoader\" style=\"position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:var(--gold); font-size:1.2rem; font-weight:700;\">جاري التحميل...</div>",
"    <img id=\"quranPageImg\" src=\"\" style=\"width:100%; max-width:600px; height:auto; opacity:0; transition:opacity 0.3s;\" alt=\"Quran Page\">",
"    <!-- Tap Zones -->",
"    <div onclick=\"changeQuranPage(1)\" style=\"position:absolute; left:0; top:0; width:50%; height:100%; cursor:pointer;\"></div>",
"    <div onclick=\"changeQuranPage(-1)\" style=\"position:absolute; right:0; top:0; width:50%; height:100%; cursor:pointer;\"></div>",
"  </div>",
"",
"  <div style=\"background:var(--s2); padding:10px 15px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--bdr); padding-bottom:calc(10px + env(safe-area-inset-bottom));\">",
"    <button onclick=\"changeQuranPage(1)\" style=\"background:rgba(255,255,255,0.05); border:1px solid var(--bdr); border-radius:8px; padding:10px 20px; color:var(--t1); font-family:'Tajawal', sans-serif; font-weight:700; cursor:pointer;\">التالي »</button>",
"    <div id=\"quranPageNum\" style=\"color:var(--gold); font-weight:800; font-size:1.1rem; background:var(--golddim); padding:4px 15px; border-radius:20px;\">صفحة 1</div>",
"    <button onclick=\"changeQuranPage(-1)\" style=\"background:rgba(255,255,255,0.05); border:1px solid var(--bdr); border-radius:8px; padding:10px 20px; color:var(--t1); font-family:'Tajawal', sans-serif; font-weight:700; cursor:pointer;\">« السابق</button>",
"  </div>",
"</div>"
].join('\\n');

if (!html.includes('id="quranOverlay"')) {
    html = html.replace('</body>', overlayHtml + '\\n</body>');
}

// B. Update Wird popup button to open Quran Reader
let oldStr = "onclick=\"document.getElementById('wirdWelcomeModal').style.display='none'; tab('wird', document.querySelectorAll('.tab')[1])\"";
let newStr = "onclick=\"document.getElementById('wirdWelcomeModal').style.display='none'; openQuranReader()\"";

html = html.replace(oldStr, newStr);

// C. Read Quran button
const btnHtml = "<button onclick=\"openQuranReader()\" style=\"width:100%; padding:14px; background:linear-gradient(135deg, var(--gold2), var(--gold)); border:none; border-radius:12px; color:#000; font-family:'Tajawal', sans-serif; font-size:1.1rem; font-weight:900; cursor:pointer; margin-bottom:15px; display:flex; align-items:center; justify-content:center; gap:10px; box-shadow:0 8px 20px rgba(200,168,75,0.15);\">📖 فتح المصحف وقراءة الورد</button>";

if (!html.includes('فتح المصحف وقراءة الورد')) {
    html = html.replace('<div class="ayah-card">', btnHtml + '\\n        <div class="ayah-card">');
}

fs.writeFileSync('index.html', html, 'utf8');

/* --- BUMP SW.JS --- */
let sw = fs.readFileSync('sw.js', 'utf8');
sw = sw.replace(/v[0-9]+/, 'v10'); // Bump cache to v10
fs.writeFileSync('sw.js', sw, 'utf8');

console.log("Quran patched successfully!");
