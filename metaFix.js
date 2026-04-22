const fs = require('fs');

let html = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/index.html', 'utf8');

const targetMeta = `<title>مخططي اليومي</title>`;
const pwaMetas = `<title>مخططي اليومي</title>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="مخططي">
<link rel="apple-touch-icon" href="./icon.svg">`;

if(!html.includes('apple-mobile-web-app-capable')) {
    html = html.replace(targetMeta, pwaMetas);
    fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/index.html', html, 'utf8');
}
console.log("PWA Apple Meta tags added!");
