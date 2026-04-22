const fs = require('fs');
const routineGlobals = `
/* ══════════════════════════════
   ROUTINES
══════════════════════════════ */
function toggleRoutineForms(){
  const f = document.getElementById('addRoutineForm');
  if(!f) return;
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
}
window.toggleRoutineForms = toggleRoutineForms;

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
window.addRoutine = addRoutine;

function delRoutine(id){
  if(!confirm('حذف هذا الروتين؟')) return;
  S.routine = S.routine.filter(r=>r.id !== id); saveState(); renderWeek();
}
window.delRoutine = delRoutine;
`;

let code = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', 'utf8');
if (!code.includes('toggleRoutineForms')) {
    fs.appendFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', "\n" + routineGlobals, 'utf8');
    console.log('Appended globals successfully!');
} else {
    console.log('Already appended.');
}
