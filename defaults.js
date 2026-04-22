const fs = require('fs');

/* 1. UPDATE APP.JS DEFAULT TASKS & POPUP TRIGGERS */
let appJs = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', 'utf8');

// Replace defaultTasks
const oldDefaultTasksRegex = /function defaultTasks\(dow\)\{[\s\S]*?return base;\s*\}/;
const newDefaultTasks = `function defaultTasks(dow){
  return [
    {id:'t2', n:'قيام الليل ودعاء الثلث الأخير', tm:'4:00 ص', tag:'tf', pri:'high', done:false, note:''},
    {id:'t3', n:'صلاة الفجر', tm:'4:30 ص', tag:'tp', pri:'high', done:false, note:''},
    {id:'t4', n:'أذكار الصباح', tm:'5:00 ص', tag:'tq', pri:'high', done:false, note:'قراءة الورد اليومي'},
    {id:'t6', n:'صلاة الضحى', tm:'9:00 ص', tag:'tf', pri:'med', done:false, note:''},
    {id:'t7', n:'صلاة الظهر', tm:'1:00 م', tag:'tp', pri:'high', done:false, note:''},
    {id:'t9', n:'صلاة العصر', tm:'3:30 م', tag:'tp', pri:'high', done:false, note:''},
    {id:'t10',n:'أذكار المساء', tm:'4:30 م', tag:'tq', pri:'high', done:false, note:''},
    {id:'t12',n:'صلاة المغرب', tm:'6:00 م', tag:'tp', pri:'high', done:false, note:''},
    {id:'t14',n:'صلاة العشاء', tm:'7:30 م', tag:'tp', pri:'high', done:false, note:''},
    {id:'t15',n:'صلاة الوتر ومحاسبة النفس', tm:'11:00 م', tag:'tf', pri:'med', done:false, note:''}
  ];
}`;

appJs = appJs.replace(oldDefaultTasksRegex, newDefaultTasks);

// Inject popup trigger into startApp
// Find: checkPrayerReminder(); }
const startAppEndRegex = /checkPrayerReminder\(\);\s*\}/;

const startAppNewEnd = `checkPrayerReminder();
    
    // Welcome Modal Logic
    if (S.lastWirdPopupDate !== todayKey()) {
        const wirdModal = document.getElementById('wirdWelcomeModal');
        if (wirdModal) {
            wirdModal.style.display = 'flex';
            S.lastWirdPopupDate = todayKey();
            saveState();
        }
    }
  }`;

if(!appJs.includes('lastWirdPopupDate')) {
    appJs = appJs.replace(startAppEndRegex, startAppNewEnd);
}

fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', appJs, 'utf8');

/* 2. INJECT WIRD MODAL IN INDEX.HTML */
let html = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/index.html', 'utf8');

const modalHtml = `
<!--  Wird Welcome Modal  -->
<div class="pomo-overlay" id="wirdWelcomeModal" style="display:none; z-index:9999;">
  <div style="position:relative; width:90%; max-width:340px; background:#111823; border:1px solid rgba(200,168,75,.3); border-radius:24px; padding:35px 20px 25px; text-align:center; box-shadow:0 15px 40px rgba(0,0,0,0.6), 0 0 30px rgba(200,168,75,0.15); animation: fadeUp 0.4s cubic-bezier(.34,1.56,.64,1)">
    <div style="width:70px; height:70px; margin:0 auto 15px; border-radius:50%; background:rgba(200,168,75,0.05); display:flex; align-items:center; justify-content:center; border:1.5px solid var(--gold);">
      <span style="font-size:2.2rem">📖</span>
    </div>
    <h2 style="font-size:1.4rem; font-weight:900; color:var(--gold2); margin-bottom:10px">بداية جديدة بالقرآن!</h2>
    <p style="font-size:0.9rem; color:#8997aa; margin-bottom:25px; line-height:1.7; font-weight:600">لا تنسَ أن تبدأ يومك بوردك القرآني وأذكارك، ففيهما البركة والتوفيق لجميع مهامك.</p>
    
    <button onclick="document.getElementById('wirdWelcomeModal').style.display='none'; tab('wird', document.querySelectorAll('.tab')[1])" style="width:100%; padding:14px; background:linear-gradient(135deg, var(--gold2), var(--gold)); border:none; border-radius:12px; color:#000; font-family:'Tajawal', sans-serif; font-size:1.05rem; font-weight:900; cursor:pointer;">
      ابدأ وردك الآن 🤲
    </button>
    <button onclick="document.getElementById('wirdWelcomeModal').style.display='none'" style="background:none; border:none; color:#8997aa; font-family:'Tajawal', sans-serif; font-size:0.85rem; font-weight:700; cursor:pointer; padding:15px 10px 0; margin-top:5px; opacity:0.8">تخطي مؤقتاً</button>
  </div>
</div>
</body>`;

if (!html.includes('wirdWelcomeModal')) {
    html = html.replace('</body>', modalHtml);
    fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/index.html', html, 'utf8');
}

/* 3. BUMP SERVICE WORKER */
let swJs = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/sw.js', 'utf8');
swJs = swJs.replace(/planner-cache-v[0-9]+/, 'planner-cache-v6');
fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/sw.js', swJs, 'utf8');

console.log("Tasks modified & Modal injected!");
