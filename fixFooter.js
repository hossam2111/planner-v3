const fs = require('fs');

// 1. App.js - Remove dynamic injection
let appJs = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', 'utf8');
const injectionRegex = /\/\*\s*══════════════════════════════[\s\S]+?DEVELOPER CREDIT[\s\S]+?<\/div>\\n    `\);\n}/;
// fallback to manual slicing if regex fails
const idx = appJs.indexOf("/* ══════════════════════════════\r\n   DEVELOPER CREDIT");
if (idx !== -1) {
    appJs = appJs.substring(0, idx);
    fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', appJs, 'utf8');
    console.log("Removed from app.js successfully!");
} else {
    // Just try the linux line endings
    const idx2 = appJs.indexOf("/* ══════════════════════════════\n   DEVELOPER CREDIT");
    if(idx2 !== -1){
        appJs = appJs.substring(0, idx2);
        fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', appJs, 'utf8');
        console.log("Removed from app.js successfully!");
    } else {
        console.log("Could not find the injection text in app.js.");
    }
}

// 2. Bump SW
let swJs = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/sw.js', 'utf8');
swJs = swJs.replace(/planner-cache-v[0-9]+/, 'planner-cache-v7');
fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/sw.js', swJs, 'utf8');
