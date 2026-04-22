const fs = require('fs');
let appJs = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', 'utf8');

const injection = `
/* ══════════════════════════════
   DEVELOPER CREDIT
══════════════════════════════ */
const appScreenWrapper = document.querySelector('#scApp > div');
if (appScreenWrapper && !document.getElementById('devCredit')) {
    appScreenWrapper.insertAdjacentHTML('beforeend', \`
        <div id="devCredit" style="text-align:center; padding: 25px 10px 15px; margin-top:20px; font-family:'Tajawal', sans-serif; opacity:0.85">
            <p style="font-size:0.75rem; color:var(--t2); margin-bottom:6px; font-weight:600">تطوير وتصميم</p>
            <p style="font-size:1.05rem; color:var(--gold); font-weight:900; letter-spacing:0.5px">حسام طرفاية</p>
        </div>
    \`);
}
`;

if(!appJs.includes('حسام طرفاية')) {
    appJs += injection;
    fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', appJs, 'utf8');
    
    // Bump SW version to V5 so changes apply
    let swJs = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/sw.js', 'utf8');
    swJs = swJs.replace(/planner-cache-v[0-9]+/, 'planner-cache-v5');
    fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/sw.js', swJs, 'utf8');
    
    console.log("Injected via app.js and SW bumped to V5!");
} else {
    console.log("Already injected!");
}
