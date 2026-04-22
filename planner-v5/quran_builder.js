const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'app.js');
const indexHtmlPath = path.join(__dirname, 'index.html');
const styleCssPath = path.join(__dirname, 'style.css');

let appJs = fs.readFileSync(appJsPath, 'utf8');
let html = fs.readFileSync(indexHtmlPath, 'utf8');
let css = fs.readFileSync(styleCssPath, 'utf8');

// 1. UPDATE INDEX.HTML WITH NEW UI
const newQuranOverlay = `
<!--  QURAN READER OVERLAY  -->
<div class="quran-overlay" id="quranOverlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:var(--bg); z-index:10000; flex-direction:column;">
  
  <div class="quran-header" style="background:var(--s2); display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--bdr); padding:calc(10px + env(safe-area-inset-top)) 15px 10px 15px;">
    <!-- Index Button -->
    <button onclick="toggleQuranIndex()" style="background:transparent; border:none; color:var(--t2); font-size:1.4rem; cursor:pointer;">
      <i class="fas fa-list-ul"></i>
    </button>
    
    <!-- Title Info -->
    <div style="text-align:center;">
      <div id="quranHeaderSurah" style="font-weight:800; color:var(--t1); font-size:1.1rem; font-family:'Tajawal', sans-serif;">سورة الفاتحة</div>
      <div id="quranHeaderJuz" style="color:var(--gold); font-size:0.8rem; font-weight:600;">الجزء الأول</div>
    </div>
    
    <!-- Close Button -->
    <button onclick="closeQuranReader()" style="background:transparent; border:none; color:var(--t2); font-size:1.4rem; cursor:pointer;">
      <i class="fas fa-times"></i>
    </button>
  </div>

  <div style="flex:1; overflow-y:auto; overflow-x:hidden; position:relative; display:flex; justify-content:center; align-items:center; background:var(--bg); touch-action: pan-y;" id="quranImgContainer">
    <div id="quranLoader" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:var(--gold); font-size:1.2rem; font-weight:700;">جاري التحميل...</div>
    <img id="quranPageImg" src="" style="width:100%; max-width:600px; height:auto; opacity:0; transition:opacity 0.3s;" alt="Quran Page">
    <!-- Tap Zones -->
    <div onclick="changeQuranPage(1)" style="position:absolute; left:0; top:0; width:50%; height:100%; cursor:pointer; z-index:10;"></div>
    <div onclick="changeQuranPage(-1)" style="position:absolute; right:0; top:0; width:50%; height:100%; cursor:pointer; z-index:10;"></div>
  </div>

  <div class="quran-footer" style="background:var(--s2); border-top:1px solid var(--bdr); padding-bottom:env(safe-area-inset-bottom);">
    <!-- Reader controls -->
    <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 15px;">
      <button onclick="changeQuranPage(1)" style="background:rgba(255,255,255,0.05); border:1px solid var(--bdr); border-radius:8px; padding:8px 15px; color:var(--t1); font-family:'Tajawal', sans-serif; font-weight:700; cursor:pointer; z-index:20;">التالي »</button>
      <div id="quranPageNum" style="color:var(--gold); font-weight:800; font-size:1rem; background:var(--golddim); padding:4px 15px; border-radius:20px;">صفحة 1</div>
      <button onclick="changeQuranPage(-1)" style="background:rgba(255,255,255,0.05); border:1px solid var(--bdr); border-radius:8px; padding:8px 15px; color:var(--t1); font-family:'Tajawal', sans-serif; font-weight:700; cursor:pointer; z-index:20;">« السابق</button>
    </div>
    
    <!-- Bottom Nav Icons -->
    <div class="quran-bottom-nav" style="display:flex; justify-content:space-around; align-items:center; padding:10px 5px; border-top:1px solid rgba(255,255,255,0.05);">
      <div onclick="toggleQuranIndex()" class="nav-item active"><i class="fas fa-book-open"></i><span>الفهرس</span></div>
      <div class="nav-item"><i class="fas fa-check-double"></i><span>الختمة</span></div>
      <div class="nav-item"><i class="fas fa-bookmark"></i><span>العلامات</span></div>
      <div class="nav-item"><i class="fas fa-star"></i><span>المفضلة</span></div>
      <div class="nav-item"><i class="fas fa-pen"></i><span>ملاحظات</span></div>
    </div>
  </div>
  
  <!-- Quran Index Modal -->
  <div id="quranIndexModal" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:var(--bg); z-index:20000; flex-direction:column;">
    <div style="padding:calc(15px + env(safe-area-inset-top)) 15px 15px 15px; border-bottom:1px solid var(--bdr); display:flex; justify-content:space-between; align-items:center; background:var(--s2);">
      <button onclick="toggleQuranIndex()" style="background:transparent; border:none; color:var(--t2); font-size:1.4rem; cursor:pointer;"><i class="fas fa-times"></i></button>
      <div style="font-weight:800; color:var(--t1); font-size:1.2rem;">الفهرس</div>
      <div style="width:24px;"></div>
    </div>
    
    <!-- Tabs -->
    <div style="display:flex; padding:15px; gap:10px; background:var(--s2);">
      <button id="tabSurahsBtn" onclick="switchQuranIndexTab('surahs')" class="quran-tab active" style="flex:1; padding:10px; border-radius:8px; border:none; font-family:'Tajawal', sans-serif; font-weight:700; cursor:pointer;">السور</button>
      <button id="tabJuzsBtn" onclick="switchQuranIndexTab('juzs')" class="quran-tab" style="flex:1; padding:10px; border-radius:8px; border:none; font-family:'Tajawal', sans-serif; font-weight:700; cursor:pointer;">الأجزاء</button>
    </div>
    
    <!-- List Container -->
    <div id="quranIndexList" style="flex:1; overflow-y:auto; padding:15px; padding-bottom:env(safe-area-inset-bottom);"></div>
  </div>
</div>
`;

// Remove old overlay if exists
html = html.replace(/<div class="quran-overlay" id="quranOverlay"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, ''); 
html = html.replace(/<div class="quran-overlay" id="quranOverlay"[\s\S]*?<\/div>\n<\/div>\n<\/div>/, ''); // try different match

if (!html.includes('id="quranOverlay"')) {
    html = html.replace('</body>', newQuranOverlay + '\n</body>');
} else {
    // If it exists but wasn't removed, let's aggressively replace it
    const startIndex = html.indexOf('<div class="quran-overlay"');
    const endIndex = html.indexOf('</body>');
    html = html.substring(0, startIndex) + newQuranOverlay + '\n</body>';
}

// Ensure the button inside #page-wird uses openQuranReader()
const readQuranBtnHtml = `<button onclick="openQuranReader()" style="width:100%; padding:14px; background:linear-gradient(135deg, var(--gold2), var(--gold)); border:none; border-radius:12px; color:#000; font-family:'Tajawal', sans-serif; font-size:1.1rem; font-weight:900; cursor:pointer; margin-bottom:15px; display:flex; align-items:center; justify-content:center; gap:10px; box-shadow:0 8px 20px rgba(200,168,75,0.15);">📖 فتح المصحف وقراءة الورد</button>`;
if (!html.includes('فتح المصحف وقراءة الورد')) {
    html = html.replace('<div class="ayah-card">', readQuranBtnHtml + '\n        <div class="ayah-card">');
}

fs.writeFileSync(indexHtmlPath, html, 'utf8');

// 2. UPDATE STYLE.CSS
const quranStyles = `
/* Quran Reader Styles */
.dark-mode #quranPageImg {
  filter: invert(1) hue-rotate(180deg) brightness(1.2) contrast(1.1);
}

.quran-bottom-nav .nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: var(--t2);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.2s ease;
}
.quran-bottom-nav .nav-item i {
  font-size: 1.2rem;
  margin-bottom: 2px;
}
.quran-bottom-nav .nav-item.active {
  color: var(--gold);
  opacity: 1;
}

.quran-tab {
  background: var(--s1);
  color: var(--t2);
  transition: all 0.3s ease;
}
.quran-tab.active {
  background: var(--gold);
  color: #000;
}

.quran-index-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid var(--bdr);
  cursor: pointer;
  transition: background 0.2s ease;
}
.quran-index-item:hover {
  background: var(--s2);
}
.quran-index-number {
  width: 40px;
  height: 40px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 5 L95 27.5 L95 72.5 L50 95 L5 72.5 L5 27.5 Z" fill="none" stroke="%23c8a84b" stroke-width="4"/></svg>') no-repeat center center;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  color: var(--gold);
  margin-left: 15px;
  font-size: 0.9rem;
}
.quran-index-details {
  flex: 1;
}
.quran-index-title {
  font-weight: 800;
  color: var(--t1);
  font-size: 1.1rem;
  margin-bottom: 3px;
}
.quran-index-subtitle {
  color: var(--t2);
  font-size: 0.8rem;
}
.quran-index-page {
  font-weight: 800;
  color: var(--t1);
  font-size: 1rem;
}
`;

if (!css.includes('.dark-mode #quranPageImg')) {
    css += '\n' + quranStyles;
    fs.writeFileSync(styleCssPath, css, 'utf8');
}

// 3. UPDATE APP.JS WITH FULL QURAN DATA & LOGIC
const quranLogic = `
/* ══════════════════════════════
   QURAN READER
══════════════════════════════ */
const quranSurahs = [
  {"id":1,"name":"الفاتحة","startPage":1,"verses":7,"revelation":"Meccan"},
  {"id":2,"name":"البقرة","startPage":2,"verses":286,"revelation":"Medinan"},
  {"id":3,"name":"آل عمران","startPage":50,"verses":200,"revelation":"Medinan"},
  {"id":4,"name":"النساء","startPage":77,"verses":176,"revelation":"Medinan"},
  {"id":5,"name":"المائدة","startPage":106,"verses":120,"revelation":"Medinan"},
  {"id":6,"name":"الأنعام","startPage":128,"verses":165,"revelation":"Meccan"},
  {"id":7,"name":"الأعراف","startPage":151,"verses":206,"revelation":"Meccan"},
  {"id":8,"name":"الأنفال","startPage":177,"verses":75,"revelation":"Medinan"},
  {"id":9,"name":"التوبة","startPage":187,"verses":129,"revelation":"Medinan"},
  {"id":10,"name":"يونس","startPage":208,"verses":109,"revelation":"Meccan"},
  {"id":11,"name":"هود","startPage":221,"verses":123,"revelation":"Meccan"},
  {"id":12,"name":"يوسف","startPage":235,"verses":111,"revelation":"Meccan"},
  {"id":13,"name":"الرعد","startPage":249,"verses":43,"revelation":"Medinan"},
  {"id":14,"name":"إبراهيم","startPage":255,"verses":52,"revelation":"Meccan"},
  {"id":15,"name":"الحجر","startPage":262,"verses":99,"revelation":"Meccan"},
  {"id":16,"name":"النحل","startPage":267,"verses":128,"revelation":"Meccan"},
  {"id":17,"name":"الإسراء","startPage":282,"verses":111,"revelation":"Meccan"},
  {"id":18,"name":"الكهف","startPage":293,"verses":110,"revelation":"Meccan"},
  {"id":19,"name":"مريم","startPage":305,"verses":98,"revelation":"Meccan"},
  {"id":20,"name":"طه","startPage":312,"verses":135,"revelation":"Meccan"},
  {"id":21,"name":"الأنبياء","startPage":322,"verses":112,"revelation":"Meccan"},
  {"id":22,"name":"الحج","startPage":332,"verses":78,"revelation":"Medinan"},
  {"id":23,"name":"المؤمنون","startPage":342,"verses":118,"revelation":"Meccan"},
  {"id":24,"name":"النور","startPage":350,"verses":64,"revelation":"Medinan"},
  {"id":25,"name":"الفرقان","startPage":359,"verses":77,"revelation":"Meccan"},
  {"id":26,"name":"الشعراء","startPage":367,"verses":227,"revelation":"Meccan"},
  {"id":27,"name":"النمل","startPage":377,"verses":93,"revelation":"Meccan"},
  {"id":28,"name":"القصص","startPage":385,"verses":88,"revelation":"Meccan"},
  {"id":29,"name":"العنكبوت","startPage":396,"verses":69,"revelation":"Meccan"},
  {"id":30,"name":"الروم","startPage":404,"verses":60,"revelation":"Meccan"},
  {"id":31,"name":"لقمان","startPage":411,"verses":34,"revelation":"Meccan"},
  {"id":32,"name":"السجدة","startPage":415,"verses":30,"revelation":"Meccan"},
  {"id":33,"name":"الأحزاب","startPage":418,"verses":73,"revelation":"Medinan"},
  {"id":34,"name":"سبأ","startPage":428,"verses":54,"revelation":"Meccan"},
  {"id":35,"name":"فاطر","startPage":434,"verses":45,"revelation":"Meccan"},
  {"id":36,"name":"يس","startPage":440,"verses":83,"revelation":"Meccan"},
  {"id":37,"name":"الصافات","startPage":446,"verses":182,"revelation":"Meccan"},
  {"id":38,"name":"ص","startPage":453,"verses":88,"revelation":"Meccan"},
  {"id":39,"name":"الزمر","startPage":458,"verses":75,"revelation":"Meccan"},
  {"id":40,"name":"غافر","startPage":467,"verses":85,"revelation":"Meccan"},
  {"id":41,"name":"فصلت","startPage":477,"verses":54,"revelation":"Meccan"},
  {"id":42,"name":"الشورى","startPage":483,"verses":53,"revelation":"Meccan"},
  {"id":43,"name":"الزخرف","startPage":489,"verses":89,"revelation":"Meccan"},
  {"id":44,"name":"الدخان","startPage":496,"verses":59,"revelation":"Meccan"},
  {"id":45,"name":"الجاثية","startPage":499,"verses":37,"revelation":"Meccan"},
  {"id":46,"name":"الأحقاف","startPage":502,"verses":35,"revelation":"Meccan"},
  {"id":47,"name":"محمد","startPage":507,"verses":38,"revelation":"Medinan"},
  {"id":48,"name":"الفتح","startPage":511,"verses":29,"revelation":"Medinan"},
  {"id":49,"name":"الحجرات","startPage":515,"verses":18,"revelation":"Medinan"},
  {"id":50,"name":"ق","startPage":518,"verses":45,"revelation":"Meccan"},
  {"id":51,"name":"الذاريات","startPage":520,"verses":60,"revelation":"Meccan"},
  {"id":52,"name":"الطور","startPage":523,"verses":49,"revelation":"Meccan"},
  {"id":53,"name":"النجم","startPage":526,"verses":62,"revelation":"Meccan"},
  {"id":54,"name":"القمر","startPage":528,"verses":55,"revelation":"Meccan"},
  {"id":55,"name":"الرحمن","startPage":531,"verses":78,"revelation":"Medinan"},
  {"id":56,"name":"الواقعة","startPage":534,"verses":96,"revelation":"Meccan"},
  {"id":57,"name":"الحديد","startPage":537,"verses":29,"revelation":"Medinan"},
  {"id":58,"name":"المجادلة","startPage":542,"verses":22,"revelation":"Medinan"},
  {"id":59,"name":"الحشر","startPage":545,"verses":24,"revelation":"Medinan"},
  {"id":60,"name":"الممتحنة","startPage":549,"verses":13,"revelation":"Medinan"},
  {"id":61,"name":"الصف","startPage":551,"verses":14,"revelation":"Medinan"},
  {"id":62,"name":"الجمعة","startPage":553,"verses":11,"revelation":"Medinan"},
  {"id":63,"name":"المنافقون","startPage":554,"verses":11,"revelation":"Medinan"},
  {"id":64,"name":"التغابن","startPage":556,"verses":18,"revelation":"Medinan"},
  {"id":65,"name":"الطلاق","startPage":558,"verses":12,"revelation":"Medinan"},
  {"id":66,"name":"التحريم","startPage":560,"verses":12,"revelation":"Medinan"},
  {"id":67,"name":"الملك","startPage":562,"verses":30,"revelation":"Meccan"},
  {"id":68,"name":"القلم","startPage":564,"verses":52,"revelation":"Meccan"},
  {"id":69,"name":"الحاقة","startPage":566,"verses":52,"revelation":"Meccan"},
  {"id":70,"name":"المعارج","startPage":568,"verses":44,"revelation":"Meccan"},
  {"id":71,"name":"نوح","startPage":570,"verses":28,"revelation":"Meccan"},
  {"id":72,"name":"الجن","startPage":572,"verses":28,"revelation":"Meccan"},
  {"id":73,"name":"المزمل","startPage":574,"verses":20,"revelation":"Meccan"},
  {"id":74,"name":"المدثر","startPage":575,"verses":56,"revelation":"Meccan"},
  {"id":75,"name":"القيامة","startPage":577,"verses":40,"revelation":"Meccan"},
  {"id":76,"name":"الإنسان","startPage":578,"verses":31,"revelation":"Medinan"},
  {"id":77,"name":"المرسلات","startPage":580,"verses":50,"revelation":"Meccan"},
  {"id":78,"name":"النبأ","startPage":582,"verses":40,"revelation":"Meccan"},
  {"id":79,"name":"النازعات","startPage":583,"verses":46,"revelation":"Meccan"},
  {"id":80,"name":"عبس","startPage":585,"verses":42,"revelation":"Meccan"},
  {"id":81,"name":"التكوير","startPage":586,"verses":29,"revelation":"Meccan"},
  {"id":82,"name":"الانفطار","startPage":587,"verses":19,"revelation":"Meccan"},
  {"id":83,"name":"المطففين","startPage":587,"verses":36,"revelation":"Meccan"},
  {"id":84,"name":"الانشقاق","startPage":589,"verses":25,"revelation":"Meccan"},
  {"id":85,"name":"البروج","startPage":590,"verses":22,"revelation":"Meccan"},
  {"id":86,"name":"الطارق","startPage":591,"verses":17,"revelation":"Meccan"},
  {"id":87,"name":"الأعلى","startPage":591,"verses":19,"revelation":"Meccan"},
  {"id":88,"name":"الغاشية","startPage":592,"verses":26,"revelation":"Meccan"},
  {"id":89,"name":"الفجر","startPage":593,"verses":30,"revelation":"Meccan"},
  {"id":90,"name":"البلد","startPage":594,"verses":20,"revelation":"Meccan"},
  {"id":91,"name":"الشمس","startPage":595,"verses":15,"revelation":"Meccan"},
  {"id":92,"name":"الليل","startPage":595,"verses":21,"revelation":"Meccan"},
  {"id":93,"name":"الضحى","startPage":596,"verses":11,"revelation":"Meccan"},
  {"id":94,"name":"الشرح","startPage":596,"verses":8,"revelation":"Meccan"},
  {"id":95,"name":"التين","startPage":597,"verses":8,"revelation":"Meccan"},
  {"id":96,"name":"العلق","startPage":597,"verses":19,"revelation":"Meccan"},
  {"id":97,"name":"القدر","startPage":598,"verses":5,"revelation":"Meccan"},
  {"id":98,"name":"البينة","startPage":598,"verses":8,"revelation":"Medinan"},
  {"id":99,"name":"الزلزلة","startPage":599,"verses":8,"revelation":"Medinan"},
  {"id":100,"name":"العاديات","startPage":599,"verses":11,"revelation":"Meccan"},
  {"id":101,"name":"القارعة","startPage":600,"verses":11,"revelation":"Meccan"},
  {"id":102,"name":"التكاثر","startPage":600,"verses":8,"revelation":"Meccan"},
  {"id":103,"name":"العصر","startPage":601,"verses":3,"revelation":"Meccan"},
  {"id":104,"name":"الهمزة","startPage":601,"verses":9,"revelation":"Meccan"},
  {"id":105,"name":"الفيل","startPage":601,"verses":5,"revelation":"Meccan"},
  {"id":106,"name":"قريش","startPage":602,"verses":4,"revelation":"Meccan"},
  {"id":107,"name":"الماعون","startPage":602,"verses":7,"revelation":"Meccan"},
  {"id":108,"name":"الكوثر","startPage":602,"verses":3,"revelation":"Meccan"},
  {"id":109,"name":"الكافرون","startPage":603,"verses":6,"revelation":"Meccan"},
  {"id":110,"name":"النصر","startPage":603,"verses":3,"revelation":"Medinan"},
  {"id":111,"name":"المسد","startPage":603,"verses":5,"revelation":"Meccan"},
  {"id":112,"name":"الإخلاص","startPage":604,"verses":4,"revelation":"Meccan"},
  {"id":113,"name":"الفلق","startPage":604,"verses":5,"revelation":"Meccan"},
  {"id":114,"name":"الناس","startPage":604,"verses":6,"revelation":"Meccan"}
];

function getPageInfo(page) {
  let surahName = 'الفاتحة';
  for (let i = 0; i < quranSurahs.length; i++) {
    if (page >= quranSurahs[i].startPage) {
      surahName = quranSurahs[i].name;
    } else {
      break;
    }
  }
  const juz = Math.ceil(page / 20);
  const partName = \`الجزء \${juz}\`;
  return { surahName, partName };
}

function openQuranReader() {
  if (!S.quranPage) S.quranPage = 1;
  document.getElementById('quranOverlay').style.display = 'flex';
  renderQuranPage();
}

function closeQuranReader() {
  document.getElementById('quranOverlay').style.display = 'none';
  saveState();
  showToast('تم حفظ تقدمك بنجاح', 'gold');
}

function changeQuranPage(step) {
  let p = S.quranPage + step;
  if (p < 1) p = 1;
  if (p > 604) p = 604;
  S.quranPage = p;
  renderQuranPage();
}

function renderQuranPage() {
  const p = S.quranPage;
  const pStr = p.toString().padStart(3, '0');
  const imgUrl = \`https://files.quran.app/hafs/madani/width_1024/page\${pStr}.png\`;
  
  const imgEl = document.getElementById('quranPageImg');
  const loader = document.getElementById('quranLoader');
  
  loader.style.display = 'block';
  imgEl.style.opacity = '0';
  
  imgEl.onload = () => {
    loader.style.display = 'none';
    imgEl.style.opacity = '1';
  };
  
  imgEl.onerror = () => {
    loader.textContent = 'خطأ في التحميل، تأكد من اتصالك بالإنترنت';
  };
  
  imgEl.src = imgUrl;
  document.getElementById('quranPageNum').textContent = \`صفحة \${p}\`;
  
  const info = getPageInfo(p);
  document.getElementById('quranHeaderSurah').textContent = "سورة " + info.surahName;
  document.getElementById('quranHeaderJuz').textContent = info.partName;
}

function toggleQuranIndex() {
  const modal = document.getElementById('quranIndexModal');
  if(modal.style.display === 'flex') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'flex';
    switchQuranIndexTab('surahs');
  }
}

function switchQuranIndexTab(tab) {
  document.getElementById('tabSurahsBtn').classList.remove('active');
  document.getElementById('tabJuzsBtn').classList.remove('active');
  
  const listEl = document.getElementById('quranIndexList');
  listEl.innerHTML = '';
  
  if (tab === 'surahs') {
    document.getElementById('tabSurahsBtn').classList.add('active');
    quranSurahs.forEach(surah => {
      const revText = surah.revelation === 'Meccan' ? 'مكية' : 'مدنية';
      listEl.innerHTML += \`
        <div class="quran-index-item" onclick="S.quranPage = \${surah.startPage}; renderQuranPage(); toggleQuranIndex();">
          <div class="quran-index-number">\${surah.id}</div>
          <div class="quran-index-details">
            <div class="quran-index-title">سورة \${surah.name}</div>
            <div class="quran-index-subtitle">صفحة \${surah.startPage} • \${surah.verses} آيات • \${revText}</div>
          </div>
          <div class="quran-index-page">\${surah.startPage}</div>
        </div>
      \`;
    });
  } else {
    document.getElementById('tabJuzsBtn').classList.add('active');
    for (let i = 1; i <= 30; i++) {
      const pageNum = ((i - 1) * 20) + 1;
      const info = getPageInfo(pageNum);
      listEl.innerHTML += \`
        <div class="quran-index-item" onclick="S.quranPage = \${pageNum}; renderQuranPage(); toggleQuranIndex();">
          <div class="quran-index-number">\${i}</div>
          <div class="quran-index-details">
            <div class="quran-index-title">الجزء \${i}</div>
            <div class="quran-index-subtitle">تبدأ بسورة \${info.surahName}</div>
          </div>
          <div class="quran-index-page">\${pageNum}</div>
        </div>
      \`;
    }
  }
}

// Ensure the hijri date is appended
const origStartApp = startApp;
startApp = function(u,n,g) {
  origStartApp(u,n,g);
  
  // Attach hijri string if missing
  const now = new Date();
  const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {day: 'numeric', month: 'long', year: 'numeric'});
  const hijriStr = hijriFormatter.format(now).replace(/١/g,'1').replace(/٢/g,'2').replace(/٣/g,'3').replace(/٤/g,'4').replace(/٥/g,'5').replace(/٦/g,'6').replace(/٧/g,'7').replace(/٨/g,'8').replace(/٩/g,'9').replace(/٠/g,'0');
  
  const datePill = document.getElementById('datePill');
  if (datePill && !datePill.textContent.includes('🌙')) {
      datePill.textContent += ' | 🌙 ' + hijriStr;
  }
};
`;

if (!appJs.includes('openQuranReader')) {
    appJs += '\n' + quranLogic;
    fs.writeFileSync(appJsPath, appJs, 'utf8');
}

console.log("Quran features built successfully.");
