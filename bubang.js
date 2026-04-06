// ═══════════════════════════════════════════════════════════
// GAME DATA
// ═══════════════════════════════════════════════════════════

const ACTS = [
  {
    id: 1,
    numLabel: 'ACT I',
    titleZh: '台北・大稻埕',
    titleEn: 'Taipei · Dadaocheng',
    theme: '失去 · LOSS',
    bgColor: '#0D1520',
    hudLabel: 'Act I — 台北',
    emoji: '🏙️',
    scenes: [
      {
        type: 'narrative',
        label: 'Scene 1',
        titleZh: '夜的失蹤 · The Night of Vanishing',
        paragraphs: [
          '1952年。台北。街燈昏暗，空氣中瀰漫著廣播的雜訊與油炸的氣味。',
          '你站在街角，等待小美。遠處傳來引擎聲——',
          '一輛黑色轎車停下。兩個穿深色制服的男人下車。',
          '小美轉頭，看見了你。「不要過來。」她低聲說。',
          '男人抓住她的手臂。車門關上。黑色轎車消失在巷弄深處。'
        ],
        choices: [
          {
            zh: '衝上去！追那輛車！',
            en: '"Rush forward! Follow that car!"',
            fear: +15, silence: -20,
            consequence: '你衝了出去，但車已消失在黑暗裡。街上的路人假裝沒看見你。一個老人搖搖頭，轉身離開。你站在空蕩蕩的街上。'
          },
          {
            zh: '退回陰影。記住那輛車的方向。',
            en: '"Step back into the shadows. Remember."',
            fear: +5, silence: +15,
            consequence: '你壓住衝動，讓自己消失在街角的黑暗裡。你的心跳聲在胸腔裡撞擊，但沒有人注意到你。這是生存的第一課。'
          }
        ]
      },
      {
        type: 'narrative',
        label: 'Scene 2',
        titleZh: '黑市接頭人 · The Black Market Contact',
        paragraphs: [
          '你在大稻埕的陰影中等待。一個男人從茶行旁的暗處走出。',
          '「你在找她。」他說，聲音很低。「我知道。」',
          '遠處突然傳來查緝隊的手電筒光。',
          '男人把一個折疊的紙條塞進你手裡：「明天。天馬茶行旁。」'
        ],
        choices: [
          {
            zh: '「她現在在哪裡？告訴我！」',
            en: '"Where is she right now? Tell me!"',
            fear: +10, silence: -15,
            consequence: '男人皺起眉頭。「你的聲音太大了。」他說，轉身走掉。你得到了更多的問題，而不是答案。這城市沒有乾淨的地方。'
          },
          {
            zh: '點頭。收下紙條，什麼也不說。',
            en: '"Nod. Take the note. Say nothing."',
            fear: -5, silence: +10,
            consequence: '男人放鬆了一些。「很好，」他說。「明天帶上你能帶的東西。只帶你能帶的東西。」你收好紙條，消失在人群裡。'
          }
        ]
      },
      {
        type: 'exercise',
        exerciseType: 'squat',
        label: 'Scene 3',
        titleZh: '偽裝工人 · The Disguise',
        setup: '天剛亮。為了通過街口的檢查站，你必須假扮成碼頭搬運工。',
        instruction: '深蹲搬起貨物，不要停——讓他們看見一個工人，不是一個逃亡者。',
        instructionEn: '"Squat to lift cargo. Keep going — let them see a worker, not a fugitive."',
        typeLabel: '深蹲 SQUATS',
        target: 10,
        attrGain: { root: 10 },
        fearDelta: -10,
        successText: '你通過了檢查站。士兵瞥了你一眼，繼續走他的路。你的腿在顫抖，但你面無表情。',
        attrGainLabel: 'ROOT +10'
      },
      {
        type: 'exercise',
        exerciseType: 'plank',
        label: 'Scene 4',
        titleZh: '槍聲 · The Gunshot',
        setup: '人群中突然傳來一聲槍響。人群四散奔逃。混亂中，你必須躲藏。',
        instruction: '趴下！屏住呼吸，撐住——直到危險過去。',
        instructionEn: '"Get down! Hold your breath — endure until the danger passes."',
        typeLabel: '撐體 PLANK',
        duration: 5,
        attrGain: { endure: 15, will: 5 },
        fearDelta: +5,
        successText: '危險過去了。你慢慢爬起身，拍去衣服上的塵土。沒有人注意到你。',
        attrGainLabel: 'ENDURE +15 · WILL +5'
      },
      {
        type: 'narrative',
        label: 'Scene 5',
        titleZh: '紙條 · The Note',
        paragraphs: [
          '混亂中，你在地上找到了一個折疊的紙條。小美的筆跡。',
          '「我會被送去基隆。快來救我。」',
          '旁邊，一個受傷的女人倒在地上。遠處傳來更多腳步聲。',
          '遠處有人喊：「基隆港今晚有船！」'
        ],
        choices: [
          {
            zh: '停下來幫助受傷的女人。',
            en: '"Stop. Help the injured woman."',
            fear: +15, silence: -25,
            consequence: '你扶起她，讓她靠在牆邊。她看著你，眼裡有東西你說不清楚。你聽見腳步聲越來越近。你繼續移動，帶著她的眼神。'
          },
          {
            zh: '收起紙條，繼續移動。',
            en: '"Pocket the note. Keep moving."',
            fear: +5, silence: +20,
            consequence: '你走了。沒有回頭看。這是你在那個年代學到的第一個教訓：活下去，才能繼續找她。'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    numLabel: 'ACT II',
    titleZh: '基隆港',
    titleEn: 'Keelung Harbor',
    theme: '消失 · DISAPPEARANCE',
    bgColor: '#0C1412',
    hudLabel: 'Act II — 基隆',
    emoji: '⚓',
    scenes: [
      {
        type: 'narrative',
        label: 'Scene 1',
        titleZh: '抵達港口 · Arrival at the Harbor',
        paragraphs: [
          '海霧。燈塔在遠處閃爍。港口一片死寂。',
          '碼頭工人低聲說：「最近很多人被帶來這裡。」',
          '「不是上船——是軍隊。昨天晚上的事。」',
          '鏽蝕的貨輪在霧中沉默。你嗅到海水與恐懼的氣味。'
        ]
      },
      {
        type: 'exercise',
        exerciseType: 'squat',
        label: 'Scene 2',
        titleZh: '搬貨偽裝 · Moving Cargo',
        setup: '你加入碼頭工人，假裝搬貨。每一個深蹲，都是你在這個世界裡存在的證明。',
        instruction: '深蹲搬運貨物，換取工人的信任與情報。',
        instructionEn: '"Squat to move cargo — earn trust, earn information."',
        typeLabel: '深蹲 SQUATS',
        target: 8,
        attrGain: { root: 15, adapt: 5 },
        fearDelta: -5,
        successText: '一個老工人靠近你。「昨天有一批人。不是上船——是軍隊把他們帶走了。往山裡去的。」你終於得到了線索。',
        attrGainLabel: 'ROOT +15 · ADAPT +5'
      },
      {
        type: 'narrative',
        label: 'Scene 3',
        titleZh: '軍隊登陸 · The Landing',
        paragraphs: [
          '午夜。你在倉庫裡等待。外面傳來引擎聲。',
          '船靠岸，燈光掃過碼頭。士兵魚貫而出，軍車開進城市。',
          '在一個生鏽的鐵桶後面，你看見了一份名冊。'
        ],
        choices: [
          {
            zh: '冒險取出名冊。',
            en: '"Risk it. Take the ledger."',
            fear: +15, silence: -10,
            consequence: '你迅速取出名冊。翻到S那一頁——小美的名字被劃掉了。旁邊寫著：「轉送山區。」你終於知道她在哪裡。'
          },
          {
            zh: '太危險了。記住位置，先離開。',
            en: '"Too dangerous. Leave first."',
            fear: +5, silence: +10,
            consequence: '你離開了倉庫。安全，但空手。那份名冊還在那裡。你只知道她還在某個山區，等著你。'
          }
        ]
      },
      {
        type: 'exercise',
        exerciseType: 'burpee',
        label: 'Scene 4',
        titleZh: '逃出碼頭 · Escape',
        setup: '搜查隊開始清場。你必須迅速離開——現在。',
        instruction: '波比跳——爆發力是你的唯一出路。交替按左右，完成波比跳。',
        instructionEn: '"Burpees — your explosive strength is the only way out."',
        typeLabel: '波比跳 BURPEES',
        target: 6,
        attrGain: { adapt: 15, escape: 10 },
        fearDelta: -10,
        successText: '你衝出了碼頭，消失在基隆的夜霧裡。背後是士兵的手電筒光，但你已經不在那裡了。',
        attrGainLabel: 'ADAPT +15 · ESCAPE +10'
      }
    ]
  },
  {
    id: 3,
    numLabel: 'ACT III',
    titleZh: '山區部落',
    titleEn: 'Mountain Village',
    theme: '信任 · TRUST',
    bgColor: '#0A1008',
    hudLabel: 'Act III — 山區',
    emoji: '🏔️',
    scenes: [
      {
        type: 'exercise',
        exerciseType: 'plank',
        label: '試煉',
        titleZh: '火堆試煉 · The Fire Trial',
        setup: '部落長老要求你通過試煉——在火堆旁的石板上撐體，證明你的意志。在那個沒有法律保護的地方，這裡是唯一能說真話的地方。',
        instruction: '撐住！讓你的身體說出你的決心。',
        instructionEn: '"Hold! Let your body speak your resolve."',
        typeLabel: '撐體 PLANK',
        duration: 6,
        attrGain: { endure: 20, will: 15 },
        fearDelta: -15,
        successText: '長老點頭。「你可以留下來。」他說。「一個晚上。」火光在石板屋的牆上跳動。',
        attrGainLabel: 'ENDURE +20 · WILL +15'
      },
      {
        type: 'narrative',
        label: '抉擇',
        titleZh: '真相的代價 · The Price of Truth',
        paragraphs: [
          '火光搖曳。長老坐在你對面。',
          '「你從哪裡來？」他問。「為什麼來這裡？」',
          '在台北，你學會了沉默。但這裡不一樣——這裡的人用不同的眼光看你，就像在看穿你一樣。',
          '石板屋外，山風呼嘯。火堆劈啪作響。'
        ],
        choices: [
          {
            zh: '說出真相：你在尋找一個被帶走的人。',
            en: '"Tell the truth: you are searching for someone who was taken."',
            fear: -15, silence: -25,
            consequence: '長老沉默了很久。然後說：「她在山的另一邊。還活著。昨天剛到。」火光在他臉上跳動。你感到了一種很久沒有感受過的東西。'
          },
          {
            zh: '說謊：你只是一個迷路的旅人。',
            en: '"Lie: you are just a lost traveler."',
            fear: +5, silence: +20,
            consequence: '長老看著你，很久沒有說話。最後他說：「迷路的旅人。」然後站起來，走進黑暗裡。你失去了一個可能的盟友。'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    numLabel: 'ACT IV',
    titleZh: '綠島',
    titleEn: 'Green Island',
    theme: '剝奪 · DEPRIVATION',
    bgColor: '#0A0E18',
    hudLabel: 'Act IV — 綠島',
    emoji: '🏝️',
    scenes: [
      {
        type: 'narrative',
        label: '到達',
        titleZh: '編號 · The Number',
        paragraphs: [
          '抵達綠島。太陽烈得讓人睜不開眼。',
          '你的名字被抹去了，換成一個數字。',
          '碎石場。烈日。每一塊石頭，都是系統性的人格消除。',
          '在這個島上，身體是你唯一還擁有的東西。'
        ]
      },
      {
        type: 'exercise',
        exerciseType: 'burpee',
        label: '勞動',
        titleZh: '碎石場 · The Quarry',
        setup: '在強制勞動中，你必須讓身體記住它還活著。',
        instruction: '波比跳——每一個都是對系統的無聲抗議。',
        instructionEn: '"Burpees — let your body remember it is still alive."',
        typeLabel: '波比跳 BURPEES',
        target: 6,
        attrGain: { adapt: 20, escape: 10 },
        fearDelta: +10,
        successText: '你完成了。汗水浸透了你的衣服。旁邊的囚犯低聲說：「你叫什麼名字？」',
        attrGainLabel: 'ADAPT +20 · ESCAPE +10'
      },
      {
        type: 'narrative',
        label: '抉擇',
        titleZh: '逃亡的機會 · The Escape',
        paragraphs: [
          '深夜。囚犯告訴你有一個機會——鐵絲網的一個缺口。',
          '「就在今晚。」他說。「但只能一個人過去。」',
          '你看著他，這個失去名字的人。'
        ],
        choices: [
          {
            zh: '「你先走。我幫你把守。」',
            en: '"You go first. I will watch your back."',
            fear: +20, silence: -30,
            consequence: '他成功了。你沒有。但你看著他的背影消失在黑暗裡，你感到了一種很久沒有感受過的東西——也許是尊嚴。'
          },
          {
            zh: '假裝沒看見他。沉默地離開。',
            en: '"Pretend you did not see. Silently walk away."',
            fear: -10, silence: +25,
            consequence: '你回到你的位置。第二天早上，囚犯的位置空了。你不知道他有沒有成功。你永遠不會知道。'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    numLabel: 'ACT V',
    titleZh: '馬場町',
    titleEn: 'Machangding',
    theme: '記憶 · MEMORY',
    bgColor: '#0F0A0A',
    hudLabel: 'Act V — 馬場町',
    emoji: '⚖️',
    scenes: [
      {
        type: 'exercise',
        exerciseType: 'plank',
        label: '最終',
        titleZh: '最後的意志 · The Final Will',
        setup: '新店溪的晨霧。浸血的土堆。芒草花在風中搖曳。你找到了最終的證人。',
        instruction: '撐住——這是最後一次。身體的每一秒，都是對歷史的見證。',
        instructionEn: '"Hold — one last time. Every second is a witness to history."',
        typeLabel: '最終撐體 FINAL PLANK',
        duration: 8,
        attrGain: { will: 25, endure: 15 },
        fearDelta: -20,
        successText: '你站了起來。你知道你已經準備好了面對任何事情。晨霧在新店溪上緩緩流動。',
        attrGainLabel: 'WILL +25 · ENDURE +15'
      },
      {
        type: 'narrative',
        label: '終局',
        titleZh: '最後的選擇 · The Final Choice',
        paragraphs: [
          '最終證人站在你面前。他知道一切。',
          '「我可以告訴你她在哪裡，」他說。「但你必須決定一件事。」',
          '「你要帶著這段歷史活下去，還是讓它隨著晨霧消散？」',
          '新店溪在黎明前流過。芒草沙沙作響。'
        ],
        choices: [
          {
            zh: '「我要說出去。讓所有人知道。」',
            en: '"I will speak. Let everyone know what happened here."',
            fear: -25, silence: -35,
            consequence: '他點頭，告訴你她在哪裡。「記住，」他說。「記憶是最後的抵抗。」黎明的暖光照在新店溪上。'
          },
          {
            zh: '「沉默是我唯一能給她的保護。」',
            en: '"Silence is the only protection I can give her."',
            fear: +5, silence: +35,
            consequence: '他嘆了口氣，告訴你她在哪裡。「活下去，」他說。「這也是一種勇氣。」芒草的沙沙聲充滿了整個黎明。'
          }
        ]
      }
    ]
  }
];

const ENDINGS = [
  {
    range: [0, 20],
    titleZh: '《還活著》',
    titleEn: 'Still Alive',
    color: '#C4622D',
    bg: '#1C1A0A',
    dividerColor: '#C4622D',
    text: '你找到了她，也沒有失去自己。\n\n在一切都被剝奪的年代，你學會了哪些話必須說，哪些沉默必須保持。\n\n黎明的暖光照在新店溪上。她的手握著你的手。\n\n這不是英雄的故事。這只是兩個人，在那個年代，努力活著的故事。'
  },
  {
    range: [21, 45],
    titleZh: '《繼續走》',
    titleEn: 'Keep Walking',
    color: '#D3CBB8',
    bg: '#1A1A1A',
    dividerColor: '#888',
    text: '你找到了她。\n\n但在路上，你做了一些無法完全原諒自己的事。\n\n你活下來了，帶著那些事繼續走。\n\n霧中的灰白。前面還有很長的路。'
  },
  {
    range: [46, 70],
    titleZh: '《沉默的人》',
    titleEn: 'The Silent One',
    color: '#8899AA',
    bg: '#111820',
    dividerColor: '#445566',
    text: '你學會了那個年代的生存法則。\n\n沉默不只是策略，它變成了你的一部分。\n\n你找到了她，但你們之間也多了一些說不清楚的距離。\n\n石板的冷灰。有些事，不說，更好。'
  },
  {
    range: [71, 90],
    titleZh: '《霧中》',
    titleEn: 'In the Fog',
    color: '#E0E0E0',
    bg: '#0A0A0F',
    dividerColor: '#444',
    text: '在尋找的過程中，你逐漸忘記了自己在找什麼。\n\n每一次選擇都讓你更安全，也讓你更遠離自己。\n\n你還活著。這就是全部了。\n\n濃霧吞噬一切。'
  },
  {
    range: [91, 100],
    titleZh: '《無聲的名字》',
    titleEn: 'The Nameless Silence',
    color: '#555555',
    bg: '#030305',
    dividerColor: '#222',
    text: '你活下來了。\n\n但沒有人知道你曾在那裡。\n\n歷史沒有記錄你的名字。那個時代有太多這樣的名字——被沉默吞沒，被歷史遺忘。\n\n純黑淡出。'
  }
];

// ═══════════════════════════════════════════════════════════
// GAME STATE
// ═══════════════════════════════════════════════════════════

let state = {
  fear: 0,
  silence: 0,
  attrs: { will: 0, escape: 0, endure: 0, adapt: 0, root: 0 },
  actIndex: 0,
  sceneIndex: 0,
  narrativeStep: 0,
  isTyping: false,
  exerciseState: null
};

// ═══════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}

// Single clean transition: instantly black, switch screen, fade back in
function goTo(screenId, setupFn) {
  const overlay = document.getElementById('transition-overlay');
  overlay.style.transition = 'none';
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'all';
  // Two rAFs ensure the black frame is actually painted before we switch
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (setupFn) setupFn();
      showScreen(screenId);
      overlay.style.transition = 'opacity 0.45s ease';
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.style.pointerEvents = 'none'; }, 450);
    });
  });
}

function startGame() {
  state = {
    fear: 0, silence: 0,
    attrs: { will: 0, escape: 0, endure: 0, adapt: 0, root: 0 },
    actIndex: 0, sceneIndex: -1,
    narrativeStep: 0, isTyping: false, exerciseState: null
  };
  document.getElementById('hud').classList.add('visible');
  showActIntro();
}

function showActIntro() {
  const act = ACTS[state.actIndex];
  goTo('act-intro', () => {
    document.getElementById('act-number').textContent = act.numLabel;
    document.getElementById('act-title-zh').textContent = act.titleZh;
    document.getElementById('act-title-en').textContent = act.titleEn;
    document.getElementById('act-theme').textContent = act.theme;
    document.getElementById('hud-chapter').textContent = act.hudLabel;
    document.getElementById('screen-act-intro').style.background = act.bgColor;
    state.sceneIndex = -1;
  });
}

function nextScene() {
  state.sceneIndex++;
  const act = ACTS[state.actIndex];
  if (state.sceneIndex >= act.scenes.length) {
    // Next act or ending
    state.actIndex++;
    if (state.actIndex >= ACTS.length) {
      showEnding();
    } else {
      showActIntro();
    }
    return;
  }
  const scene = act.scenes[state.sceneIndex];
  if (scene.type === 'narrative') {
    loadNarrativeScene(scene);
  } else if (scene.type === 'exercise') {
    loadExerciseScene(scene);
  }
}

// ═══════════════════════════════════════════════════════════
// NARRATIVE SCENE
// ═══════════════════════════════════════════════════════════

function loadNarrativeScene(scene) {
  const act = ACTS[state.actIndex];
  document.getElementById('scene-label').textContent = scene.label;
  document.getElementById('scene-title').textContent = scene.titleZh;
  document.getElementById('scene-visual').textContent = act.emoji;
  document.getElementById('screen-narrative').style.background = act.bgColor;
  document.getElementById('narrative-text').innerHTML = '';
  document.getElementById('choices-container').style.display = 'none';
  document.getElementById('consequence-box').classList.remove('visible');
  state.narrativeStep = 0;
  state.isTyping = false;
  goTo('narrative', () => typeNextParagraph(scene));
}

let typewriterTimeout = null;
function typeNextParagraph(scene) {
  if (state.narrativeStep >= scene.paragraphs.length) {
    // Show choices or next button
    showChoicesOrNext(scene);
    return;
  }
  const para = scene.paragraphs[state.narrativeStep];
  state.narrativeStep++;
  state.isTyping = true;
  const el = document.getElementById('narrative-text');
  el.innerHTML = '';
  let i = 0;
  clearTimeout(typewriterTimeout);
  function typeChar() {
    if (i < para.length) {
      el.innerHTML = para.substring(0, i + 1) + '<span class="cursor"></span>';
      i++;
      typewriterTimeout = setTimeout(typeChar, 28 + (Math.random() * 15));
    } else {
      el.innerHTML = para;
      state.isTyping = false;
      // Auto-advance after short pause
      typewriterTimeout = setTimeout(() => {
        if (state.narrativeStep < scene.paragraphs.length) {
          typeNextParagraph(scene);
        } else {
          showChoicesOrNext(scene);
        }
      }, 1200);
    }
  }
  typeChar();
}

// Click to skip/advance
document.getElementById('screen-narrative').addEventListener('click', function(e) {
  if (e.target.closest('.choice-btn') || e.target.closest('.btn-next-scene') || e.target.closest('.consequence-box')) return;
  if (state.isTyping) {
    clearTimeout(typewriterTimeout);
    const scene = ACTS[state.actIndex].scenes[state.sceneIndex];
    const para = scene.paragraphs[state.narrativeStep - 1];
    document.getElementById('narrative-text').innerHTML = para;
    state.isTyping = false;
    typewriterTimeout = setTimeout(() => {
      if (state.narrativeStep < scene.paragraphs.length) {
        typeNextParagraph(scene);
      } else {
        showChoicesOrNext(scene);
      }
    }, 800);
  }
});

function showChoicesOrNext(scene) {
  if (scene.choices && scene.choices.length > 0) {
    const container = document.getElementById('choices-container');
    container.innerHTML = '';
    container.style.display = 'flex';
    scene.choices.forEach((choice, i) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      const fearLabel = choice.fear >= 0 ? `FEAR +${choice.fear}` : `FEAR ${choice.fear}`;
      const silLabel = choice.silence >= 0 ? `SILENCE +${choice.silence}` : `SILENCE ${choice.silence}`;
      btn.innerHTML = `
        <div class="choice-zh">${choice.zh}</div>
        <div class="choice-en">${choice.en}</div>
        <div class="choice-impact">${fearLabel} · ${silLabel}</div>
      `;
      btn.onclick = () => makeChoice(choice, i);
      container.appendChild(btn);
    });
  } else {
    // No choices — just show continue
    const container = document.getElementById('choices-container');
    container.innerHTML = '';
    container.style.display = 'flex';
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = '<div class="choice-zh" style="text-align:center;color:var(--text-dim)">繼續 · Continue ›</div>';
    btn.onclick = () => nextScene();
    container.appendChild(btn);
  }
}

function makeChoice(choice, idx) {
  // Hide choices
  document.getElementById('choices-container').style.display = 'none';
  // Apply stats
  applyFear(choice.fear);
  applySilence(choice.silence);
  // Show consequence
  const box = document.getElementById('consequence-box');
  document.getElementById('consequence-text').textContent = choice.consequence;
  box.classList.add('visible');
}

// ═══════════════════════════════════════════════════════════
// EXERCISE SCENE
// ═══════════════════════════════════════════════════════════

function loadExerciseScene(scene) {
  const act = ACTS[state.actIndex];
  document.getElementById('screen-exercise').style.background = act.bgColor;
  document.getElementById('ex-scene-label').textContent = scene.label;
  document.getElementById('ex-title').textContent = scene.titleZh;
  document.getElementById('ex-setup').textContent = scene.setup;
  document.getElementById('ex-instruction').innerHTML = scene.instruction + '<br><small style="font-size:0.8em;color:var(--text-muted)">' + scene.instructionEn + '</small>';
  document.getElementById('ex-type-label').textContent = scene.typeLabel;
  document.getElementById('ex-complete').classList.remove('visible');

  // Reset all sub-areas
  document.getElementById('ex-rep-area').style.display = 'none';
  document.getElementById('ex-plank-area').style.display = 'none';
  document.getElementById('ex-burpee-area').style.display = 'none';
  document.getElementById('ex-btn-right').style.display = 'none';
  document.getElementById('ex-btn-left-wrap').style.display = 'none';
  // Bug fix #2: always restore button area visibility for new exercise
  document.getElementById('ex-btn-area').style.display = 'flex';

  const mainBtn = document.getElementById('ex-btn-main');
  mainBtn.style.display = 'block';

  state.exerciseState = {
    type: scene.exerciseType,
    target: scene.target,
    duration: scene.duration,
    current: 0,
    done: false,
    scene: scene
  };

  if (scene.exerciseType === 'squat') {
    document.getElementById('ex-rep-area').style.display = 'flex';
    document.getElementById('rep-count').textContent = '0';
    document.getElementById('rep-target').textContent = `/ ${scene.target}`;
    document.getElementById('rep-count').classList.remove('complete');
    mainBtn.textContent = '▼ SQUAT 深蹲';
    // Bug fix #3: restore onclick in case a previous plank cleared it
    mainBtn.onclick = exerciseBtnClick;
  } else if (scene.exerciseType === 'plank') {
    document.getElementById('ex-plank-area').style.display = 'flex';
    document.getElementById('plank-timer').textContent = scene.duration;
    document.getElementById('plank-timer').classList.remove('complete');
    document.getElementById('plank-bar').style.width = '0%';
    mainBtn.textContent = '▼ HOLD 撐住';
    mainBtn.onclick = null; // plank uses mousedown/touchstart only
  } else if (scene.exerciseType === 'burpee') {
    document.getElementById('ex-burpee-area').style.display = 'flex';
    document.getElementById('ex-btn-right').style.display = 'block';
    document.getElementById('ex-btn-left-wrap').style.display = 'block';
    mainBtn.style.display = 'none';
    // Build dots
    const dots = document.getElementById('burpee-dots');
    dots.innerHTML = '';
    for (let i = 0; i < scene.target; i++) {
      const d = document.createElement('div');
      d.className = 'burpee-dot';
      d.id = 'dot-' + i;
      dots.appendChild(d);
    }
    state.exerciseState.burpeePhase = 'left';
    state.exerciseState.burpeeCount = 0;
    document.getElementById('burpee-next').textContent = '← LEFT 先按左邊';
  }

  goTo('exercise');
}

// Squat click
function exerciseBtnClick() {
  if (!state.exerciseState || state.exerciseState.done) return;
  const es = state.exerciseState;
  if (es.type === 'squat') {
    es.current++;
    document.getElementById('rep-count').textContent = es.current;
    // Flash animation
    const el = document.getElementById('rep-count');
    el.style.transform = 'scale(1.15)';
    el.style.color = 'var(--ember)';
    setTimeout(() => { el.style.transform = 'scale(1)'; el.style.color = 'var(--text-primary)'; }, 150);
    if (es.current >= es.target) {
      completeExercise();
    }
  }
}

// Plank hold
let plankInterval = null;
let plankElapsed = 0;

function exerciseBtnDown(e) {
  if (e) e.preventDefault();
  if (!state.exerciseState || state.exerciseState.done) return;
  const es = state.exerciseState;
  if (es.type !== 'plank') return;
  document.getElementById('ex-btn-main').classList.add('active-hold');
  plankElapsed = 0;
  clearInterval(plankInterval);
  const totalMs = es.duration * 1000;
  const startTime = Date.now();
  plankInterval = setInterval(() => {
    plankElapsed = Date.now() - startTime;
    const remaining = Math.max(0, es.duration - plankElapsed / 1000);
    document.getElementById('plank-timer').textContent = Math.ceil(remaining);
    document.getElementById('plank-bar').style.width = Math.min(100, (plankElapsed / totalMs) * 100) + '%';
    if (plankElapsed >= totalMs) {
      clearInterval(plankInterval);
      document.getElementById('plank-timer').textContent = '✓';
      document.getElementById('plank-timer').classList.add('complete');
      document.getElementById('plank-bar').style.width = '100%';
      document.getElementById('ex-btn-main').classList.remove('active-hold');
      completeExercise();
    }
  }, 50);
}

function exerciseBtnUp(e) {
  if (e) e.preventDefault();
  if (!state.exerciseState || state.exerciseState.done) return;
  const es = state.exerciseState;
  if (es.type !== 'plank') return;
  clearInterval(plankInterval);
  document.getElementById('ex-btn-main').classList.remove('active-hold');
  // Reset if not done
  if (!es.done) {
    document.getElementById('plank-timer').textContent = es.duration;
    document.getElementById('plank-bar').style.width = '0%';
  }
}

// Burpee L/R
function burpeeLeft() {
  if (!state.exerciseState || state.exerciseState.done) return;
  const es = state.exerciseState;
  if (es.type !== 'burpee') return;
  if (es.burpeePhase === 'left') {
    es.burpeePhase = 'right';
    document.getElementById('burpee-next').textContent = 'RIGHT → 現在按右邊';
    document.getElementById('ex-btn-left').style.opacity = '0.5';
    document.getElementById('ex-btn-right').style.opacity = '1';
  }
}

function burpeeRight() {
  if (!state.exerciseState || state.exerciseState.done) return;
  const es = state.exerciseState;
  if (es.type !== 'burpee') return;
  if (es.burpeePhase === 'right') {
    es.burpeePhase = 'left';
    es.burpeeCount++;
    // Fill dot
    const dot = document.getElementById('dot-' + (es.burpeeCount - 1));
    if (dot) dot.classList.add('done');
    document.getElementById('burpee-next').textContent = '← LEFT 先按左邊';
    document.getElementById('ex-btn-right').style.opacity = '0.5';
    document.getElementById('ex-btn-left').style.opacity = '1';
    if (es.burpeeCount >= es.target) {
      completeExercise();
    }
  }
}

function completeExercise() {
  if (!state.exerciseState || state.exerciseState.done) return;
  state.exerciseState.done = true;
  const scene = state.exerciseState.scene;
  // Apply attrs
  if (scene.attrGain) {
    Object.entries(scene.attrGain).forEach(([k, v]) => {
      state.attrs[k] = Math.min(100, (state.attrs[k] || 0) + v);
    });
    updateAttrDots();
  }
  applyFear(scene.fearDelta);
  // Show complete
  document.getElementById('ex-complete-text').textContent = scene.successText;
  document.getElementById('ex-attr-gain').textContent = scene.attrGainLabel;
  document.getElementById('ex-btn-area').style.display = 'none';
  document.getElementById('ex-btn-left-wrap').style.display = 'none';
  setTimeout(() => {
    document.getElementById('ex-complete').classList.add('visible');
  }, 300);
}

// ═══════════════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════════════

function applyFear(delta) {
  state.fear = Math.max(0, Math.min(100, state.fear + delta));
  updateFearVisuals();
}

function applySilence(delta) {
  state.silence = Math.max(0, Math.min(100, state.silence + delta));
  updateSilenceVisuals();
}

function updateFearVisuals() {
  const f = state.fear;
  document.getElementById('fear-fill').style.width = f + '%';

  // Update vignette
  const vignette = document.getElementById('fear-vignette');
  if (f < 30) {
    vignette.style.boxShadow = 'none';
    vignette.style.background = 'none';
  } else if (f < 60) {
    const intensity = (f - 30) / 30;
    vignette.style.background = `radial-gradient(ellipse at center, transparent 50%, rgba(20,5,5,${0.3 * intensity}) 100%)`;
  } else if (f < 85) {
    const intensity = (f - 60) / 25;
    vignette.style.background = `radial-gradient(ellipse at center, transparent 30%, rgba(30,5,5,${0.5 + 0.2 * intensity}) 100%)`;
  } else {
    const intensity = (f - 85) / 15;
    vignette.style.background = `radial-gradient(ellipse at center, transparent 10%, rgba(40,0,0,${0.7 + 0.2 * intensity}) 100%)`;
    // ECG visible at extreme fear
    document.getElementById('fear-ecg').classList.add('visible');
    startECG();
  }

  // Color-shift fill
  if (f < 30) document.getElementById('fear-fill').style.background = '#1E3A1E';
  else if (f < 60) document.getElementById('fear-fill').style.background = '#3A2A1A';
  else if (f < 85) document.getElementById('fear-fill').style.background = '#3A1A1A';
  else document.getElementById('fear-fill').style.background = '#8B2020';

  // Update HUD background color hint
  if (f >= 85) {
    document.body.style.setProperty('--surveillance', '#150808');
  } else if (f >= 60) {
    document.body.style.setProperty('--surveillance', '#111118');
  } else {
    document.body.style.setProperty('--surveillance', '#111118');
  }
}

function updateSilenceVisuals() {
  const s = state.silence;
  document.getElementById('silence-fill').style.width = s + '%';
  if (s < 30) document.getElementById('silence-fill').style.background = '#1A1A2E';
  else if (s < 70) document.getElementById('silence-fill').style.background = '#1A0A2A';
  else document.getElementById('silence-fill').style.background = '#2A0A3A';
}

function updateAttrDots() {
  const attrOrder = ['will', 'escape', 'endure', 'adapt', 'root'];
  document.querySelectorAll('.attr-dot').forEach((dot, i) => {
    const attr = attrOrder[i];
    dot.classList.toggle('filled', (state.attrs[attr] || 0) >= 10);
  });
}

// ═══════════════════════════════════════════════════════════
// ECG CANVAS
// ═══════════════════════════════════════════════════════════

let ecgAnimFrame = null;
let ecgOffset = 0;

function startECG() {
  if (ecgAnimFrame) return;
  const canvas = document.getElementById('fear-ecg');
  canvas.width = window.innerWidth;
  canvas.height = 30;
  const ctx = canvas.getContext('2d');
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = state.fear > 90 ? '#8B2020' : '#3A1A1A';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
      const t = (x + ecgOffset) / 60;
      let y = 15;
      const phase = t % 1;
      if (phase < 0.05) y = 15 - phase * 200;
      else if (phase < 0.10) y = 15 + (phase - 0.05) * 400;
      else if (phase < 0.15) y = 15 - (phase - 0.10) * 200;
      else if (phase < 0.20) y = 15 + (phase - 0.15) * 100;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ecgOffset += 2;
    ecgAnimFrame = requestAnimationFrame(draw);
  }
  draw();
}

// ═══════════════════════════════════════════════════════════
// ENDING
// ═══════════════════════════════════════════════════════════

function showEnding() {
  const f = state.fear;
  const ending = ENDINGS.find(e => f >= e.range[0] && f <= e.range[1]) || ENDINGS[ENDINGS.length - 1];

  document.getElementById('screen-ending').style.background = ending.bg;
  document.getElementById('ending-title-zh').textContent = ending.titleZh;
  document.getElementById('ending-title-zh').style.color = ending.color;
  document.getElementById('ending-title-en').textContent = ending.titleEn;
  document.getElementById('ending-divider').style.background = ending.dividerColor;
  document.getElementById('ending-text').textContent = ending.text;
  document.getElementById('ending-fear').textContent = state.fear;
  document.getElementById('ending-silence').textContent = state.silence;

  document.getElementById('hud').classList.remove('visible');

  goTo('ending', () => {
    if (ecgAnimFrame) { cancelAnimationFrame(ecgAnimFrame); ecgAnimFrame = null; }
    document.getElementById('fear-ecg').classList.remove('visible');
    document.getElementById('fear-vignette').style.background = 'none';
  });
}

function restartGame() {
  document.getElementById('fear-vignette').style.background = 'none';
  document.getElementById('fear-ecg').classList.remove('visible');
  if (ecgAnimFrame) { cancelAnimationFrame(ecgAnimFrame); ecgAnimFrame = null; }
  document.body.style.setProperty('--surveillance', '#111118');
  document.getElementById('hud').classList.remove('visible');
  document.getElementById('ex-btn-area').style.display = 'flex';
  goTo('title');
}

// ═══════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════

document.addEventListener('keydown', function(e) {
  if (!state.exerciseState || state.exerciseState.done) return;
  const es = state.exerciseState;
  if (e.code === 'Space' || e.code === 'ArrowDown') {
    e.preventDefault();
    if (es.type === 'squat') exerciseBtnClick();
    else if (es.type === 'plank') exerciseBtnDown();
    else if (es.type === 'burpee') burpeeLeft();
  }
  if ((e.code === 'ArrowUp' || e.code === 'ArrowRight') && es.type === 'burpee') {
    burpeeRight();
  }
});

document.addEventListener('keyup', function(e) {
  if (!state.exerciseState || state.exerciseState.done) return;
  const es = state.exerciseState;
  if ((e.code === 'Space' || e.code === 'ArrowDown') && es.type === 'plank') {
    exerciseBtnUp();
  }
});

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════

window.addEventListener('resize', () => {
  const canvas = document.getElementById('fear-ecg');
  canvas.width = window.innerWidth;
});

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', e => e.preventDefault());
