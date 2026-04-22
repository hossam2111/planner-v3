const fs = require('fs');

// 1. UPDATE SW.JS V4
let swJs = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/sw.js', 'utf8');
swJs = swJs.replace(/const CACHE_NAME = 'planner-cache-v[0-9]+';/g, "const CACHE_NAME = 'planner-cache-v4';");

// Force service worker to aggressively claim clients on activate to ensure update
if(!swJs.includes('clients.claim()')) {
    swJs = swJs.replace('return caches.delete(cacheName);', 'return caches.delete(cacheName);');
    // It's easier to just append skipWaiting and clients.claim in activate
    swJs = swJs.replace('self.addEventListener(\'activate\', event => {', `self.addEventListener('activate', event => {\n  event.waitUntil(clients.claim());`);
}
fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/sw.js', swJs, 'utf8');


// 2. UPDATE INDEX.HTML HEADER BUTTON
let html = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/index.html', 'utf8');
const logoutHtml = `<div class="chip chip-logout" onclick="logout()">`;
const newChipHtml = `<div class="chip chip-gold" id="btnShowModalInstall" onclick="document.getElementById('pwaInstallModal').style.display='flex'">تثبيت 📱</div>\n        <div class="chip chip-logout" onclick="logout()">`;

if(!html.includes('btnShowModalInstall')) {
    html = html.replace(logoutHtml, newChipHtml);
    fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/index.html', html, 'utf8');
}

// 3. UPDATE APP.JS PWA LOGIC
let appJs = fs.readFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', 'utf8');
const oldPwaLogic = `window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('pwaInstallModal');
  if(banner) {
    banner.style.display = 'flex';
  }
});
window.installPWA = async function() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      const banner = document.getElementById('pwaInstallModal');
      if(banner) banner.style.display = 'none';
    }
    deferredPrompt = null;
  }
};`;

const newPwaLogic = `window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Let the user trigger the modal manually via the header button! 
  // We no longer trigger it automatically.
});
window.installPWA = async function() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      const banner = document.getElementById('pwaInstallModal');
      if(banner) banner.style.display = 'none';
    }
    deferredPrompt = null;
  } else {
    showToast('للتثبيت هنا: اضغط زر المشاركة ثم "إضافة للشاشة الرئيسية"!', 'gold');
    const banner = document.getElementById('pwaInstallModal');
    if(banner) banner.style.display = 'none';
  }
};`;

if(appJs.includes('banner.style.display = \'flex\';')) {
    appJs = appJs.replace(oldPwaLogic, newPwaLogic);
    fs.writeFileSync('c:/Users/Hossam/Desktop/planner/planner-v5/app.js', appJs, 'utf8');
}

console.log("Cache busted! V4 deployed with manual triggers.");
