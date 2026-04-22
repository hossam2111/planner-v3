const fs = require('fs');

let css = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/style.css', 'utf8');

// Fix 1: Force mobile Grid to be 1fr instead of 1fr 1fr so prayer boxes are full width
css = css.replace(/grid-template-columns\s*:\s*1fr\s+1fr/g, 'grid-template-columns:1fr');

// Fix 2: Allow wird-cnt (prayer details) to wrap onto new lines!
css = css.replace(/white-space\s*:\s*nowrap/g, 'white-space:normal; line-height:1.4; word-break:break-word');

// Fix 3: Add global explicit wrapping to tables and text items that could span out
css += `\n/* BUGFIX: Force Wrapping on small screens to prevent outside-table spans */
.week-tbl td, .week-tbl th { word-wrap: break-word !important; white-space: normal !important; overflow-wrap: break-word !important; }
.wird-txt { word-wrap: break-word !important; white-space: normal !important; overflow-wrap: break-word !important; }
.wc { word-wrap: break-word !important; white-space: normal !important; overflow-wrap: break-word !important; }
`;

fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/style.css', css, 'utf8');

// Bump SW to V8
let swJs = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/sw.js', 'utf8');
swJs = swJs.replace(/planner-cache-v[0-9]+/, 'planner-cache-v8');
fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/sw.js', swJs, 'utf8');

console.log("CSS Overflows Fixed & Cache Bumped to v8!");
