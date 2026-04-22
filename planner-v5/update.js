const fs = require('fs');
let code = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', 'utf8');

// 1. Chart.js feature
const targetHistory = `/* ══════════════════════════════
   HISTORY
══════════════════════════════ */
function renderHistory(){
  let html='';
  const dates = Object.keys(S.history||{}).sort((a,b)=>new Date(b)-new Date(a));
  if(!dates.length){
    document.getElementById('histContainer').innerHTML='<div style="text-align:center;color:var(--t3);padding:20px;font-size:.8rem">لا يوجد سجل سابق بعد.</div>';
    return;
  }
  dates.forEach(d=>{
    const v = S.history[d];
    let ico='○'; let clr='var(--t3)';
    if(v.pct>=100){ ico='👑'; clr='var(--gold)'; }
    else if(v.pct>=70){ ico='🔥'; clr='var(--em)'; }
    else if(v.pct>=40){ ico='👍'; clr='var(--amb)'; }
    html+=\`<div class="hist-card">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="font-size:1.4rem;color:\${clr}">\${ico}</div>
        <div>
          <div class="hist-dt">\${d}</div>
          <div class="hist-det">تم \${v.done} من \${v.total}</div>
        </div>
      </div>
      <div class="hist-pct">\${v.pct}%</div>
    </div>\`;
  });
  document.getElementById('histContainer').innerHTML = html;
}`;

const replaceHistory = `let histChartInstance = null;
function renderHistory(){
  let html='';
  const dates = Object.keys(S.history||{}).sort((a,b)=>new Date(b)-new Date(a));
  
  if (histChartInstance) { histChartInstance.destroy(); }
  
  if(!dates.length){
    document.getElementById('histContainer').innerHTML='<div style="text-align:center;color:var(--t3);padding:20px;font-size:.8rem">لا يوجد سجل حتى الآن.</div>';
    return;
  }
  
  // Render Chart
  const chartDates = [...dates].reverse().slice(-14); // Last 14 days
  const chartData = chartDates.map(d => S.history[d].pct);
  const ctx = document.getElementById('histChart');
  if(ctx) {
    histChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartDates.map(d => d.substring(5)), // MM-DD
        datasets: [{
          label: 'نسبة الإنجاز %',
          data: chartData,
          borderColor: '#c8a84b',
          backgroundColor: 'rgba(200, 168, 75, 0.2)',
          borderWidth: 2,
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, max: 100, ticks: { color: '#888' } },
          x: { ticks: { color: '#888' } }
        }
      }
    });
  }

  dates.forEach(d=>{
    const v = S.history[d];
    let ico='📋'; let clr='var(--t3)';
    if(v.pct>=100){ ico='👑'; clr='var(--gold)'; }
    else if(v.pct>=70){ ico='🔥'; clr='var(--em)'; }
    else if(v.pct>=40){ ico='👍'; clr='var(--amb)'; }
    html+=\`<div class="hist-card">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="font-size:1.4rem;color:\${clr}">\${ico}</div>
        <div>
          <div class="hist-dt">\${d}</div>
          <div class="hist-det">تم \${v.done} من \${v.total}</div>
        </div>
      </div>
      <div class="hist-pct">\${v.pct}%</div>
    </div>\`;
  });
  document.getElementById('histContainer').innerHTML = html;
}`;

// 2. startApp Routine logic
const targetStartApp = `  if(!S.yearly_plan) S.yearly_plan = [];
  if(!S.history) S.history = {};
  checkDayReset();`;

const replaceStartApp = `  if(!S.yearly_plan) S.yearly_plan = [];
  if(!S.history) S.history = {};
  if(!S.routine) S.routine = [];
  checkDayReset();`;

// 3. checkDayReset Routine inject logic
const targetDayReset = `    const prevTasks=(S.tasks||[]).filter(t=>t.id.startsWith('c'));
    S.tasks=defaultTasks(new Date().getDay());
    prevTasks.forEach(t=>{ t.done=false; S.tasks.push(t); });
    S.wird={};`;

const replaceDayReset = `    const prevTasks=(S.tasks||[]).filter(t=>t.id.startsWith('c'));
    const dow = new Date().getDay();
    S.tasks=defaultTasks(dow);
    prevTasks.forEach(t=>{ t.done=false; S.tasks.push(t); });
    
    // Inject Routine Tasks for today
    if(S.routine) {
      S.routine.forEach(r => {
        if(r.days.includes(dow)) {
          S.tasks.push({id:'rt'+Date.now()+Math.floor(Math.random()*100), n:r.n, tm:'—', tag:'tf', pri:'low', done:false, note:'روتين متكرر'});
        }
      });
    }

    S.wird={};`;

// 4. renderWeek logic updates
const targetRenderWeekEnd = `  document.getElementById('routineList').innerHTML=routine.map(r=>\`
    <div style="display:flex;gap:12px;align-items:center;background:var(--s1);border:1px solid var(--bdr);border-radius:var(--rsm);padding:10px 15px;margin-bottom:6px">
      <span style="font-size:.7rem;font-weight:800;color:var(--sap);min-width:52px">\${r.tm}</span>
      <span style="font-size:.84rem;font-weight:600">\${r.n}</span>
    </div>\`).join('');
}`;

const replaceRenderWeekEnd = `  let rHtml = routine.map(r=>\`
    <div style="display:flex;gap:12px;align-items:center;background:var(--s1);border:1px solid var(--bdr);border-radius:var(--rsm);padding:10px 15px;margin-bottom:6px">
      <span style="font-size:.7rem;font-weight:800;color:var(--sap);min-width:52px">\${r.tm}</span>
      <span style="font-size:.84rem;font-weight:600">\${r.n}</span>
      <span style="font-size:.7rem;color:var(--t3);margin-right:auto">أساسي</span>
    </div>\`).join('');

  if(S.routine && S.routine.length) {
    const daysArr = ['ح','ن','ث','ر','خ','ج','س'];
    rHtml += '<div style="margin:15px 0;border-top:1px dashed var(--bdr)"></div>';
    rHtml += S.routine.map(r=>\`
      <div style="display:flex;gap:12px;align-items:center;background:var(--s1);border:1px solid var(--gold);border-radius:var(--rsm);padding:10px 15px;margin-bottom:6px">
        <span style="font-size:.7rem;font-weight:800;color:var(--gold);min-width:52px">متكرر</span>
        <span style="font-size:.84rem;font-weight:600">\${r.n}</span>
        <span style="font-size:.6rem;color:var(--t3);">\${r.days.map(d=>daysArr[d]).join('، ')}</span>
        <button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:1.4rem" onclick="delRoutine('\${r.id}')">×</button>
      </div>
    \`).join('');
  }

  document.getElementById('routineList').innerHTML = rHtml;
}`;

// 5. Append Routine global functions
const routineGlobals = `
/* ══════════════════════════════
   ROUTINES
══════════════════════════════ */
function toggleRoutineForms(){
  const f = document.getElementById('addRoutineForm');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
}
function addRoutine(){
  const n = document.getElementById('rtName').value.trim();
  if(!n){ toast('اكتب اسم الروتين', 'warn'); return; }
  const days = Array.from(document.querySelectorAll('.rt-day:checked')).map(cb=>parseInt(cb.value));
  if(!days.length){ toast('اختر يوم واحد على الأقل', 'warn'); return; }
  if(!S.routine) S.routine = [];
  S.routine.push({id:'r'+Date.now(), n, days});
  document.getElementById('rtName').value='';
  document.querySelectorAll('.rt-day').forEach(cb=>cb.checked=false);
  toggleRoutineForms(); saveState(); renderWeek(); toast('تم حفظ الروتين', 'ok');
}
function delRoutine(id){
  if(!confirm('حذف هذا الروتين؟')) return;
  S.routine = S.routine.filter(r=>r.id !== id); saveState(); renderWeek();
}
`;

code = code.replace(targetHistory, replaceHistory);
code = code.replace(targetStartApp, replaceStartApp);
code = code.replace(targetDayReset, replaceDayReset);
code = code.replace(targetRenderWeekEnd, replaceRenderWeekEnd);

if (!code.includes('toggleRoutineForms')) {
    const swTarget = `  });\n}`;
    code = code.replace(swTarget, swTarget + "\n" + routineGlobals);
}

fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', code, 'utf8');
console.log('Update successful!');
