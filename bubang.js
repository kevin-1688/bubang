const ST={fear:10,silence:0,will:80,choices:0,exCount:0};

const ART={
'taipei-night':`<svg class="svg-scene" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg"><defs><filter id="b"><feGaussianBlur stdDeviation="1.5"/></filter></defs><rect width="800" height="300" fill="#060408"/><rect x="0" y="120" width="800" height="180" fill="#0a0810"/><rect x="20" y="90" width="60" height="120" fill="#0f0c14"/><rect x="90" y="70" width="80" height="140" fill="#0d0b12"/><rect x="180" y="100" width="50" height="110" fill="#110e18"/><rect x="250" y="60" width="100" height="150" fill="#0e0b14"/><rect x="360" y="80" width="70" height="130" fill="#0f0c15"/><rect x="450" y="55" width="120" height="155" fill="#0d0a12"/><rect x="590" y="75" width="90" height="135" fill="#0f0c16"/><rect x="700" y="95" width="100" height="115" fill="#110e18"/><rect x="35" y="100" width="8" height="10" fill="#1a1420" opacity=".8"/><rect x="265" y="70" width="12" height="14" fill="#C4622D" opacity=".2"/><rect x="460" y="65" width="14" height="16" fill="#C4622D" opacity=".18"/><rect x="100" y="80" width="10" height="12" fill="#C4622D" opacity=".12"/><rect x="0" y="210" width="800" height="90" fill="#070509"/><rect x="0" y="205" width="800" height="8" fill="#0c0a10"/><rect x="30" y="180" width="6" height="35" fill="#120f18"/><rect x="90" y="175" width="6" height="38" fill="#110e16"/><rect x="150" y="182" width="6" height="30" fill="#120f18"/><rect x="210" y="178" width="6" height="34" fill="#110e16"/><rect x="270" y="180" width="6" height="32" fill="#120f18"/><rect x="330" y="177" width="6" height="35" fill="#110e16"/><rect x="390" y="180" width="6" height="32" fill="#120f18"/><rect x="450" y="176" width="6" height="36" fill="#110e16"/><rect x="510" y="180" width="6" height="32" fill="#120f18"/><rect x="570" y="178" width="6" height="34" fill="#110e16"/><rect x="630" y="180" width="6" height="32" fill="#120f18"/><rect x="690" y="177" width="6" height="35" fill="#110e16"/><rect x="750" y="180" width="6" height="32" fill="#120f18"/><line x1="120" y1="160" x2="120" y2="210" stroke="#1a1622" stroke-width="2"/><circle cx="120" cy="158" r="4" fill="#C4622D" opacity=".6" filter="url(#b)"/><ellipse cx="120" cy="165" rx="18" ry="6" fill="#C4622D" opacity=".06"/><line x1="380" y1="158" x2="380" y2="210" stroke="#1a1622" stroke-width="2"/><circle cx="380" cy="156" r="4" fill="#C4622D" opacity=".5" filter="url(#b)"/><line x1="640" y1="162" x2="640" y2="210" stroke="#1a1622" stroke-width="2"/><circle cx="640" cy="160" r="4" fill="#C4622D" opacity=".55" filter="url(#b)"/><ellipse cx="200" cy="245" rx="60" ry="5" fill="#0f0c15" opacity=".7"/></svg>`,

'taipei-day':`<svg class="svg-scene" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#0e0c0a"/><rect x="0" y="0" width="800" height="120" fill="#141210"/><rect x="0" y="80" width="65" height="140" fill="#181614"/><rect x="75" y="60" width="85" height="160" fill="#1a1816"/><rect x="175" y="90" width="55" height="130" fill="#181614"/><rect x="245" y="65" width="100" height="155" fill="#1c1a18"/><rect x="360" y="75" width="75" height="145" fill="#1a1816"/><rect x="450" y="55" width="120" height="165" fill="#1c1a18"/><rect x="590" y="70" width="85" height="150" fill="#1a1816"/><rect x="695" y="85" width="105" height="135" fill="#181614"/><rect x="260" y="73" width="80" height="10" fill="#8b1a1a" opacity=".4"/><text x="270" y="82" font-size="7" fill="#c4623d" opacity=".8" font-family="serif">人人有責 檢舉匪諜</text><rect x="465" y="63" width="100" height="9" fill="#8b1a1a" opacity=".3"/><text x="472" y="71" font-size="6" fill="#c4623d" opacity=".6" font-family="serif">保密防諜 人人有責</text><rect x="0" y="220" width="800" height="80" fill="#0b0908"/><rect x="100" y="200" width="7" height="24" fill="#14100e"/><rect x="220" y="202" width="8" height="22" fill="#14100e"/><rect x="340" y="199" width="6" height="25" fill="#14100e"/><rect x="460" y="201" width="9" height="23" fill="#14100e"/><rect x="600" y="198" width="7" height="26" fill="#14100e"/></svg>`,

'warehouse':`<svg class="svg-scene" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#070a07"/><rect x="0" y="0" width="800" height="60" fill="#060806"/><rect x="0" y="55" width="800" height="5" fill="#0c0f0c"/><rect x="150" y="0" width="5" height="200" fill="#0a0d0a"/><rect x="350" y="0" width="5" height="200" fill="#0a0d0a"/><rect x="550" y="0" width="5" height="200" fill="#0a0d0a"/><rect x="750" y="0" width="5" height="200" fill="#0a0d0a"/><rect x="20" y="150" width="80" height="50" fill="#141a14"/><rect x="25" y="115" width="70" height="40" fill="#161c16"/><rect x="30" y="90" width="60" height="30" fill="#181e18"/><rect x="130" y="160" width="90" height="40" fill="#141a14"/><rect x="135" y="130" width="80" height="35" fill="#161c16"/><rect x="580" y="145" width="100" height="55" fill="#141a14"/><rect x="585" y="115" width="90" height="35" fill="#161c16"/><rect x="700" y="155" width="90" height="45" fill="#141a14"/><rect x="705" y="125" width="80" height="35" fill="#161c16"/><rect x="0" y="200" width="800" height="100" fill="#060906"/><polygon points="320,0 380,0 420,200 280,200" fill="#C4622D" opacity=".025"/><rect x="340" y="50" width="3" height="30" fill="#1a1a18"/><rect x="335" y="78" width="13" height="16" fill="#2a2018"/><ellipse cx="341" cy="82" rx="6" ry="4" fill="#C4622D" opacity=".5"/></svg>`,

'underground':`<svg class="svg-scene" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#080607"/><rect x="0" y="0" width="800" height="50" fill="#0a0809"/><rect x="280" y="100" width="240" height="120" fill="#0f0d12"/><rect x="285" y="105" width="230" height="8" fill="#151318"/><rect x="300" y="113" width="200" height="60" fill="#0c0a0f"/><rect x="310" y="118" width="180" height="50" fill="#080609"/><rect x="290" y="175" width="40" height="30" fill="#1a1814"/><rect x="292" y="173" width="36" height="2" fill="#2a2820"/><rect x="293" y="171" width="34" height="2" fill="#2e2c24"/><rect x="60" y="160" width="140" height="8" fill="#161210"/><rect x="70" y="168" width="5" height="32" fill="#121008"/><rect x="180" y="168" width="5" height="32" fill="#121008"/><rect x="85" y="145" width="3" height="18" fill="#1a1614"/><ellipse cx="86" cy="144" rx="8" ry="3" fill="#C4622D" opacity=".35"/><rect x="95" y="155" width="35" height="5" fill="#1a1814"/><rect x="97" y="150" width="30" height="5" fill="#1e1c16"/><rect x="0" y="0" width="60" height="300" fill="#090709"/><rect x="740" y="0" width="60" height="300" fill="#090709"/></svg>`,

'dawn':`<svg class="svg-scene" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="300" fill="#090909"/><rect x="0" y="0" width="800" height="80" fill="#0a0808"/><rect x="0" y="60" width="800" height="60" fill="#0d0a08"/><ellipse cx="400" cy="140" rx="250" ry="40" fill="#C4622D" opacity=".06"/><ellipse cx="400" cy="145" rx="150" ry="20" fill="#C4622D" opacity=".08"/><rect x="0" y="130" width="800" height="170" fill="#060504"/><rect x="20" y="100" width="50" height="100" fill="#0a0807"/><rect x="85" y="85" width="70" height="115" fill="#0c0a08"/><rect x="170" y="95" width="55" height="105" fill="#0a0807"/><rect x="240" y="75" width="90" height="125" fill="#0e0c0a"/><rect x="350" y="88" width="65" height="112" fill="#0c0a08"/><rect x="435" y="72" width="110" height="128" fill="#0e0c0a"/><rect x="570" y="80" width="80" height="120" fill="#0c0a08"/><rect x="670" y="90" width="130" height="110" fill="#0a0807"/><rect x="376" y="215" width="8" height="25" fill="#1a1410"/></svg>`
};

const SCENES=[
{loc:'台北·大稻埕·夜',art:'taipei-night',narrator:'1952 年，深秋。大稻埕的街燈昏黃。你站在騎樓的陰影裡，等待一個從未出現的人。',dialogue:null,char:null,choices:[
  {text:'繼續等待。黑暗裡，你聽見自己的心跳。',ef:'neu',label:null,f:5,s:0,w:-5,next:1},
  {text:'往街角張望——也許她只是遲到了。',ef:'pos',label:'+信心',f:-2,s:0,w:0,next:1}
]},
{loc:'台北·大稻埕·夜',art:'taipei-night',narrator:'突然，街角傳來急促的腳步聲。一輛黑色轎車停下，兩個男人下車。',char:'小美',dialogue:'「不要過來——」她的聲音被切斷。車門關上，引擎聲消失在霧裡。',choices:[
  {text:'衝上前去——但轎車已經消失。',ef:'neg',label:'+恐懼',f:20,s:0,w:-10,next:2},
  {text:'強迫自己停下腳步。你什麼也沒看見。',ef:'neu',label:'+沉默',f:10,s:15,w:-5,next:2}
]},
{loc:'台北·天馬茶行旁·翌晨',art:'taipei-day',narrator:'天剛亮。茶行旁的小巷。一個你從未見過的男人從陰影裡走出。',char:'接頭人',dialogue:'「你在找她。我知道。」他遞給你一張皺巴巴的紙條。「但在我告訴你之前，你必須先幫我。」',choices:[
  {text:'「說。我願意做任何事。」',ef:'pos',label:'+意志',f:0,s:-5,w:10,next:3},
  {text:'懷疑地打量他——這城市沒有人可以信任。',ef:'neu',label:'+謹慎',f:8,s:10,w:0,next:3},
  {text:'拒絕。轉身離開，假裝這一切沒有發生。',ef:'neg',label:'++沉默',f:-5,s:25,w:-15,next:3}
]},
{loc:'台北·大稻埕碼頭倉庫',art:'warehouse',narrator:'接頭人帶你到碼頭倉庫，偽裝成工人。你必須搬運貨箱，才能接近那份名單。',exercise:{move:'深蹲搬運 · Squat Carry',desc:'彎腰、蹲下、搬起。在憲兵眼皮底下，這是你唯一能做的動作。完成 10 下——每一下都讓你離真相近一步。',target:10,attr:'ROOT',sNext:4,fNext:4,sMsg:'貨箱安放好了。一個工人朝你點頭——你通過了考驗。',fMsg:'沒關係。假裝腰傷，慢慢繼續。'}},
{loc:'台北·碼頭倉庫·深處',art:'warehouse',narrator:null,char:'接頭人',dialogue:'「她的名字在名冊上。」他壓低聲音，「但旁邊有個標記——轉送山區。你去那裡，也許還找得到她。」',choices:[
  {text:'「我需要更多資訊——誰在背後下令？」',ef:'neg',label:'+危險',f:20,s:-10,w:0,next:5},
  {text:'收下名冊，快速離開。問太多只會帶來危險。',ef:'pos',label:'+生存',f:5,s:10,w:5,next:5}
]},
{loc:'台北·返回途中',art:'taipei-day',narrator:'回去的路上，你注意到鄰居陳太太站在門口。她的眼神在你身上停留了一秒——然後迅速移開。',choices:[
  {text:'點頭打招呼，裝作什麼都沒有發生。',ef:'neu',label:null,f:5,s:10,w:0,next:6},
  {text:'加快腳步，避開她的視線。',ef:'neg',label:'+恐懼',f:15,s:5,w:-5,next:6},
  {text:'停下來問她：「最近有沒有看到奇怪的車？」',ef:'neg',label:'++危險',f:25,s:-20,w:5,next:6}
]},
{loc:'台北·窄巷·查戶口',art:'taipei-night',narrator:'路口突然出現兩個憲兵。例行查戶口。你的口袋裡藏著不能被發現的東西。',exercise:{move:'Plank 靜止撐體',desc:'躲在攤販的桌子底下。全身僵硬，不能發出任何聲音。撐住——直到腳步聲消失。點擊「撐住」來度過每一秒。目標：8 下。',target:8,attr:'ENDURE',sNext:7,fNext:7,sMsg:'腳步聲遠去了。你在黑暗中慢慢呼出一口氣。',fMsg:'你顫抖了一下，但他們沒有發現。'}},
{loc:'台北·地下報社·夜',art:'underground',narrator:'地下報社。印刷工阿成把你拉到角落，壓低聲音說話。',char:'阿成',dialogue:'「我知道一個人，他能帶你去山區。但他需要一個名字——誰在資助地下網絡。你一定知道。說出來，他就帶你走。不說……」他沒有繼續說下去。',choices:[
  {text:'沉默。你不打算出賣任何人。',ef:'pos',label:'++沉默+意志',f:10,s:30,w:15,next:8},
  {text:'說出一個無關緊要的名字——一個已經離開台灣的人。',ef:'neu',label:'+恐懼',f:5,s:5,w:-10,next:8},
  {text:'說出真實的名字。為了找到她，你願意付出這個代價。',ef:'neg',label:'++恐懼-意志',f:-15,s:-20,w:-25,next:8}
]},
{loc:'台北·黎明前·城市邊緣',art:'dawn',narrator:'天還沒亮。你站在城市的邊緣，口袋裡是一張去山區的路線圖。前方是未知，身後是這座無聲的城市。',choices:[
  {text:'繼續前進。她還在等你。',ef:'pos',label:null,f:0,s:0,w:0,next:'ending'}
]}
];

let notifTm=null;

function updateHUD(){
  const f=Math.min(100,Math.max(0,ST.fear));
  const s=Math.min(100,Math.max(0,ST.silence));
  const w=Math.min(100,Math.max(0,ST.will));
  document.getElementById('bar-fear').style.width=f+'%';
  document.getElementById('bar-silence').style.width=s+'%';
  document.getElementById('bar-will').style.width=w+'%';
  document.getElementById('val-fear').textContent=Math.round(f);
  document.getElementById('val-silence').textContent=Math.round(s);
  document.getElementById('val-will').textContent=Math.round(w);
  const vi=Math.max(0,(f-30)/70);
  document.getElementById('fear-vignette').style.boxShadow=`inset 0 0 ${80*vi}px ${30*vi}px rgba(139,26,26,${.3*vi})`;
  if(f>80){document.getElementById('hud').classList.add('shaking');setTimeout(()=>document.getElementById('hud').classList.remove('shaking'),300);}
}

function showNotif(title,body){
  const n=document.getElementById('notif');
  document.getElementById('notif-title').textContent=title;
  document.getElementById('notif-body').textContent=body;
  n.classList.add('show');
  if(notifTm)clearTimeout(notifTm);
  notifTm=setTimeout(()=>n.classList.remove('show'),3500);
}

function flashFear(){
  const f=document.getElementById('fear-flash');
  f.classList.add('show');
  setTimeout(()=>f.classList.remove('show'),300);
}

function applyChoice(c){
  if(c.f>10)flashFear();
  ST.fear=Math.min(100,Math.max(0,ST.fear+c.f));
  ST.silence=Math.min(100,Math.max(0,ST.silence+c.s));
  ST.will=Math.min(100,Math.max(0,ST.will+c.w));
  ST.choices++;
  updateHUD();
  if(c.f>15)showNotif('恐懼上升','心跳加速，雙手發抖。');
  else if(c.f<-10)showNotif('恐懼降低','短暫的平靜——但不會持續太久。');
  if(c.s>20)showNotif('沉默加深','你把真相埋得更深了。');
  if(c.w>10)showNotif('意志增強','你知道自己在做什麼。');
  else if(c.w<-15)showNotif('意志消耗','每一個謊言都有代價。');
}

function renderScene(idx){
  const sc=SCENES[idx];
  if(!sc)return;
  document.getElementById('hud-loc').textContent=sc.loc;
  document.getElementById('scene-art').innerHTML=ART[sc.art]||'';
  let html='<div class="location-header">'+sc.loc+'</div>';
  if(sc.narrator)html+='<div class="narrator-text">'+sc.narrator+'</div>';
  if(sc.dialogue){
    if(sc.char)html+='<div class="char-name">'+sc.char+'</div>';
    html+='<div class="dialogue-text">'+sc.dialogue+'</div>';
  }
  if(sc.exercise){
    const ex=sc.exercise;
    html+=`<div class="exercise-zone" id="ex-zone">
      <div class="ex-header">&#9632; 動作指令 · ${ex.attr}</div>
      <div class="ex-move-name">${ex.move}</div>
      <div class="ex-desc">${ex.desc}</div>
      <div class="ex-counter">
        <div class="ex-count-display" id="ex-count">0</div>
        <div><div class="ex-target">/ ${ex.target} 下</div></div>
        <div class="ex-progress-wrap"><div class="ex-progress-fill" id="ex-bar" style="width:0%"></div></div>
      </div>
      <button class="ex-btn" id="ex-btn" onclick="doEx(${idx})">撐住 · DO IT</button>
      <button class="ex-btn secondary" onclick="skipEx(${idx})">跳過（意志 -10）</button>
    </div>`;
    ST.exCount=0;
  }
  if(sc.choices){
    html+='<div class="choices">';
    sc.choices.forEach((c,i)=>{
      const cls=c.ef==='neg'?'danger':c.ef==='pos'?'safe':'';
      const lbl=c.label?`<span class="choice-effect ${c.ef==='neg'?'neg':c.ef==='pos'?'pos':'neu'}">${c.label}</span>`:'';
      html+=`<button class="choice-btn ${cls}" onclick="choose(${i},${idx})"><span class="choice-num">${i+1}</span><span>${c.text}</span>${lbl}</button>`;
    });
    html+='</div>';
  }
  document.getElementById('narrative').innerHTML=html;
  window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});
  updateHUD();
}

function choose(oi,si){
  const c=SCENES[si].choices[oi];
  applyChoice(c);
  if(c.next==='ending')setTimeout(showEnding,800);
  else setTimeout(()=>renderScene(c.next),600);
}

function doEx(si){
  const ex=SCENES[si].exercise;
  ST.exCount=Math.min(ex.target,ST.exCount+1);
  const pct=(ST.exCount/ex.target)*100;
  const ec=document.getElementById('ex-count');
  const eb=document.getElementById('ex-bar');
  const btn=document.getElementById('ex-btn');
  if(ec)ec.textContent=ST.exCount;
  if(eb)eb.style.width=pct+'%';
  if(btn){btn.style.transform='scale(0.95)';setTimeout(()=>btn.style.transform='',100);}
  if(ST.exCount>=ex.target){
    ST.will=Math.min(100,ST.will+15);
    updateHUD();
    showNotif('訓練完成',ex.sMsg);
    const zone=document.getElementById('ex-zone');
    if(zone)zone.innerHTML=`<div class="ex-header" style="color:var(--ember)">&#10003; 完成 · ${ex.attr} +15</div><div style="font-family:var(--fell);font-style:italic;font-size:1.1rem;line-height:1.8;margin-bottom:1rem">${ex.sMsg}</div><button class="ex-btn" onclick="skipEx(${si},true)">繼續 →</button>`;
  }
}

function skipEx(si,done=false){
  const ex=SCENES[si].exercise;
  if(!done){ST.will=Math.max(0,ST.will-10);ST.fear=Math.min(100,ST.fear+5);updateHUD();showNotif('略過訓練',ex.fMsg+' 意志-10');}
  setTimeout(()=>renderScene(done?ex.sNext:ex.fNext),400);
}

function showEnding(){
  const f=ST.fear,s=ST.silence;
  const avg=(f+s)/2;
  let title,quote;
  if(avg<=20){title='《還活著》';quote='找到了人，也沒有失去自己。黎明的第一道光，終於落在你的臉上。';}
  else if(avg<=45){title='《繼續走》';quote='活著，但做了一些無法完全原諒自己的事。你把那個重量帶上，繼續走。';}
  else if(avg<=70){title='《沉默的人》';quote='你學會了那個年代的生存法則。那些話，你永遠不會再說出口了。';}
  else if(avg<=90){title='《霧中》';quote='在尋找的過程中，你逐漸忘記自己在找什麼。霧越來越濃。';}
  else{title='《無聲的名字》';quote='活下來了。但沒有人知道你曾在那裡。';}
  document.getElementById('e-title').textContent=title;
  document.getElementById('e-quote').textContent=quote;
  document.getElementById('e-fear').textContent=Math.round(f);
  document.getElementById('e-silence').textContent=Math.round(s);
  document.getElementById('e-choices').textContent=ST.choices;
  document.getElementById('ending-screen').classList.add('active');
}

function startGame(){
  const t=document.getElementById('title-screen');
  t.classList.add('fade-out');
  setTimeout(()=>{t.style.display='none';document.getElementById('game').classList.add('active');renderScene(0);},1500);
}

function restartGame(){
  ST.fear=10;ST.silence=0;ST.will=80;ST.choices=0;ST.exCount=0;
  document.getElementById('ending-screen').classList.remove('active');
  renderScene(0);
}

document.addEventListener('keydown',e=>{
  const n=parseInt(e.key);
  if(!isNaN(n)&&n>=1&&n<=4){const bs=document.querySelectorAll('.choice-btn');if(bs[n-1])bs[n-1].click();}
  if(e.key===' '||e.key==='Enter'){const eb=document.getElementById('ex-btn');if(eb){e.preventDefault();eb.click();}}
});
