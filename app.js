/* ══════════════════════════════
   CONSTANTS
══════════════════════════════ */
const DAYS_AR   = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const MONTHS_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const DAYS_SH   = ['أحد','اثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت'];

const MOTIVATIONS = {
  // keyed by progress bracket 0-9 (0=0%, 1=10-19%, …)
  0:[
    {i:'🌙',t:'بسم الله نبدأ يومنا.',s:'«وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ»'},
    {i:'🌅',t:'الفجر طلع — والوقت أمانة.',s:'كل دقيقة تستثمرها هي صدقة على نفسك'},
    {i:'📿',t:'ابدأ بالبسملة وستجد بركة في كل شيء.',s:'النية الصالحة تجعل العمل العادي عبادة'},
  ],
  2:[
    {i:'🌱',t:'خير الأعمال أدومها وإن قلّ.',s:'لا تستهن بما بدأت — الخطوة الأولى أصعب'},
    {i:'🚶',t:'رحلة الألف ميل تبدأ بخطوة.',s:'أنت على الطريق الصح، استمر'},
    {i:'💡',t:'لقد بدأت، وهذا أهم من الاكتمال.',s:'المبادرة هي نصف الإنجاز'},
  ],
  4:[
    {i:'⚡',t:'نص الطريق قطعته — لا ترجع.',s:'«وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا»'},
    {i:'🔥',t:'الزخم معك دلوقتي، واصل.',s:'الشخص المنتج لا يتوقف عند المنتصف'},
    {i:'💪',t:'ماشي كويس جداً.',s:'لك درجة عند الله بكل مهمة أكملتها'},
  ],
  6:[
    {i:'🌟',t:'بقيت القليل — الجزء الأصعب خلّصته.',s:'«إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ»'},
    {i:'🏅',t:'في المستقيمة الأخيرة — ركّز.',s:'التعب اللي حاسسه ده دليل إنك اجتهدت'},
    {i:'✨',t:'كاد المنجز يطير فرحاً.',s:'أكمل وخلّيها 100%'},
  ],
  8:[
    {i:'🏆',t:'يوم مكتمل — ما شاء الله عليك!',s:'«وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ»'},
    {i:'🎯',t:'أحسنت — يوم استثمرته بشكل صح.',s:'بكره هتشكر نفسك على إنك أكملت النهارده'},
    {i:'🌙',t:'انتهى يومك على خير — بارك الله فيك.',s:'النوم المبكر أجره عند الله على النية الصالحة'},
  ],
};

// Random from specific bucket
const RAND_MOT = (pct) => {
  const keys = [0,2,4,6,8];
  let bucket = 0;
  for(const k of keys){ if(pct >= k*10) bucket=k; }
  const arr = MOTIVATIONS[bucket];
  return arr[Math.floor(Math.random()*arr.length)];
};

// Post-completion random toasts
const DONE_TOASTS = [
  '✅ أحسنت!','💪 واصل كده!','🌟 ما شاء الله!','🔥 رائع!',
  '✨ بارك الله فيك!','⭐ ممتاز!','🏅 انجاز!','🤲 اللهم بارك!',
  '💎 استمر!','🚀 في المسار الصح!',
];

const AYAHS = [
  {ar:'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',src:'الشرح — ٥، ٦'},
  {ar:'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ',src:'الطلاق — ٢، ٣'},
  {ar:'إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ',src:'الرعد — ١١'},
  {ar:'وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ',src:'النجم — ٣٩'},
  {ar:'وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ وَالْمُؤْمِنُونَ',src:'التوبة — ١٠٥'},
  {ar:'يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ',src:'المجادلة — ١١'},
  {ar:'رَبِّ زِدْنِي عِلْمًا',src:'طه — ١١٤'},
  {ar:'وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ',src:'البقرة — ٢١٦'},
  {ar:'وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ',src:'البقرة — ١٩٧'},
  {ar:'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',src:'العلق — ١'},
];

const WIRD_FAJR = [
  {id:'wf1',t:'أذكار الصباح',c:'كاملة'},
  {id:'wf2',t:'قراءة القرآن',c:'وِرد يومي'},
  {id:'wf3',t:'الاستغفار',c:'١٠٠ مرة'},
  {id:'wf4',t:'الصلاة على النبي ﷺ',c:'١٠٠ مرة'},
  {id:'wf5',t:'سبحان الله',c:'٣٣ مرة'},
  {id:'wf6',t:'الحمد لله',c:'٣٣ مرة'},
  {id:'wf7',t:'الله أكبر',c:'٣٤ مرة'},
  {id:'wf8',t:'آية الكرسي',c:'مرة'},
];
const WIRD_PRAYERS = [
  {id:'wp1',t:'🕌 الفجر',c:'٢ سنة + ٢ فرض'},
  {id:'wp2',t:'🕌 الظهر',c:'٤ س + ٤ ف + ٢ س'},
  {id:'wp3',t:'🕌 العصر',c:'٤ فرض'},
  {id:'wp4',t:'🕌 المغرب',c:'٣ ف + ٢ سنة'},
  {id:'wp5',t:'🕌 العشاء',c:'٤ ف + ٢ س + وتر'},
];
const WIRD_EVENING = [
  {id:'we1',t:'أذكار المساء',c:'كاملة'},
  {id:'we2',t:'سورة الكهف',c:'الجمعة'},
  {id:'we3',t:'الصلاة على النبي ﷺ',c:'١٠٠ مرة'},
  {id:'we4',t:'المعوذتان + الإخلاص',c:'٣ مرات'},
  {id:'we5',t:'دعاء قبل النوم',c:'الأذكار'},
];

const TAG_LBL = {tp:'صلاة',tq:'قرآن',tw:'شغل',ts:'محاضرة',tc:'كورس',tr:'مراجعة',th:'رياضة',tf:'عام'};
const PRI_LBL = {high:'🔴 عاجل',med:'🟡 مهم',low:'🟢 عادي'};

/* ══════════════════════════════
   AUDIO
══════════════════════════════ */
const _audioAdhan = new Audio('./adhan.mpeg');
const _audioQiyam = new Audio('./qiyam.mpeg');
_audioAdhan.preload = 'auto';
_audioQiyam.preload = 'auto';
_audioAdhan.volume = 0.5;
_audioQiyam.volume = 0.4;
let _audioStopTimer = null;
function playAdhan(){ try{ stopAudio(); _audioAdhan.currentTime=0; _audioAdhan.play(); }catch(e){} }
function playQiyam(){ try{ stopAudio(); _audioQiyam.currentTime=0; _audioQiyam.play(); }catch(e){} }
function playStartupAudio(){
  try{
    _audioQiyam.volume = 0.3;
    _audioQiyam.currentTime = 0;
    _audioQiyam.play();
    _audioStopTimer = setTimeout(()=>{ _audioQiyam.pause(); _audioQiyam.currentTime=0; _audioQiyam.volume=0.4; }, 4000);
  }catch(e){}
}
function stopAudio(){ clearTimeout(_audioStopTimer); _audioAdhan.pause(); _audioAdhan.currentTime=0; _audioQiyam.pause(); _audioQiyam.currentTime=0; }

/* ══════════════════════════════
   ADHKAR
══════════════════════════════ */
const ADHKAR_SABAH = [
  {text:'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',count:'مرة',src:'أبو داود'},
  {text:'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',count:'مرة',src:'أبو داود'},
  {text:'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا وَرَسُولًا',count:'٣ مرات',src:'أبو داود'},
  {text:'اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ',count:'٤ مرات',src:'أبو داود'},
  {text:'اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',count:'مرة',src:'أبو داود'},
  {text:'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ — سيد الاستغفار',count:'مرة',src:'البخاري'},
  {text:'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',count:'مرة',src:'الحاكم'},
  {text:'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ',count:'٣ مرات',src:'أبو داود'},
  {text:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',count:'١٠٠ مرة',src:'مسلم'},
  {text:'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',count:'١٠ مرات',src:'مسلم'},
  {text:'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ',count:'مرة',src:'البخاري'},
  {text:'آية الكرسي — {اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...} كاملة',count:'مرة',src:'أبو داود'},
  {text:'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ',count:'٣ مرات لكل سورة',src:'أبو داود، الترمذي'},
];
const ADHKAR_MASA = [
  {text:'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',count:'مرة',src:'أبو داود'},
  {text:'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',count:'مرة',src:'أبو داود'},
  {text:'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا وَرَسُولًا',count:'٣ مرات',src:'أبو داود'},
  {text:'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ',count:'٤ مرات',src:'أبو داود'},
  {text:'اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',count:'مرة',src:'أبو داود'},
  {text:'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ — سيد الاستغفار',count:'مرة',src:'البخاري'},
  {text:'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ',count:'مرة',src:'الحاكم'},
  {text:'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي',count:'٣ مرات',src:'أبو داود'},
  {text:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',count:'١٠٠ مرة',src:'مسلم'},
  {text:'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',count:'١٠ مرات',src:'مسلم'},
  {text:'اللَّهُمَّ بِعِلْمِكَ الْغَيْبَ وَقُدْرَتِكَ عَلَى الْخَلْقِ أَحْيِنِي مَا عَلِمْتَ الْحَيَاةَ خَيْرًا لِي، وَتَوَفَّنِي إِذَا عَلِمْتَ الْوَفَاةَ خَيْرًا لِي',count:'مرة',src:'أحمد'},
  {text:'آية الكرسي — {اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...} كاملة',count:'مرة',src:'أبو داود'},
  {text:'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ',count:'٣ مرات لكل سورة',src:'أبو داود'},
];

/* ══════════════════════════════
   SUPABASE CONFIG
══════════════════════════════ */
const SB_URL  = 'https://faljlnmrfeewuxagxgkm.supabase.co';
const SB_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbGpsbm1yZmVld3V4YWd4Z2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MDQ2OTksImV4cCI6MjA5MjM4MDY5OX0.DdgUx1lOO6TQPf-q4DYFIUTlVSrZ-N-mRyAb2CwCe5E';
const SB_HDR  = {'Content-Type':'application/json','apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY};

async function sbGet(table, match){
  const q = Object.entries(match).map(([k,v])=>`${k}=eq.${encodeURIComponent(v)}`).join('&');
  const r = await fetch(`${SB_URL}/rest/v1/${table}?${q}&limit=1`,{headers:SB_HDR});
  const d = await r.json(); return d[0]||null;
}
async function sbInsert(table, body){
  const r = await fetch(`${SB_URL}/rest/v1/${table}`,{method:'POST',headers:{...SB_HDR,'Prefer':'return=representation'},body:JSON.stringify(body)});
  const d = await r.json(); return d[0]||null;
}
async function sbUpsert(table, body, onConflict){
  const r = await fetch(`${SB_URL}/rest/v1/${table}?on_conflict=${onConflict}`,{method:'POST',headers:{...SB_HDR,'Prefer':'return=representation,resolution=merge-duplicates'},body:JSON.stringify(body)});
  return r.ok;
}
async function sbUpdate(table, match, body){
  const q = Object.entries(match).map(([k,v])=>`${k}=eq.${encodeURIComponent(v)}`).join('&');
  const r = await fetch(`${SB_URL}/rest/v1/${table}?${q}`,{method:'PATCH',headers:SB_HDR,body:JSON.stringify(body)});
  return r.ok;
}

/* ══════════════════════════════
   AUTH
══════════════════════════════ */
const SESSION_KEY = 'planner_sess_v2';

function hashPass(p){
  let h=0;for(let i=0;i<p.length;i++){h=((h<<5)-h)+p.charCodeAt(i);h|=0}
  return h.toString(36);
}

function getSession(){ try{ return JSON.parse(localStorage.getItem(SESSION_KEY))||null }catch{return null} }
function saveSession(u){ localStorage.setItem(SESSION_KEY,JSON.stringify(u)) }
function clearSession(){ localStorage.removeItem(SESSION_KEY) }

let _regGender='m';
function setG(g){
  _regGender=g;
  document.getElementById('gM').classList.toggle('on',g==='m');
  document.getElementById('gF').classList.toggle('on',g==='f');
}

let _loginMode='login';
function switchLogin(m){
  _loginMode=m;
  document.getElementById('ltLogin').classList.toggle('on',m==='login');
  document.getElementById('ltReg').classList.toggle('on',m==='reg');
  document.getElementById('formLogin').style.display=m==='login'?'block':'none';
  document.getElementById('formReg').style.display=m==='reg'?'block':'none';
  document.getElementById('loginErr').classList.remove('on');
}

function showLoginErr(msg){
  const el=document.getElementById('loginErr');
  el.textContent=msg;el.classList.add('on');
}

function setBtnLoading(id, loading, label){
  const b=document.getElementById(id); if(!b) return;
  b.disabled=loading;
  b.textContent=loading?'جارٍ التحميل...':label;
}

async function doLogin(){
  const u=document.getElementById('lUser').value.trim().toLowerCase();
  const p=document.getElementById('lPass').value;
  if(!u||!p){ showLoginErr('اكتب اسم المستخدم وكلمة المرور'); return; }
  setBtnLoading('btnLogin',true,'دخول ←');
  try{
    const user = await sbGet('users',{username:u});
    if(!user){ showLoginErr('اسم المستخدم غير موجود — سجّل حساب جديد'); return; }
    if(user.pass_hash!==hashPass(p)){ showLoginErr('كلمة المرور غلط، حاول تاني'); return; }
    saveSession({username:u, name:user.name, gender:user.gender});
    startApp(u, user.name, user.gender);
  } catch(e){
    showLoginErr('خطأ في الاتصال — تأكد من النت وحاول تاني');
  } finally {
    setBtnLoading('btnLogin',false,'دخول ←');
  }
}

async function doRegister(){
  const u=document.getElementById('rUser').value.trim().toLowerCase();
  const n=document.getElementById('rName').value.trim();
  const p=document.getElementById('rPass').value;
  if(!u||!n||!p){ showLoginErr('اكمل كل الحقول'); return; }
  if(!/^[a-z0-9_]{3,20}$/.test(u)){ showLoginErr('اسم المستخدم: حروف إنجليزية وأرقام فقط (٣-٢٠ حرف)'); return; }
  if(p.length<4){ showLoginErr('كلمة المرور على الأقل ٤ حروف'); return; }
  setBtnLoading('btnReg',true,'إنشاء الحساب ✨');
  try{
    const existing = await sbGet('users',{username:u});
    if(existing){ showLoginErr('اسم المستخدم ده موجود، جرب اسم تاني أو سجّل دخول'); return; }
    const created = await sbInsert('users',{username:u, pass_hash:hashPass(p), name:n, gender:_regGender});
    if(!created){ showLoginErr('حصل خطأ في إنشاء الحساب، حاول تاني'); return; }
    saveSession({username:u, name:n, gender:_regGender});
    startApp(u, n, _regGender);
    toast('مرحباً يا '+n+' 🌙','gd');
  } catch(e){
    showLoginErr('خطأ في الاتصال — تأكد من النت وحاول تاني');
  } finally {
    setBtnLoading('btnReg',false,'إنشاء الحساب ✨');
  }
}

function logout(){
  if(!confirm('هتخرج من حسابك؟')) return;
  clearSession(); showLogin();
}

/* ══════════════════════════════
   APP STATE
══════════════════════════════ */
let CU   = null; // current username
let S    = null; // current state
let _saving = false;
let _saveTimer = null;

function defaultState(){
  return {
    tasks: defaultTasks(),
    wird: {},
    quranPage: 1,
    quranBookmarks: {},
    quranStarred: {},
    quranNotes: {},
    khatmahPages: {},
    history: {},
    yearly_plan: [],
    routine: [],
    weekGrid: null,
    lastReset: todayKey(),
  };
}

async function loadState(){
  const row = await sbGet('planner_data',{username:CU});
  if(!row || !row.data){ S = defaultState(); return; }
  S = {...defaultState(), ...row.data};
}

// Debounced save — waits 800ms after last change before writing to Supabase
function saveState(){
  // Optimistic local cache so UI feels instant
  localStorage.setItem('planner_cache_'+CU, JSON.stringify(S));
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(async ()=>{
    try{
      await sbUpsert('planner_data',{username:CU, data:S, updated_at:new Date().toISOString()},'username');
    } catch(e){ /* silent — cached locally */ }
  }, 800);
}

function todayKey(){ const d=new Date(); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` }

/* ══════════════════════════════
   TASKS
══════════════════════════════ */
function defaultTasks(){
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
}

/* ══════════════════════════════
   INIT / ROUTING
══════════════════════════════ */
function showLogin(){
  document.getElementById('scApp').classList.remove('on');
  document.getElementById('scLogin').classList.add('on');
}

function showAppLoading(show){
  let el=document.getElementById('appLoader');
  if(!el){
    el=document.createElement('div');
    el.id='appLoader';
    el.style.cssText='position:fixed;inset:0;z-index:900;background:var(--bg);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;font-family:Tajawal,sans-serif;color:var(--t2);font-size:.9rem;font-weight:700';
    el.innerHTML='<div style="font-size:2rem;animation:spin 1s linear infinite">⏳</div><div>جارٍ تحميل بياناتك...</div>';
    document.body.appendChild(el);
    const style=document.createElement('style');
    style.textContent='@keyframes spin{to{transform:rotate(360deg)}}';
    document.head.appendChild(style);
  }
  el.style.display=show?'flex':'none';
}

async function startApp(username, name, gender){
  CU = username;
  showAppLoading(true);
  // Try loading from Supabase, fallback to local cache
  try{
    await loadState();
  } catch(e){
    const cached=localStorage.getItem('planner_cache_'+CU);
    if(cached) S=JSON.parse(cached);
    else S=defaultState(new Date().getDay());
  }
  if(!S.yearly_plan) S.yearly_plan = [];
  if(!S.history) S.history = {};
  checkDayReset();
  syncWeekScheduleToTasks();
  showAppLoading(false);
  document.getElementById('scLogin').classList.remove('on');
  document.getElementById('scApp').classList.add('on');
  document.getElementById('greeting').textContent = greet(name||username, gender||'m');
  updateDatePill();
  const datePillEl = document.getElementById('datePill');
  datePillEl.classList.add('clickable');
  datePillEl.title = 'فتح التقويم';
  datePillEl.onclick = goToCalendar;
  showHeaderAyah();
  renderAll();
  checkPrayerReminder();
  fetchPrayerTimes();

  // Startup audio — first 4 seconds only, once per day
  if(!sessionStorage.getItem('startupAudioPlayed')){
    playStartupAudio();
    sessionStorage.setItem('startupAudioPlayed','1');
  }

  // Welcome Modal Logic — once per day
  if (S.lastWirdPopupDate !== todayKey()) {
    const wirdModal = document.getElementById('wirdWelcomeModal');
    if (wirdModal) {
      wirdModal.style.display = 'flex';
      S.lastWirdPopupDate = todayKey();
      saveState();
    }
  }
}

function checkDayReset(){
  if(!S) return false;
  const k=todayKey();
  if(S.lastReset!==k){
    if(S.lastReset&&S.tasks&&S.tasks.length){
      const done=S.tasks.filter(t=>t.done).length, total=S.tasks.length;
      if(!S.history) S.history={};
      S.history[S.lastReset]={done,total,pct:Math.round(done/total*100)};
    }
    const prevTasks=(S.tasks||[]).filter(t=>t.id.startsWith('c'));
    S.tasks=defaultTasks();
    prevTasks.forEach(t=>{ t.done=false; S.tasks.push(t); });
    S.wird={};
    S.lastReset=k;
    saveState();
    syncWeekScheduleToTasks();
    return true;
  }
  return false;
}

function updateDatePill(){
  const now=new Date();
  const datePillEl = document.getElementById('datePill');
  if(!datePillEl) return;
  let gregStr = '📅 '+DAYS_AR[now.getDay()]+'، '+now.getDate()+' '+MONTHS_AR[now.getMonth()];
  try{
    const hFmt = new Intl.DateTimeFormat('ar-SA-u-ca-islamic',{day:'numeric',month:'long'});
    gregStr += ' | 🌙 '+hFmt.format(now);
  } catch{}
  datePillEl.textContent = gregStr;
}

/* ── Weekly schedule → auto-sync to today's tasks ── */
function syncWeekScheduleToTasks(){
  if(!S) return;
  const today=new Date().getDay();
  const dispOrder=[6,0,1,2,3,4,5];
  const todayCol=dispOrder.indexOf(today);
  const grid=S.weekGrid||DEFAULT_WEEK_GRID;
  const todayK=todayKey();
  const tagMap={wp:'tq',ww:'tw',ws:'ts',we:'tf',wai:'th',wb:'tf',wm:'tf',wr:'tr',wf:'tf'};
  let added=0;
  grid.forEach((row,ri)=>{
    const cell=row.cells[todayCol];
    if(!cell||!cell.t||cell.t==='—') return;
    const cellId=`sch_${todayK}_r${ri}`;
    if(S.tasks.find(t=>t.id===cellId)) return;
    S.tasks.push({id:cellId,n:cell.t,tm:row.tm,tag:tagMap[cell.c]||'tf',pri:'med',done:false,note:'من الجدول الأسبوعي',fromSchedule:true});
    added++;
  });
  if(added>0){ saveState(); if(typeof renderTasks==='function') renderTasks(); }
}

async function init(){
  initTheme();
  const sess=getSession();
  if(sess&&sess.username){
    // Verify user still exists in Supabase
    try{
      const user=await sbGet('users',{username:sess.username});
      if(user){
        saveSession({...sess, name: user.name, gender: user.gender});
        startApp(sess.username, user.name, user.gender);
        return;
      }
    } catch(e){
      // No network — try with cached session anyway
      if(sess.name){
        startApp(sess.username, sess.name, sess.gender);
        return;
      }
    }
    clearSession();
  }
  showLogin();
}

/* ══════════════════════════════
   GREETING
══════════════════════════════ */
function greet(name,gender){
  const h=new Date().getHours();
  const f=gender==='f';
  const em=f?'🌸':'✨';
  if(h>=4&&h<6)  return `صباح النور يا ${name} ${em}`;
  if(h<12)        return `صباح الفل يا ${name} ${em}`;
  if(h<15)        return `نهار سعيد يا ${name} ${em}`;
  if(h<18)        return `عصر مبارك يا ${name} ${em}`;
  if(h<20)        return `مساء الخير يا ${name} ${em}`;
  return `ليلة مباركة يا ${name} ${em}`;
}

/* ══════════════════════════════
   PRAYER REMINDER
══════════════════════════════ */
function parseArabicTime(str){
  if(!str||str==='—') return null;
  const m=str.match(/(\d+):(\d+)\s*(ص|م)/);
  if(!m) return null;
  let h=parseInt(m[1]),mn=parseInt(m[2]),ampm=m[3];
  if(ampm==='م'&&h!==12) h+=12;
  if(ampm==='ص'&&h===12) h=0;
  return h*60+mn;
}

const _prayerReminderDismissed = {};
function checkPrayerReminder(){
  const now=new Date();
  const nowMin=now.getHours()*60+now.getMinutes();
  const todayK=todayKey();
  const staticPrayers=[
    {id:'t3',name:'الفجر',  startH:4, endH:6},
    {id:'t7',name:'الظهر',  startH:13,endH:15},
    {id:'t9',name:'العصر',  startH:15,endH:17},
    {id:'t12',name:'المغرب',startH:18,endH:19},
    {id:'t14',name:'العشاء',startH:19,endH:21},
  ];
  const apiMap={t3:'Fajr',t7:'Dhuhr',t9:'Asr',t12:'Maghrib',t14:'Isha'};
  for(const p of staticPrayers){
    // Skip if already dismissed today for this prayer
    if(_prayerReminderDismissed[todayK+'_'+p.id]) continue;
    let inWindow=false;
    if(_prayerTimes&&apiMap[p.id]){
      const pm=parseTimeStr(_prayerTimes[apiMap[p.id]]);
      if(pm!==null) inWindow=nowMin>=pm&&nowMin<=pm+5;
    } else {
      inWindow=nowMin>=p.startH*60&&nowMin<=p.endH*60;
    }
    if(inWindow){
      const task=S&&S.tasks&&S.tasks.find(t=>t.id===p.id);
      if(task&&!task.done){
        const el=document.getElementById('prayRemind');
        if(el&&!el.classList.contains('on')){
          document.getElementById('prayRemindTxt').textContent=`🕌 وقت صلاة ${p.name} — هل صليت؟`;
          el.classList.add('on');
          el.dataset.prayerId = p.id;
        }
        return;
      }
    }
  }
}
function closePrayRemind(){
  stopAudio();
  const el = document.getElementById('prayRemind');
  const pid = el.dataset.prayerId;
  if(pid) _prayerReminderDismissed[todayKey()+'_'+pid] = true;
  el.classList.remove('on');
}

/* ── Task reminders (all timed tasks) ── */
const _notifiedToday={};
function checkTaskReminders(){
  if(!S||!S.tasks) return;
  const now=new Date();
  const nowMin=now.getHours()*60+now.getMinutes();
  const todayK=todayKey();
  const prayerIds=new Set(['t3','t7','t9','t12','t14']);

  S.tasks.forEach(task=>{
    if(task.done) return;
    const taskMin=parseArabicTime(task.tm);
    if(taskMin===null) return;
    if(Math.abs(nowMin-taskMin)>1) return;
    const nKey=task.id+'_'+todayK;
    if(_notifiedToday[nKey]) return;
    _notifiedToday[nKey]=true;

    if(task.id==='t2'){ playQiyam(); }
    else if(!prayerIds.has(task.id)){
      if(Notification.permission==='granted'){
        new Notification('⏰ مخططي اليومي',{body:'📌 '+task.n+' — '+task.tm,icon:'./icon.svg'});
      }
      toast('⏰ '+task.n,'gd');
    }
  });
}

// Intervals
setInterval(checkPrayerReminder, 5*60*1000);
setInterval(checkFastingReminder, 60*1000);
setInterval(checkTaskReminders, 60*1000);
setInterval(() => {
  if (S) {
    if (checkDayReset()) {
      renderAll();
    }
    updateDatePill();
  }
}, 60*1000);

/* ══════════════════════════════
   RENDER TASKS
══════════════════════════════ */
let _filter='all';
function setFilter(f,btn){
  _filter=f;
  document.querySelectorAll('.filt').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  renderTasks();
}

function renderTasks(){
  const done=S.tasks.filter(t=>t.done).length, total=S.tasks.length;
  const pct=total?Math.round(done/total*100):0;
  document.getElementById('sDone').textContent=done;
  document.getElementById('sLeft').textContent=total-done;
  document.getElementById('sPct').textContent=pct+'%';
  document.getElementById('progPill').textContent='⏳ '+pct+'%';

  // Motivation — changes based on pct
  const mot=RAND_MOT(pct);
  document.getElementById('motIco').textContent=mot.i;
  document.getElementById('motTxt').textContent=mot.t;
  document.getElementById('motSub').textContent=mot.s;

  const groups=[
    {lbl:'🕌 الصلوات والقرآن',tags:['tp','tq']},
    {lbl:'💼 الشغل',           tags:['tw']},
    {lbl:'🎓 المحاضرات',       tags:['ts']},
    {lbl:'🌟 باقي اليوم',      tags:['tr','tc','th','tf']},
  ];

  // Filter
  let filtered=S.tasks;
  if(_filter!=='all') filtered=S.tasks.filter(t=>t.pri===_filter);

  const list=document.getElementById('taskList');
  list.innerHTML='';

  if(_filter!=='all'){
    // Flat list for filtered view
    if(!filtered.length){
      list.innerHTML=`<div style="text-align:center;padding:30px;color:var(--t3);font-size:.85rem">لا توجد مهام بهذه الأولوية</div>`;
    } else {
      filtered.forEach(t=>list.appendChild(makeCard(t)));
    }
    return;
  }

  groups.forEach(g=>{
    const items=filtered.filter(t=>g.tags.includes(t.tag));
    if(!items.length) return;
    const lbl=document.createElement('div');
    lbl.className='slbl';lbl.textContent=g.lbl;
    list.appendChild(lbl);
    items.forEach(t=>list.appendChild(makeCard(t)));
  });
}

function makeCard(t){
  const wrap=document.createElement('div');
  wrap.className=`task ${t.pri||'low'} ${t.done?'done':''}`;
  wrap.dataset.id=t.id;
  const noteDisplay=t.note?`<div class="t-note-show">💡 ${t.note}</div>`:'';
  wrap.innerHTML=`
    <div class="task-top">
      <div class="chk">${t.done?'✓':''}</div>
      <div class="t-body">
        <div class="t-name">${t.n}</div>
        <div class="t-meta">
          <span class="t-time">🕐 ${t.tm||'—'}${t.tm_end?` ← ${t.tm_end}`:''}</span>
          <span class="t-tag ${t.tag}">${TAG_LBL[t.tag]||''}</span>
          <span class="t-pri pri-${t.pri||'low'}">${PRI_LBL[t.pri||'low']}</span>
        </div>
        ${noteDisplay}
        <div class="edit-row" id="er_${t.id}">
          <input class="edit-inp" id="ei_${t.id}" value="${(t.n||'').replace(/"/g,'&quot;')}" onclick="event.stopPropagation()"/>
          <button class="btn-save" onclick="saveEdit('${t.id}');event.stopPropagation()">حفظ</button>
        </div>
        <div class="t-note-inp-wrap" id="nw_${t.id}" style="display:none">
          <textarea class="t-note-inp" id="ni_${t.id}" rows="2" placeholder="اكتب ملاحظتك هنا..." onclick="event.stopPropagation()">${t.note||''}</textarea>
          <button class="btn-save" style="margin-top:4px" onclick="saveNote('${t.id}');event.stopPropagation()">حفظ الملاحظة</button>
        </div>
      </div>
    </div>
    <div class="task-actions" id="ta_${t.id}">
      <button class="act-btn gold" onclick="toggleEdit('${t.id}',event)">✏️ تعديل</button>
      <button class="act-btn gold" onclick="toggleNote('${t.id}',event)">📝 ملاحظة</button>
      <button class="act-btn"      onclick="openPomo('${t.id}',event)">⏱️ تركيز</button>
      <button class="act-btn danger" onclick="deleteTask('${t.id}',event)">🗑️</button>
    </div>`;
  // Click top area to toggle done
  wrap.querySelector('.task-top').addEventListener('click',()=>toggleDone(t.id));
  // Long press or second click reveals actions
  wrap.addEventListener('click',e=>{
    if(e.target.closest('.task-actions,.edit-row,.t-note-inp-wrap')) return;
    const ta=document.getElementById('ta_'+t.id);
    if(ta) ta.classList.toggle('on');
  });
  return wrap;
}

function toggleDone(id){
  const t=S.tasks.find(x=>x.id===id); if(!t) return;
  t.done=!t.done; saveState(); renderTasks(); updateRing();
  if(t.done){
    const msg=DONE_TOASTS[Math.floor(Math.random()*DONE_TOASTS.length)];
    toast(msg,'ok');
    // Also update motivation banner with new pct
  }
}

function toggleEdit(id,e){
  e.stopPropagation();
  const r=document.getElementById('er_'+id); if(!r) return;
  r.classList.toggle('on');
  if(r.classList.contains('on')) document.getElementById('ei_'+id).focus();
}

function saveEdit(id){
  const v=document.getElementById('ei_'+id)?.value.trim(); if(!v) return;
  const t=S.tasks.find(x=>x.id===id); if(t){ t.n=v; saveState(); renderTasks(); toast('تم التعديل ✓','ok'); }
}

function toggleNote(id,e){
  e.stopPropagation();
  const w=document.getElementById('nw_'+id); if(!w) return;
  w.style.display=w.style.display==='none'?'block':'none';
  if(w.style.display==='block') document.getElementById('ni_'+id).focus();
}

function saveNote(id){
  const v=document.getElementById('ni_'+id)?.value||'';
  const t=S.tasks.find(x=>x.id===id); if(t){ t.note=v; saveState(); renderTasks(); toast('تم حفظ الملاحظة ✓','ok'); }
}

function deleteTask(id,e){
  e.stopPropagation();
  if(!confirm('حذف المهمة دي؟')) return;
  S.tasks=S.tasks.filter(x=>x.id!==id); saveState(); renderTasks();
}

/* ── ADD TASK ── */
let _newPri='med';
function setPri(p){
  _newPri=p;
  ['h','m','l'].forEach(k=>document.getElementById('pb-'+k).classList.remove('on'));
  const map={high:'h',med:'m',low:'l'};
  document.getElementById('pb-'+map[p]).classList.add('on');
}

function addTask(){
  const name=document.getElementById('addName').value.trim();
  if(!name){toast('اكتب اسم المهمة أولاً','warn');return;}
  const tmStart=document.getElementById('addTimeStart').value.trim();
  const tmEnd=document.getElementById('addTimeEnd').value.trim();
  const note=document.getElementById('addNote').value.trim();
  S.tasks.push({id:'c'+Date.now(),n:name,tm:tmStart||'—',tm_end:tmEnd||null,tag:'tf',pri:_newPri,done:false,note});
  document.getElementById('addName').value='';
  document.getElementById('addTimeStart').value='';
  document.getElementById('addTimeEnd').value='';
  document.getElementById('addNote').value='';
  saveState(); renderTasks(); toast('تمت الإضافة ✓','ok');
}

function resetDay(){
  if(!confirm('هتعيد كل المهام لحالتها الأصلية؟')) return;
  const k=todayKey();
  if(S.tasks&&S.tasks.length){
    const done=S.tasks.filter(t=>t.done).length, total=S.tasks.length;
    if(!S.history) S.history={};
    S.history[k]={done,total,pct:total?Math.round(done/total*100):0};
  }
  S.tasks=defaultTasks(); S.wird={};
  saveState(); renderAll(); tab('today',document.querySelector('.tab.on'));
  toast('تم إعادة الضبط وحفظ أداء اليوم','gd');
}

/* ══════════════════════════════
   EDIT NAME
══════════════════════════════ */
let _editG='m';
function openEditName(){
  const sess=getSession()||{};
  document.getElementById('editNameInp').value=sess.name||CU||'';
  _editG=sess.gender||'m';
  document.getElementById('enGM').classList.toggle('on',_editG==='m');
  document.getElementById('enGF').classList.toggle('on',_editG==='f');
  document.getElementById('editNameOverlay').classList.add('on');
}
function closeEditName(){ document.getElementById('editNameOverlay').classList.remove('on') }
function setEditG(g){
  _editG=g;
  document.getElementById('enGM').classList.toggle('on',g==='m');
  document.getElementById('enGF').classList.toggle('on',g==='f');
}
async function saveEditName(){
  const v=document.getElementById('editNameInp').value.trim(); if(!v) return;
  try{
    await sbUpdate('users',{username:CU},{name:v,gender:_editG});
    // Update session cache
    const sess=getSession();
    if(sess){ sess.name=v; sess.gender=_editG; saveSession(sess); }
  } catch(e){ /* silent */ }
  document.getElementById('greeting').textContent=greet(v,_editG);
  closeEditName(); toast('تم التحديث ✓','gd');
}

/* ══════════════════════════════
   POMODORO
══════════════════════════════ */
let _pomoTimer=null, _pomoLeft=25*60, _pomoRunning=false, _pomoTaskId=null;
const POMO_TOTAL=25*60;

function openPomo(taskId,e){
  e.stopPropagation();
  const t=S.tasks.find(x=>x.id===taskId); if(!t) return;
  _pomoTaskId=taskId;
  _pomoLeft=POMO_TOTAL; _pomoRunning=false;
  clearInterval(_pomoTimer);
  document.getElementById('pomoTaskName').textContent=t.n;
  document.getElementById('pomoTime').textContent='25:00';
  document.getElementById('pomoLbl').textContent='اضغط ابدأ للتركيز ٢٥ دقيقة';
  document.getElementById('pomoBtnStart').textContent='▶ ابدأ';
  document.getElementById('pomoFill').style.strokeDashoffset='0';
  document.getElementById('pomoOverlay').classList.add('on');
}

function pomoToggle(){
  if(_pomoRunning){ clearInterval(_pomoTimer); _pomoRunning=false;
    document.getElementById('pomoBtnStart').textContent='▶ استمر';
  } else {
    _pomoRunning=true;
    document.getElementById('pomoBtnStart').textContent='⏸ إيقاف';
    _pomoTimer=setInterval(()=>{
      _pomoLeft--;
      const m=Math.floor(_pomoLeft/60), s=_pomoLeft%60;
      document.getElementById('pomoTime').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
      const prog=1-(_pomoLeft/POMO_TOTAL);
      document.getElementById('pomoFill').style.strokeDashoffset=String(502*(1-prog));
      document.getElementById('pomoLbl').textContent=`${m} دقيقة و${s} ثانية متبقية`;
      if(_pomoLeft<=0){
        clearInterval(_pomoTimer); _pomoRunning=false;
        document.getElementById('pomoBtnStart').textContent='✓ انتهى!';
        document.getElementById('pomoLbl').textContent='أحسنت! ٢٥ دقيقة تركيز كاملة 🏆';
        toast('جلسة تركيز منتهية! ٢٥ دقيقة ✨','gd');
      }
    },1000);
  }
}

function pomoClose(){ clearInterval(_pomoTimer); _pomoRunning=false; document.getElementById('pomoOverlay').classList.remove('on') }

/* ══════════════════════════════
   WIRD
══════════════════════════════ */
let _ayahIdx=0;
function nextAyah(){
  _ayahIdx=(_ayahIdx+1)%AYAHS.length;
  renderAyah();
}
function renderAyah(){
  const a=AYAHS[_ayahIdx];
  document.getElementById('ayahTxt').textContent=a.ar;
  document.getElementById('ayahSrc').textContent=a.src;
}

function renderWird(){
  renderAyah();
  renderWirdSec('wcFajr',  WIRD_FAJR,   'fajr');
  renderWirdSec('wcPrayers',WIRD_PRAYERS,'prayers');
  renderWirdSec('wcEvening',WIRD_EVENING,'evening');
}

function renderWirdSec(elId,items,key){
  if(!S.wird) S.wird={};
  if(!S.wird[key]) S.wird[key]={};
  const done=items.filter(i=>S.wird[key][i.id]).length, total=items.length;
  const pct=total?Math.round(done/total*100):0;
  const titles={fajr:'ورد الصباح',prayers:'الصلوات الخمس',evening:'ورد المساء'};
  const el=document.getElementById(elId); if(!el) return;
  el.innerHTML=`
    <div class="wird-hdr">
      <div class="wird-ttl">📿 ${titles[key]}</div>
      <div class="wird-pct">${done}/${total}</div>
    </div>
    <div class="wird-bar"><div class="wird-fill" style="width:${pct}%"></div></div>
    <div class="wird-grid">
      ${items.map(i=>`
        <div class="wird-item ${S.wird[key][i.id]?'done':''}" onclick="toggleWird('${key}','${i.id}')">
          <div class="wird-chk">${S.wird[key][i.id]?'✓':''}</div>
          <div class="wird-txt">${i.t}</div>
          <div class="wird-cnt">${i.c}</div>
        </div>`).join('')}
    </div>`;
}

function toggleWird(key,id){
  if(!S.wird[key]) S.wird[key]={};
  S.wird[key][id]=!S.wird[key][id]; saveState(); renderWird();
  if(S.wird[key][id]) toast('بارك الله فيك 🤲','gd');
}

/* ══════════════════════════════
   WEEK TABLE
══════════════════════════════ */
function showHeaderAyah(){
  const a=AYAHS[new Date().getDate()%AYAHS.length];
  document.getElementById('hdrAyah').innerHTML=a.ar+'<span>'+a.src+'</span>';
}

function renderWeek(){
  const today = new Date().getDay();
  const dispOrder = [6,0,1,2,3,4,5];
  const hdrs = ['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'];
  const todayDisp = dispOrder.indexOf(today);
  const rows = S.weekGrid || DEFAULT_WEEK_GRID;

  let h = '<thead><tr><th style="font-size:.65rem;padding:8px 6px">الوقت</th>';
  hdrs.forEach((d,i)=>{ h+=`<th class="${i===todayDisp?'td':''}">${d}${i===todayDisp?' 📍':''}</th>`; });
  h += '</tr></thead><tbody>';

  rows.forEach((r,ri)=>{
    h += '<tr>';
    if(_weekEditMode){
      h += `<td style="padding:3px;vertical-align:top">
        <input class="week-time-inp" data-r="${ri}" value="${r.tm}" placeholder="الوقت">
        <button onclick="deleteWeekRow(${ri})" style="background:var(--rosedim);border:1px solid rgba(244,63,94,.3);color:var(--rose);cursor:pointer;border-radius:4px;padding:2px 5px;font-size:.6rem;width:100%">حذف</button>
      </td>`;
    } else {
      h += `<td style="font-size:.67rem;font-weight:800;color:var(--t2);white-space:nowrap;padding:8px 8px">${r.tm}</td>`;
    }
    r.cells.forEach((c,ci)=>{
      if(_weekEditMode){
        h += `<td ${ci===todayDisp?'class="td"':''} style="padding:3px">
          <input class="week-cell-inp" data-r="${ri}" data-c="${ci}" value="${c.t}">
        </td>`;
      } else {
        h += `<td ${ci===todayDisp?'class="td"':''}><div class="wc ${c.c}">${c.t}</div></td>`;
      }
    });
    h += '</tr>';
  });

  if(_weekEditMode){
    h += `<tr><td colspan="8" style="padding:8px;text-align:center">
      <button onclick="addWeekRow()" style="background:var(--golddim);border:1px solid rgba(212,175,55,.4);border-radius:var(--rsm);padding:7px 18px;color:var(--gold);font-family:'Tajawal',sans-serif;font-size:.78rem;font-weight:800;cursor:pointer">+ إضافة صف</button>
    </td></tr>`;
  }
  h += '</tbody>';
  document.getElementById('weekTbl').innerHTML = h;

  // Render custom routines
  if(!S.routine || !S.routine.length){
    document.getElementById('routineList').innerHTML = '<div style="color:var(--t3);font-size:.78rem;padding:10px 0;text-align:center">لا يوجد روتين شخصي بعد — اضغط + إضافة.</div>';
    return;
  }
  const dayShort = ['أحد','اثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت'];
  document.getElementById('routineList').innerHTML = S.routine.map(r=>`
    <div style="display:flex;gap:10px;align-items:center;background:var(--s1);border:1px solid var(--bdr);border-radius:var(--rsm);padding:10px 14px;margin-bottom:6px">
      <div style="flex:1">
        <div style="font-size:.84rem;font-weight:700;color:var(--t1)">${r.n}</div>
        <div style="font-size:.68rem;color:var(--t2);margin-top:3px">${r.days.map(d=>dayShort[d]).join('، ')}</div>
      </div>
      <button onclick="delRoutine('${r.id}')" style="background:none;border:none;color:var(--rose);cursor:pointer;font-size:.9rem;padding:4px">✕</button>
    </div>`).join('');
}

/* ══════════════════════════════
   PROGRESS
══════════════════════════════ */
function updateRing(){
  const done=S.tasks.filter(t=>t.done).length, total=S.tasks.length;
  const pct=total?Math.round(done/total*100):0;
  const r=document.getElementById('ringEl');
  if(r) r.style.strokeDashoffset=String(283-(pct/100*283));
  const rp=document.getElementById('ringPct');
  if(rp) rp.textContent=pct+'%';
  const msgs=[[0,'ابدأ يومك باسم الله 🌙'],[25,'برافو! استمر 💪'],[50,'نص الطريق! واصل 🌟'],[75,'قريب جداً 🔥'],[100,'يوم مكتمل! ما شاء الله 🏆']];
  let msg=msgs[0][1];
  msgs.forEach(([t,m])=>{ if(pct>=t) msg=m });
  const rm=document.getElementById('ringMsg');
  if(rm) rm.textContent=msg;
}

function renderStreak(){
  const today=new Date(); let h='';
  for(let i=6;i>=0;i--){
    const d=new Date(today); d.setDate(d.getDate()-i);
    const k=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    const isToday=i===0, hist=S.history?S.history[k]:null;
    const ok=hist&&hist.pct>=70;
    h+=`<div class="s-day ${ok?'ok':''} ${isToday?'today':''}">
      <span>${isToday?'📍':ok?'✓':'○'}</span>
      <span>${DAYS_SH[d.getDay()]}</span>
      <span style="font-size:.55rem">${hist?hist.pct+'%':isToday?'—':'—'}</span>
    </div>`;
  }
  const el=document.getElementById('streakRow'); if(el) el.innerHTML=h;
  const hv=Object.values(S.history||{}).slice(-7);
  const td=hv.reduce((s,h)=>s+(h.done||0),0);
  let streak=0;
  for(let i=hv.length-1;i>=0;i--){ if(hv[i].pct>=70) streak++; else break; }
  const avg=hv.length?Math.round(hv.reduce((s,h)=>s+(h.pct||0),0)/hv.length):0;
  ['wkT','wkS','wkA'].forEach((id,i)=>{
    const el=document.getElementById(id); if(el) el.textContent=[td,streak+' 🔥',avg+'%'][i];
  });
}

/* ══════════════════════════════
   TABS
══════════════════════════════ */
function tab(id,btn){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById('page-'+id).classList.add('on');
  if(id==='prog'){ updateRing(); renderStreak(); }
  if(id==='wird'){ renderWird(); renderPrayerTimesCard(); }
  if(id==='year'){ renderYearlyPlan(); }
  if(id==='hist'){ renderHistory(); }
  if(id==='cal'){ renderCalendar(); }
}

/* ══════════════════════════════
   YEARLY PLAN
══════════════════════════════ */
function addYpItem(){
  const cat = document.getElementById('ypAddCat').value;
  const txt = document.getElementById('ypAddTxt').value.trim();
  if(!txt){ toast('اكتب الهدف','warn'); return; }
  S.yearly_plan.push({id:'y'+Date.now(), cat, txt, done:false});
  document.getElementById('ypAddTxt').value='';
  saveState(); renderYearlyPlan(); toast('تم الـإضافة ✓','ok');
}
function toggleYp(id){
  const item = S.yearly_plan.find(i=>i.id===id); if(!item) return;
  item.done = !item.done;
  saveState(); renderYearlyPlan();
}
function delYp(id, e){
  e.stopPropagation();
  if(!confirm('حذف هذا الهدف السنوي؟')) return;
  S.yearly_plan = S.yearly_plan.filter(i=>i.id!==id);
  saveState(); renderYearlyPlan();
}
function renderYearlyPlan(){
  if(!S.yearly_plan) S.yearly_plan=[];
  const cats = {
    'دين': {lbl:'🕌 المجال الديني', clr:'var(--gold2)'},
    'عمل': {lbl:'💼 العمل والدراسة', clr:'var(--sap)'},
    'صحة': {lbl:'🏃 الصحة والرياضة', clr:'var(--em)'},
    'مهارات': {lbl:'🌟 مهارات وهوايات', clr:'var(--amb)'}
  };
  let html='';
  Object.keys(cats).forEach(k=>{
    const items = S.yearly_plan.filter(i=>i.cat===k);
    if(!items.length) return;
    html+=`<div class="yp-cat">
      <div class="yp-cat-ttl" style="color:${cats[k].clr}">${cats[k].lbl}</div>`;
    items.forEach(i=>{
      html+=`<div class="yp-item ${i.done?'done':''}" onclick="toggleYp('${i.id}')">
        <div class="yp-chk">${i.done?'✓':''}</div>
        <div class="yp-txt">${i.txt}</div>
        <button style="background:none;border:none;color:var(--rose);cursor:pointer" onclick="delYp('${i.id}', event)">✕</button>
      </div>`;
    });
    html+=`</div>`;
  });
  if(!html) html='<div style="text-align:center;color:var(--t3);padding:20px;font-size:.8rem">لم تقم بإضافة أهداف سنوية بعد.</div>';
  document.getElementById('ypContainer').innerHTML = html;
  
  const tot = S.yearly_plan.length;
  const dn = S.yearly_plan.filter(i=>i.done).length;
  const pct = tot?Math.round(dn/tot*100):0;
  document.getElementById('ypOverallPct').textContent = `${pct}% إنجاز كلي السنادي`;
}

/* ══════════════════════════════
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
    html+=`<div class="hist-card">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="font-size:1.4rem;color:${clr}">${ico}</div>
        <div>
          <div class="hist-dt">${d}</div>
          <div class="hist-det">تم ${v.done} من ${v.total}</div>
        </div>
      </div>
      <div class="hist-pct">${v.pct}%</div>
    </div>`;
  });
  document.getElementById('histContainer').innerHTML = html;
}

/* ══════════════════════════════
   RENDER ALL
══════════════════════════════ */
function renderAll(){ renderTasks(); renderWird(); renderPrayerTimesCard(); renderWeek(); updateRing(); renderYearlyPlan(); renderHistory(); }

/* ══════════════════════════════
   ADHKAR OVERLAY
══════════════════════════════ */
function openAdhkar(type){
  const list=type==='sabah'?ADHKAR_SABAH:ADHKAR_MASA;
  const title=type==='sabah'?'🌅 أذكار الصباح':'🌙 أذكار المساء';
  const items=list.map(a=>`
    <div style="background:var(--s2);border:1px solid var(--bdr);border-radius:14px;padding:14px 16px;margin-bottom:10px;">
      <div style="font-family:'Noto Naskh Arabic',serif;font-size:.92rem;color:var(--t1);line-height:2.1;margin-bottom:10px;">${a.text}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="background:var(--golddim);color:var(--gold);font-size:.7rem;font-weight:800;padding:3px 10px;border-radius:20px;">${a.count}</span>
        <span style="color:var(--t3);font-size:.65rem;">${a.src}</span>
      </div>
    </div>`).join('');
  let overlay=document.getElementById('adhkarOverlay');
  if(!overlay){
    overlay=document.createElement('div');
    overlay.id='adhkarOverlay';
    overlay.style.cssText='position:fixed;inset:0;background:var(--bg);z-index:20000;display:none;flex-direction:column;';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML=`
    <div style="background:var(--s2);padding:calc(12px + env(safe-area-inset-top)) 16px 12px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--bdr);">
      <button onclick="closeAdhkar()" style="background:var(--s3);border:1px solid var(--bdr2);border-radius:8px;width:34px;height:34px;font-size:1rem;cursor:pointer;color:var(--t1);">✕</button>
      <div style="font-weight:900;color:var(--t1);font-size:1.1rem;">${title}</div>
      <div style="width:34px;"></div>
    </div>
    <div style="flex:1;overflow-y:auto;padding:14px;padding-bottom:calc(14px + env(safe-area-inset-bottom));">
      <div style="text-align:center;color:var(--t3);font-size:.75rem;margin-bottom:14px;padding:8px;background:var(--s2);border-radius:10px;">أذكار مختصرة وردت عن النبي ﷺ</div>
      ${items}
    </div>`;
  overlay.style.display='flex';
}
function closeAdhkar(){
  const el=document.getElementById('adhkarOverlay');
  if(el) el.style.display='none';
}

/* ══════════════════════════════
   TOAST
══════════════════════════════ */
function toast(msg,type=''){
  const t=document.getElementById('toast');
  t.textContent=msg; t.className='toast show '+(type||'');
  clearTimeout(t._t); t._t=setTimeout(()=>{t.className='toast'},2800);
}

/* ══════════════════════════════
   EVENTS
══════════════════════════════ */
document.addEventListener('DOMContentLoaded',init);
document.getElementById('lPass')?.addEventListener('keydown',e=>{ if(e.key==='Enter') doLogin() });
document.getElementById('rPass')?.addEventListener('keydown',e=>{ if(e.key==='Enter') doRegister() });
document.getElementById('addName')?.addEventListener('keydown',e=>{ if(e.key==='Enter') addTask() });
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => console.log('SW registered!', reg)).catch(err => console.log('SW registration failed: ', err));
  });
}


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

/* ══════════════════════════════
   PWA INSTALLATION
══════════════════════════════ */
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
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
    toast('للتثبيت: اضغط زر المشاركة ثم "إضافة للشاشة الرئيسية"!', 'gd');
    const banner = document.getElementById('pwaInstallModal');
    if(banner) banner.style.display = 'none';
  }
};




/* ══════════════════════════════
   LIGHT / DARK MODE
══════════════════════════════ */
function toggleTheme(){
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  const btn = document.getElementById('themeToggle');
  if(btn) btn.textContent = isLight ? '🌙 داكن' : '☀️ فاتح';
}
function initTheme(){
  const saved = localStorage.getItem('theme');
  if(saved === 'light'){
    document.body.classList.add('light-mode');
    const btn = document.getElementById('themeToggle');
    if(btn) btn.textContent = '🌙 داكن';
  }
}

/* ══════════════════════════════
   PRAYER TIMES — AlAdhan API
══════════════════════════════ */
let _prayerTimes = null;

function parseTimeStr(t){
  if(!t) return null;
  const clean = t.replace(/\s*\(.*\)/,'').trim();
  const [h,m] = clean.split(':').map(Number);
  return h*60+m;
}

function formatPrayerTime(t){
  if(!t) return '--:--';
  const clean = t.replace(/\s*\(.*\)/,'').trim();
  const [h,m] = clean.split(':').map(Number);
  const period = h>=12 ? 'م' : 'ص';
  const h12 = h===0?12:h>12?h-12:h;
  return `${h12}:${String(m).padStart(2,'0')} ${period}`;
}

// Task IDs → AlAdhan keys
const PRAYER_TASK_MAP = [
  {id:'t3',  key:'Fajr'},
  {id:'t7',  key:'Dhuhr'},
  {id:'t9',  key:'Asr'},
  {id:'t12', key:'Maghrib'},
  {id:'t14', key:'Isha'},
];

function updateTasksWithPrayerTimes(){
  if(!_prayerTimes || !S || !S.tasks) return;
  let changed = false;
  for(const m of PRAYER_TASK_MAP){
    const task = S.tasks.find(t=>t.id===m.id);
    if(task && _prayerTimes[m.key]){
      const formatted = formatPrayerTime(_prayerTimes[m.key]);
      if(task.tm !== formatted){ task.tm = formatted; changed = true; }
    }
  }
  if(changed){ saveState(); renderTasks(); }
}

async function fetchPrayerTimes(){
  const dateKey = todayKey();
  const cached = JSON.parse(localStorage.getItem('prayer_times')||'null');
  if(cached && cached.date===dateKey){
    _prayerTimes = cached.times;
    renderPrayerTimesCard();
    updateTasksWithPrayerTimes();
    return;
  }

  try{
    let lat, lng;
    try{
      const pos = await new Promise((res,rej)=>
        navigator.geolocation.getCurrentPosition(res, rej, {timeout:6000, enableHighAccuracy:false})
      );
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
    } catch{
      /* geolocation denied — will use IP-based city below */
    }

    let url;
    if(lat !== undefined){
      const ts = Math.floor(Date.now()/1000);
      url = `https://api.aladhan.com/v1/timings/${ts}?latitude=${lat}&longitude=${lng}&method=5&school=0`;
    } else {
      url = `https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5&school=0`;
    }

    const res = await fetch(url);
    if(!res.ok) throw new Error('API error '+res.status);
    const data = await res.json();

    if(data.code===200 && data.data && data.data.timings){
      _prayerTimes = data.data.timings;
      localStorage.setItem('prayer_times', JSON.stringify({date:dateKey, times:_prayerTimes}));
    }
  } catch(e){
    console.warn('Prayer times fetch failed:', e.message);
  }

  renderPrayerTimesCard();
  updateTasksWithPrayerTimes();
}

function renderPrayerTimesCard(){
  const el = document.getElementById('prayerTimesCard');
  if(!el) return;
  if(!_prayerTimes){ el.innerHTML=''; return; }
  const now = new Date();
  const nowMin = now.getHours()*60 + now.getMinutes();
  const prayers = [
    {name:'الفجر',  key:'Fajr',    icon:'🌅'},
    {name:'الظهر',  key:'Dhuhr',   icon:'☀️'},
    {name:'العصر',  key:'Asr',     icon:'🌤️'},
    {name:'المغرب', key:'Maghrib', icon:'🌆'},
    {name:'العشاء', key:'Isha',    icon:'🌙'},
  ];
  // Find next prayer
  let nextIdx = prayers.findIndex(p=>{ const pm=parseTimeStr(_prayerTimes[p.key]); return pm&&pm>nowMin; });
  el.innerHTML = `
    <div class="slbl">مواقيت الصلاة اليوم</div>
    <div class="prayer-times-wrap">
      <div class="prayer-times-grid">
        ${prayers.map((p,i)=>`
          <div class="prayer-time-cell ${i===nextIdx?'next':''}">
            <div class="pt-icon">${p.icon}</div>
            <div class="pt-name">${p.name}</div>
            <div class="pt-time">${formatPrayerTime(_prayerTimes[p.key])}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

/* ══════════════════════════════
   WEEK SCHEDULE — DYNAMIC GRID
══════════════════════════════ */
const DEFAULT_WEEK_GRID = [
  {tm:'5:00 ص', cells:[{t:'مراجعة',c:'wr'},{t:'مراجعة',c:'wr'},{t:'مراجعة',c:'wr'},{t:'مراجعة',c:'wr'},{t:'مراجعة',c:'wr'},{t:'مراجعة',c:'wr'},{t:'قرآن🌅',c:'wp'}]},
  {tm:'9:00 ص', cells:[{t:'شغل💼',c:'ww'},{t:'شغل💼',c:'ww'},{t:'شغل💼',c:'ww'},{t:'شغل💼',c:'ww'},{t:'شغل💼',c:'ww'},{t:'شغل💼',c:'ww'},{t:'حر',c:'wf'}]},
  {tm:'4:30 م', cells:[{t:'Marketing',c:'ws'},{t:'Marketing',c:'ws'},{t:'Marketing',c:'ws'},{t:'Marketing',c:'ws'},{t:'Marketing',c:'ws'},{t:'Marketing',c:'ws'},{t:'AI/ML',c:'wai'}]},
  {tm:'6:00 م', cells:[{t:'English',c:'we'},{t:'—',c:'wf'},{t:'BackEnd',c:'wb'},{t:'English',c:'we'},{t:'BackEnd',c:'wb'},{t:'—',c:'wf'},{t:'عائلة',c:'wf'}]},
  {tm:'8:00 م', cells:[{t:'Mobile📱',c:'wm'},{t:'مراجعة',c:'wr'},{t:'مراجعة',c:'wr'},{t:'Mobile📱',c:'wm'},{t:'AI/DS',c:'wai'},{t:'مراجعة',c:'wr'},{t:'وقت حر',c:'wf'}]},
];

let _weekEditMode = false;

function toggleWeekEdit(){
  if(_weekEditMode){
    // Save: collect values from inputs
    if(!S.weekGrid) S.weekGrid = JSON.parse(JSON.stringify(DEFAULT_WEEK_GRID));
    document.querySelectorAll('.week-cell-inp').forEach(inp=>{
      const r=parseInt(inp.dataset.r), c=parseInt(inp.dataset.c);
      if(S.weekGrid[r] && S.weekGrid[r].cells[c]) S.weekGrid[r].cells[c].t = inp.value;
    });
    document.querySelectorAll('.week-time-inp').forEach(inp=>{
      const r=parseInt(inp.dataset.r);
      if(S.weekGrid[r]) S.weekGrid[r].tm = inp.value;
    });
    saveState();
    _weekEditMode = false;
    document.getElementById('weekEditBtn').textContent = '✏️ تعديل';
    toast('تم حفظ الجدول ✓','ok');
  } else {
    if(!S.weekGrid) S.weekGrid = JSON.parse(JSON.stringify(DEFAULT_WEEK_GRID));
    _weekEditMode = true;
    document.getElementById('weekEditBtn').textContent = '💾 حفظ';
  }
  renderWeek();
}
window.toggleWeekEdit = toggleWeekEdit;

function addWeekRow(){
  if(!S.weekGrid) S.weekGrid = JSON.parse(JSON.stringify(DEFAULT_WEEK_GRID));
  S.weekGrid.push({tm:'--:--', cells:Array(7).fill(null).map(()=>({t:'—',c:'wf'}))});
  saveState(); renderWeek();
}
window.addWeekRow = addWeekRow;

function deleteWeekRow(idx){
  if(!S.weekGrid) S.weekGrid = JSON.parse(JSON.stringify(DEFAULT_WEEK_GRID));
  S.weekGrid.splice(idx,1); saveState(); renderWeek();
}
window.deleteWeekRow = deleteWeekRow;

/* ══════════════════════════════
   ANNUAL CALENDAR
══════════════════════════════ */
let _calYear = new Date().getFullYear();
let _calMonth = new Date().getMonth();

function getHijriDate(date){
  try{
    const fmt = new Intl.DateTimeFormat('ar-SA-u-ca-islamic',{year:'numeric',month:'numeric',day:'numeric'});
    const parts = fmt.formatToParts(date);
    const get = type => { const p=parts.find(x=>x.type===type); return p?parseInt(p.value.replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d))):0; };
    return {year:get('year'), month:get('month'), day:get('day')};
  } catch{ return {year:0,month:0,day:0}; }
}

function isFastingDay(date){
  const dow = date.getDay();
  if(dow===1) return {type:'weekly', label:'صيام الاثنين'};
  if(dow===4) return {type:'weekly', label:'صيام الخميس'};
  const h = getHijriDate(date);
  if([13,14,15].includes(h.day)) return {type:'white', label:`الأيام البيض (${h.day})`};
  if(h.month===1 && [9,10].includes(h.day)) return {type:'ashura', label:'يوم عاشوراء'};
  if(h.month===12 && h.day===9) return {type:'arafa', label:'يوم عرفة'};
  return null;
}

function renderCalendar(){
  const el = document.getElementById('calContainer');
  if(!el) return;
  const now = new Date();
  const firstDay = new Date(_calYear, _calMonth, 1);
  const lastDay  = new Date(_calYear, _calMonth+1, 0);
  const monthNames = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  let hijriMonth = '';
  try{
    hijriMonth = new Intl.DateTimeFormat('ar-SA-u-ca-islamic',{month:'long',year:'numeric'}).format(firstDay);
  } catch{}
  let html = `
    <div class="cal-nav">
      <button class="cal-nav-btn" onclick="_calMonth--;if(_calMonth<0){_calMonth=11;_calYear--}renderCalendar()">›</button>
      <div>
        <div class="cal-month-name">${monthNames[_calMonth]} ${_calYear}</div>
        <div class="cal-hijri-name">${hijriMonth}</div>
      </div>
      <button class="cal-nav-btn" onclick="_calMonth++;if(_calMonth>11){_calMonth=0;_calYear++}renderCalendar()">‹</button>
    </div>
    <div class="cal-grid">
      ${['ح','ن','ث','ر','خ','ج','س'].map(d=>`<div class="cal-header-day">${d}</div>`).join('')}
      ${Array(firstDay.getDay()).fill('<div class="cal-day empty"></div>').join('')}`;

  for(let day=1; day<=lastDay.getDate(); day++){
    const date = new Date(_calYear, _calMonth, day);
    const h = getHijriDate(date);
    const fast = isFastingDay(date);
    const isToday = date.toDateString()===now.toDateString();
    let cls = 'cal-day';
    if(isToday) cls += ' today';
    if(fast) cls += ' fasting-'+fast.type;
    html += `<div class="${cls}" title="${fast?fast.label:''}">
      <div class="cal-greg-day">${day}</div>
      <div class="cal-hijri-day">${h.day||''}</div>
      ${fast?'<div class="cal-fasting-dot"></div>':''}
    </div>`;
  }
  html += `</div>
    <div class="cal-legend">
      <div class="cal-legend-item"><div class="legend-dot weekly"></div><span>إثنين/خميس</span></div>
      <div class="cal-legend-item"><div class="legend-dot white"></div><span>الأيام البيض</span></div>
      <div class="cal-legend-item"><div class="legend-dot ashura"></div><span>عاشوراء</span></div>
      <div class="cal-legend-item"><div class="legend-dot arafa"></div><span>عرفة</span></div>
    </div>`;

  // Upcoming fasting days
  const upcoming = [];
  for(let d=0; d<60 && upcoming.length<6; d++){
    const date = new Date(now); date.setDate(now.getDate()+d);
    const fast = isFastingDay(date);
    if(fast) upcoming.push({date, fast});
  }
  if(upcoming.length){
    html += `<div class="slbl" style="margin-top:16px">أقرب أيام الصيام</div>`;
    upcoming.forEach(({date,fast})=>{
      const h = getHijriDate(date);
      const dayName = DAYS_AR[date.getDay()];
      const gregStr = `${date.getDate()} ${MONTHS_AR[date.getMonth()]}`;
      const hijriStr = `${h.day}/${h.month} هـ`;
      html += `<div class="upcoming-fast">
        <div class="legend-dot ${fast.type}" style="width:10px;height:10px;border-radius:50%;flex-shrink:0"></div>
        <div style="flex:1">
          <div style="font-size:.83rem;font-weight:700;color:var(--t1)">${dayName} ${gregStr}</div>
          <div style="font-size:.7rem;color:var(--t3)">${hijriStr} • ${fast.label}</div>
        </div>
        <div style="font-size:.68rem;font-weight:800;color:var(--gold);background:var(--golddim);padding:3px 8px;border-radius:10px">صيام</div>
      </div>`;
    });
  }
  el.innerHTML = html;
}

function checkFastingReminder(){
  const now = new Date();
  if(now.getHours()===23 && now.getMinutes()===0){
    const tomorrow = new Date(now); tomorrow.setDate(now.getDate()+1);
    const fast = isFastingDay(tomorrow);
    if(fast && 'Notification' in window && Notification.permission==='granted'){
      new Notification('تذكير: غداً '+fast.label, {body:'لا تنسَ نية الصيام 🌙', icon:'./icon.svg'});
    }
  }
}

// Make datePill clickable to jump to calendar
function goToCalendar(){
  const btn = document.querySelector('.tab[onclick*="cal"]');
  if(btn){ tab('cal',btn); btn.scrollIntoView({behavior:'smooth'}); }
}

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
  const partName = `الجزء ${juz}`;
  return { surahName, partName };
}

function openQuranReader() {
  if (!S.quranPage) S.quranPage = 1;
  document.getElementById('quranOverlay').style.display = 'flex';
  setupQuranSwipe();
  renderQuranPage();
}

function closeQuranReader() {
  document.getElementById('quranOverlay').style.display = 'none';
  closeQuranPanel();
  saveState();
  toast('تم حفظ موضعك ✓', 'gd');
}

function changeQuranPage(step) {
  let p = S.quranPage + step;
  if (p < 1) p = 1;
  if (p > 604) p = 604;
  S.quranPage = p;
  closeQuranPanel();
  renderQuranPage();
}

function setupQuranSwipe(){
  const container = document.getElementById('quranImgContainer');
  if(container._swipeReady) return;
  container._swipeReady = true;
  let sx=0, sy=0, st=0;
  container.addEventListener('touchstart', e=>{
    sx=e.touches[0].clientX; sy=e.touches[0].clientY; st=Date.now();
  }, {passive:true});
  container.addEventListener('touchend', e=>{
    const dx=e.changedTouches[0].clientX-sx;
    const dy=e.changedTouches[0].clientY-sy;
    const dt=Date.now()-st;
    if(Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)*1.5 && dt<400){
      changeQuranPage(dx<0 ? 1 : -1);
    }
  }, {passive:true});
}

function getHizbInfo(page){
  const pagesPerHizb = 604/60;
  const hizbFloat = (page-1)/pagesPerHizb;
  const hizbNum = Math.min(Math.floor(hizbFloat)+1, 60);
  const half = (hizbFloat-Math.floor(hizbFloat)) < 0.5 ? 1 : 2;
  return {hizbNum, half};
}

/* ── Shared slide-up panel ── */
function showQuranPanel(html){
  let panel = document.getElementById('quranPanel');
  if(!panel){
    panel = document.createElement('div');
    panel.id = 'quranPanel';
    panel.className = 'quran-panel-overlay';
    document.getElementById('quranOverlay').appendChild(panel);
  }
  panel.innerHTML = html;
  panel.style.display = 'block';
}
function closeQuranPanel(){
  const panel = document.getElementById('quranPanel');
  if(panel) panel.style.display = 'none';
}

function updateQuranNavIcons(){
  const p = S.quranPage;
  const bkIco = document.getElementById('bookmarkIcon');
  if(bkIco) bkIco.textContent = (S.quranBookmarks&&S.quranBookmarks[p]) ? '📌' : '🔖';
  const starIco = document.getElementById('starIcon');
  if(starIco) starIco.textContent = (S.quranStarred&&S.quranStarred[p]) ? '⭐' : '☆';
  const noteIco = document.getElementById('noteIcon');
  if(noteIco) noteIco.textContent = (S.quranNotes&&S.quranNotes[p]) ? '📝' : '✏️';
}

/* ── Khatmah ── */
function openKhatmah(){
  if(!S.khatmahPages) S.khatmahPages = {};
  const total=604, read=Object.keys(S.khatmahPages).length;
  const pct=Math.round(read/total*100), juzDone=Math.floor(read/20);
  const p=S.quranPage, isRead=!!S.khatmahPages[p];
  const btnStyle=isRead?'background:var(--s3);color:var(--t2);':'background:var(--gold);color:#000;';
  const btnLabel=isRead?`✓ إلغاء تسجيل صفحة ${p}`:`تسجيل صفحة ${p} مقروءة`;
  showQuranPanel(`
    <div style="padding:16px 16px 10px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--bdr);">
      <button onclick="closeQuranPanel()" style="background:var(--s3);border:1px solid var(--bdr2);border-radius:8px;width:34px;height:34px;font-size:1rem;cursor:pointer;color:var(--t1);">✕</button>
      <div style="font-weight:800;color:var(--t1);font-size:1.1rem;">تتبع الختمة</div>
      <button onclick="if(confirm('إعادة الختمة من البداية؟')){S.khatmahPages={};saveState();openKhatmah();}" style="background:none;border:none;color:var(--rose);font-size:0.8rem;font-weight:700;cursor:pointer;padding:4px 8px;">إعادة</button>
    </div>
    <div style="padding:20px 16px;">
      <div style="text-align:center;margin-bottom:16px;">
        <div style="font-size:2.8rem;font-weight:900;color:var(--gold);">${pct}%</div>
        <div style="color:var(--t2);font-size:0.9rem;margin-top:4px;">${read} من ${total} صفحة · ${juzDone} جزء مكتمل</div>
      </div>
      <div style="background:var(--s3);border-radius:12px;height:14px;overflow:hidden;margin-bottom:20px;">
        <div style="background:linear-gradient(90deg,var(--gold2),var(--gold));height:100%;width:${pct}%;border-radius:12px;transition:width 0.5s;"></div>
      </div>
      <button onclick="markCurrentPageRead()" style="width:100%;padding:14px;${btnStyle}border:none;border-radius:12px;font-family:'Tajawal',sans-serif;font-size:1rem;font-weight:900;cursor:pointer;">${btnLabel}</button>
      ${read>=604?'<div style="text-align:center;padding:16px;font-size:1.1rem;color:var(--gold);font-weight:900;">🎉 ما شاء الله! أتممت الختمة!</div>':''}
      <div style="margin-top:12px;text-align:center;color:var(--t3);font-size:0.8rem;">اضغط بعد قراءة كل صفحة لتسجيلها في ختمتك</div>
    </div>
  `);
}
function markCurrentPageRead(){
  if(!S.khatmahPages) S.khatmahPages={};
  const p=S.quranPage;
  if(S.khatmahPages[p]){ delete S.khatmahPages[p]; toast('تمت إزالة الصفحة '+p+' من الختمة','warn'); }
  else { S.khatmahPages[p]=true; toast('تم تسجيل الصفحة '+p+' ✓','gd'); }
  saveState(); openKhatmah();
}

/* ── Bookmarks ── */
function toggleBookmark(){
  if(!S.quranBookmarks) S.quranBookmarks={};
  const p=S.quranPage;
  if(S.quranBookmarks[p]){ delete S.quranBookmarks[p]; toast('تمت إزالة العلامة','warn'); }
  else { S.quranBookmarks[p]=true; toast('تمت إضافة علامة للصفحة '+p+' 📌','gd'); }
  saveState(); updateQuranNavIcons();
}
function openBookmarksList(){
  if(!S.quranBookmarks) S.quranBookmarks={};
  const p=S.quranPage, isBookmarked=!!S.quranBookmarks[p];
  const bks=Object.keys(S.quranBookmarks).map(Number).sort((a,b)=>a-b);
  const btnStyle=isBookmarked?'background:var(--s3);color:var(--rose);':'background:var(--gold);color:#000;';
  const btnLabel=isBookmarked?`📌 إزالة العلامة من صفحة ${p}`:`🔖 إضافة علامة لصفحة ${p}`;
  const listHtml=bks.length?bks.map(pg=>{
    const info=getPageInfo(pg);
    return `<div style="display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid var(--bdr);cursor:pointer;gap:12px;" onclick="S.quranPage=${pg};renderQuranPage();closeQuranPanel();">
      <span style="font-size:1.3rem;">📌</span>
      <div style="flex:1;"><div style="font-weight:800;color:var(--t1);">صفحة ${pg}</div><div style="font-size:0.8rem;color:var(--t3);">سورة ${info.surahName}</div></div>
      <button onclick="event.stopPropagation();delete S.quranBookmarks[${pg}];saveState();openBookmarksList();" style="background:none;border:none;color:var(--rose);font-size:1rem;cursor:pointer;padding:4px 8px;">✕</button>
    </div>`;
  }).join(''):`<div style="text-align:center;padding:40px 16px;color:var(--t3);">لا توجد علامات بعد<br><br><span style="font-size:2rem;">🔖</span></div>`;
  showQuranPanel(`
    <div style="padding:16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--bdr);">
      <button onclick="closeQuranPanel()" style="background:var(--s3);border:1px solid var(--bdr2);border-radius:8px;width:34px;height:34px;font-size:1rem;cursor:pointer;color:var(--t1);">✕</button>
      <div style="font-weight:800;color:var(--t1);font-size:1.1rem;">العلامات المرجعية</div>
      <div style="width:34px;"></div>
    </div>
    <div style="padding:12px 16px;border-bottom:1px solid var(--bdr);">
      <button onclick="toggleBookmark();openBookmarksList();" style="width:100%;padding:12px;${btnStyle}border:none;border-radius:12px;font-family:'Tajawal',sans-serif;font-size:0.95rem;font-weight:800;cursor:pointer;">${btnLabel}</button>
    </div>
    ${listHtml}
  `);
}

/* ── Starred ── */
function toggleStar(){
  if(!S.quranStarred) S.quranStarred={};
  const p=S.quranPage;
  if(S.quranStarred[p]){ delete S.quranStarred[p]; toast('تمت إزالة النجمة','warn'); }
  else { S.quranStarred[p]=true; toast('تمت إضافة نجمة للصفحة '+p+' ⭐','gd'); }
  saveState(); updateQuranNavIcons();
}
function openStarredList(){
  if(!S.quranStarred) S.quranStarred={};
  const p=S.quranPage, isStarred=!!S.quranStarred[p];
  const stars=Object.keys(S.quranStarred).map(Number).sort((a,b)=>a-b);
  const btnStyle=isStarred?'background:var(--s3);color:var(--amb);':'background:var(--gold);color:#000;';
  const btnLabel=isStarred?`⭐ إزالة من المفضلة (صفحة ${p})`:`☆ إضافة للمفضلة (صفحة ${p})`;
  const listHtml=stars.length?stars.map(pg=>{
    const info=getPageInfo(pg);
    return `<div style="display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid var(--bdr);cursor:pointer;gap:12px;" onclick="S.quranPage=${pg};renderQuranPage();closeQuranPanel();">
      <span style="font-size:1.3rem;">⭐</span>
      <div style="flex:1;"><div style="font-weight:800;color:var(--t1);">صفحة ${pg}</div><div style="font-size:0.8rem;color:var(--t3);">سورة ${info.surahName}</div></div>
      <button onclick="event.stopPropagation();delete S.quranStarred[${pg}];saveState();openStarredList();" style="background:none;border:none;color:var(--rose);font-size:1rem;cursor:pointer;padding:4px 8px;">✕</button>
    </div>`;
  }).join(''):`<div style="text-align:center;padding:40px 16px;color:var(--t3);">لا توجد صفحات مفضلة بعد<br><br><span style="font-size:2rem;">⭐</span></div>`;
  showQuranPanel(`
    <div style="padding:16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--bdr);">
      <button onclick="closeQuranPanel()" style="background:var(--s3);border:1px solid var(--bdr2);border-radius:8px;width:34px;height:34px;font-size:1rem;cursor:pointer;color:var(--t1);">✕</button>
      <div style="font-weight:800;color:var(--t1);font-size:1.1rem;">الصفحات المفضلة</div>
      <div style="width:34px;"></div>
    </div>
    <div style="padding:12px 16px;border-bottom:1px solid var(--bdr);">
      <button onclick="toggleStar();openStarredList();" style="width:100%;padding:12px;${btnStyle}border:none;border-radius:12px;font-family:'Tajawal',sans-serif;font-size:0.95rem;font-weight:800;cursor:pointer;">${btnLabel}</button>
    </div>
    ${listHtml}
  `);
}

/* ── Notes ── */
function openNotes(){
  if(!S.quranNotes) S.quranNotes={};
  const p=S.quranPage, note=S.quranNotes[p]||'', info=getPageInfo(p);
  const deleteBtn=note?`<button onclick="if(confirm('حذف الملاحظة؟')){delete S.quranNotes[${p}];saveState();closeQuranPanel();updateQuranNavIcons();toast('تم الحذف','warn');}" style="width:100%;padding:10px;background:none;border:none;color:var(--rose);font-family:'Tajawal',sans-serif;font-size:0.9rem;font-weight:700;cursor:pointer;margin-top:4px;">حذف الملاحظة</button>`:'';
  showQuranPanel(`
    <div style="padding:16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--bdr);">
      <button onclick="closeQuranPanel()" style="background:var(--s3);border:1px solid var(--bdr2);border-radius:8px;width:34px;height:34px;font-size:1rem;cursor:pointer;color:var(--t1);">✕</button>
      <div style="font-weight:800;color:var(--t1);font-size:1.1rem;">ملاحظات صفحة ${p}</div>
      <div style="width:34px;"></div>
    </div>
    <div style="padding:16px;">
      <div style="font-size:0.85rem;color:var(--t3);margin-bottom:10px;">سورة ${info.surahName}</div>
      <textarea id="quranNoteTextarea" style="width:100%;min-height:160px;background:var(--s2);border:1px solid var(--bdr);border-radius:12px;padding:12px;color:var(--t1);font-family:'Tajawal',sans-serif;font-size:0.95rem;resize:vertical;box-sizing:border-box;outline:none;" placeholder="اكتب ملاحظاتك أو تفسيراتك هنا...">${note}</textarea>
      <button onclick="saveQuranNote(${p})" style="width:100%;padding:14px;background:var(--gold);color:#000;border:none;border-radius:12px;font-family:'Tajawal',sans-serif;font-size:1rem;font-weight:900;cursor:pointer;margin-top:12px;">حفظ ✓</button>
      ${deleteBtn}
    </div>
  `);
}
function saveQuranNote(p){
  if(!S.quranNotes) S.quranNotes={};
  const val=document.getElementById('quranNoteTextarea').value.trim();
  if(val) S.quranNotes[p]=val; else delete S.quranNotes[p];
  saveState(); closeQuranPanel(); updateQuranNavIcons();
  toast('تم حفظ الملاحظة ✓','gd');
}

function renderQuranPage() {
  const p = S.quranPage;
  const pStr = p.toString().padStart(3, '0');
  const imgUrl = `https://files.quran.app/hafs/madani/width_1024/page${pStr}.png`;

  const imgEl = document.getElementById('quranPageImg');
  const loader = document.getElementById('quranLoader');

  loader.style.display = 'block';
  loader.textContent = 'جاري التحميل...';
  imgEl.style.opacity = '0';

  imgEl.onload = () => { loader.style.display='none'; imgEl.style.opacity='1'; };
  imgEl.onerror = () => { loader.textContent='تعذّر التحميل — تحقق من الاتصال بالإنترنت'; };

  imgEl.src = imgUrl;
  document.getElementById('quranPageNum').textContent = `صفحة ${p}`;

  const {hizbNum, half} = getHizbInfo(p);
  const hizbEl = document.getElementById('quranHizbInfo');
  if(hizbEl) hizbEl.textContent = `${half}/2 حزب ${hizbNum}`;

  const info = getPageInfo(p);
  document.getElementById('quranHeaderSurah').textContent = 'سورة ' + info.surahName;
  document.getElementById('quranHeaderJuz').textContent = info.partName;

  updateQuranNavIcons();
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
      listEl.innerHTML += `
        <div class="quran-index-item" onclick="S.quranPage = ${surah.startPage}; renderQuranPage(); toggleQuranIndex();">
          <div class="quran-index-number">${surah.id}</div>
          <div class="quran-index-details">
            <div class="quran-index-title">سورة ${surah.name}</div>
            <div class="quran-index-subtitle">صفحة ${surah.startPage} • ${surah.verses} آيات • ${revText}</div>
          </div>
          <div class="quran-index-page">${surah.startPage}</div>
        </div>
      `;
    });
  } else {
    document.getElementById('tabJuzsBtn').classList.add('active');
    for (let i = 1; i <= 30; i++) {
      const pageNum = ((i - 1) * 20) + 1;
      const info = getPageInfo(pageNum);
      listEl.innerHTML += `
        <div class="quran-index-item" onclick="S.quranPage = ${pageNum}; renderQuranPage(); toggleQuranIndex();">
          <div class="quran-index-number">${i}</div>
          <div class="quran-index-details">
            <div class="quran-index-title">الجزء ${i}</div>
            <div class="quran-index-subtitle">تبدأ بسورة ${info.surahName}</div>
          </div>
          <div class="quran-index-page">${pageNum}</div>
        </div>
      `;
    }
  }
}

