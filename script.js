const config = window.BIRTHDAY_CONFIG || {};
const unlockAt = Date.parse(`${config.birthdayDate || "2026-07-18"}T00:00:00+08:00`);
const birthdayName = config.birthdayName || "晓彤姐姐";
const birthdayAge = config.birthdayAge || 21;

const photoMemories = [
  {
    date: "2025.11.02",
    location: "杭州",
    title: "yyx高三过生日时拍的",
    note: "看起来是帮我切蛋糕？感觉高中过去了很久啊"
  },
  {
    date: "2026.03.28",
    location: "苏州",
    title: "大一暑假回来时中医诊所出来团建",
    note: "本来想放那张燃冬的，但是我表情太狰狞了，改了这张"
  },
  {
    date: "2026.01.14",
    location: "上海",
    title: "成人礼捏",
    note: "cxt与yyx目前也可能是未来唯一一张都化妆了的照片"
  },
  {
    date: "2026.05.09",
    location: "南京",
    title: "大二跑去体能乐园玩",
    note: "这玩意摇的真狠啊"
  }
];

const fandomMessages = {
  six: {
    label: "SIX",
    title: "Catherine Parr",
    theme: "six",
    image: "./assets/image copy.png",
    imageAlt: "SIX 主题照片",
    wishes: [
      "My dear, never forget that your story belongs to you.",
      "The world may try to tell you who you should be, but only you can decide who you will become.",
      "May this new chapter bring you courage, joy, and the freedom to shine as yourself. Happy Birthday."
    ]
  },
  reverse: {
    label: "重返未来：1999",
    title: "槲寄生",
    theme: "reverse",
    video: "./assets/槲寄生.webm",
    videoAlphaSplit: true,
    image: "./assets/忘了.jpg",
    imageAlt: "重返未来 1999 主题照片",
    wishes: [
      "Every ring within a tree marks a year that has quietly passed",
      "May yours be filled with gentle light, steady roots, and blossoms yet unseen",
      "Happy Birthday."
    ]
  },
  rusty: {
    label: "Rusty Lake 档案",
    title: "兔子先生来送生日祝福啦",
    theme: "rusty",
    image: ["./assets/兔子先生送祝福.png",
      "./assets/兔子庆祝.png"
    ],
    imageAlt: ["Rusty Lake 主题照片1",
      "Rusty Lake 主题照片2"
    ],
    wishes: [
      "太地狱了对不起，但是这是你自己点的ip不能怪我👉👈"
    ]
  },
  onmyoji: {
    label: "阴阳师守护",
    title: "不知火",
    theme: "onmyoji",
    image: "./assets/image.png",
    imageAlt: "阴阳师主题照片",
    wishes: [
      "夜色漫长，星河璀璨。但今夜，有一簇火焰，比群星更加耀眼。",
      "愿你永远追随自己的心意起舞，愿你的旅途之中，始终有光相伴。",
      "生日快乐。"
    ]
  },
  night: {
    label: "夜幕之下",
    title: "ng",
    theme: "night",
    video: "./assets/ng.mp4",
    imageAlt: "夜幕主题插图",
    wishes: [
      "愿你穿过每一段夜色时，都知道前面有人替你留灯。",
      "今晚的月光不负责照别人，只负责让你生日快乐。",
      "（其实因为此人跳活动剧情且还没抽到他，所以不会语c）"
    ]
  }
};

const gachaBlessings = [
  {
    rarity: "★★★★★",
    tier: "blue",
    title: "好运值 +100%",
    body: "今天出门、许愿、点击按钮，统统有加成。",
    signature: "维尔汀批注：这张请优先给寿星。"
  },
  {
    rarity: "★★★★★",
    tier: "blue",
    title: "睡眠质量 +20%",
    body: "今晚做的梦会很轻，明早醒来也会带一点好心情。",
    signature: "苏芙比留言：这是一张温柔生效的卡。"
  },
  {
    rarity: "★★★★★★",
    tier: "gold",
    title: "DDL 自动顺延一天",
    body: "虽然是假的，但今天的你值得拥有一次无条件宽限。",
    signature: "箱中电波：请不要深究真实性。"
  },
  {
    rarity: "★★★★★★",
    tier: "gold",
    title: "今日开心保底",
    body: "无论今天发生什么，快乐都会在结尾准时结算。",
    signature: "维尔汀批注：此卡建议立即生效。"
  },
  {
    rarity: "★★★★★",
    tier: "blue",
    title: "见面运上升",
    body: "想见的人更容易见到，想说的话也更容易被听见。",
    signature: "十四行诗：愿今日的一切都恰到好处。"
  },
  {
    rarity: "★★★★★★",
    tier: "gold",
    title: "今天的你绝对主角",
    body: "剧情自动把镜头切给你，连背景音乐都会更偏爱一点。",
    signature: "箱中电波：主角位已锁定，请放心登场。"
  }
];

const canvas = document.querySelector("#confetti-canvas");
const ctx = canvas.getContext("2d");
const nebulaCanvas = document.querySelector("#nebula-canvas");
const nebulaCtx = nebulaCanvas.getContext("2d");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const toast = document.querySelector(".toast");
const cake = document.querySelector(".cake");
const heroActions = document.querySelector(".hero-actions");
const heroBeginButton = document.querySelector(".hero-begin-button");
const heroUnlockHint = document.querySelector(".hero-unlock-hint");
const cakeHoldTip = document.querySelector(".cake-hold-tip");
const singleCandle = document.querySelector(".single-candle");
const countdownClock = document.querySelector(".countdown-clock");
const beijingTime = document.querySelector(".beijing-time");
const birthdayReveal = document.querySelector(".birthday-reveal");
const magneticItems = document.querySelectorAll(".magnetic");
const revealItems = document.querySelectorAll(".reveal");
const sharedCameraVideo = document.querySelector("#shared_camera_video");
const saturnBackground = document.querySelector(".saturn-background");
const saturnFrame = saturnBackground?.querySelector(".saturn-frame");
const saturnStage = document.querySelector("#saturn-stage");
const overlayLayer = document.querySelector(".overlay-layer");
const photoModal = document.querySelector(".photo-modal");
const photoModalImage = document.querySelector(".photo-modal-image");
const photoModalMeta = document.querySelector(".photo-modal-meta");
const photoModalTitle = document.querySelector("#photo-modal-title");
const photoModalText = document.querySelector(".photo-modal-text");
const fandomModal = document.querySelector(".fandom-modal");
const fandomLabel = document.querySelector(".fandom-label");
const fandomTitle = document.querySelector(".fandom-title");
const fandomWishes = document.querySelector(".fandom-wishes");
const fandomMedia = fandomModal?.querySelector(".fandom-media");
const photoCards = document.querySelectorAll(".memory-polaroid");
const planets = document.querySelectorAll(".planet");
const universeStage = document.querySelector(".universe-stage");
const gachaButton = document.querySelector(".gacha-button");
const gachaResult = document.querySelector(".gacha-result");
const gachaRarity = document.querySelector(".gacha-rarity");
const gachaTitle = document.querySelector(".gacha-title");
const gachaBody = document.querySelector(".gacha-body");
const gachaSignature = document.querySelector(".gacha-signature");
const summonOverlay = document.querySelector(".summon-overlay");
const summonCanvas = document.querySelector(".summon-canvas");
const summonCancel = document.querySelector(".summon-cancel");
const summonCopy = document.querySelector(".summon-copy");
const letterLines = document.querySelectorAll(".letter-line");

birthdayReveal.querySelector("p").textContent = birthdayName;
birthdayReveal.querySelector("h2").textContent = `${birthdayAge}岁生日快乐！`;

const colors = ["#0b3f83", "#1666d9", "#2f8cff", "#8fc4ff", "#eaf4ff", "#ffffff"];
const wishes = [
  "蓝色好运已送达",
  "今晚你是主角",
  "愿望正在发光",
  "生日快乐",
  "新一岁闪闪发亮",
  "故事会偏爱你",
  "朋友一直都在",
  "今天所有宇宙都向你靠拢",
  "这份喜欢只写给你"
];

let confetti = [];
let particles = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;
let nebulaProgress = 0;
let nebulaUnlocked = false;
const nebulaEnabled = config.enableGateNebula === true;
let rotationX = -0.18;
let rotationY = 0.28;
let targetRotationX = rotationX;
let targetRotationY = rotationY;
let draggingNebula = false;
let lastDragX = 0;
let lastDragY = 0;
let draggingGlow = false;
let glowX = 0;
let glowY = 0;
let glowVx = 0;
let glowVy = 0;
let glowTargetX = 0;
let glowTargetY = 0;
let saturnMode = "bg";
let saturnFrameReady = false;
let saturnStageVisible = false;
let activePointerId = null;
let pointerStartX = 0;
let pointerStartY = 0;
let pointerLastX = 0;
let pointerLastY = 0;
let pointerDragged = false;
let saturnDragActive = false;
let summoningActive = false;
let drawingSummon = false;
let summonStrokeStarted = false;
let summonLastX = 0;
let summonLastY = 0;
let parentHands = null;
let parentHandsStarted = false;
let parentHandsFramePending = false;
let saturnExperienceStarted = false;
let activeModal = null;
let gachaBusy = false;
let heroCandleLit = false;
let heroHoldTimer = 0;
let heroHoldStartedAt = 0;
const heroHoldDuration = 1200;
let planetOrbitData = [];
let planetOrbitCenterX = 0;
let planetOrbitCenterY = 0;

function setupPlanetOrbits() {
  if (!universeStage || !planets.length) {
    return;
  }

  planets.forEach((planet) => {
    planet.style.left = "";
    planet.style.top = "";
  });

  planetOrbitCenterX = universeStage.clientWidth / 2;
  planetOrbitCenterY = universeStage.clientHeight / 2;

  const baseData = Array.from(planets, (planet) => {
    const centerX = planet.offsetLeft + planet.offsetWidth / 2;
    const centerY = planet.offsetTop + planet.offsetHeight / 2;
    const dx = centerX - planetOrbitCenterX;
    const dy = centerY - planetOrbitCenterY;
    return {
      planet,
      width: planet.offsetWidth,
      height: planet.offsetHeight,
      radius: Math.max(10, Math.hypot(dx, dy)),
      angle: Math.atan2(dy, dx)
    };
  });

  const minRadius = Math.min(...baseData.map((item) => item.radius));
  const maxRadius = Math.max(...baseData.map((item) => item.radius));
  const radiusRange = Math.max(1, maxRadius - minRadius);
  const innerSpeed = 0.26;
  const outerSpeed = 0.08;

  planetOrbitData = baseData.map((item) => {
    const t = (item.radius - minRadius) / radiusRange;
    const speedDeg = innerSpeed - (innerSpeed - outerSpeed) * t;
    return {
      ...item,
      speed: (speedDeg * Math.PI) / 180
    };
  });
}

function animatePlanetOrbits() {
  if (planetOrbitData.length) {
    for (const orbit of planetOrbitData) {
      orbit.angle += orbit.speed;
      const x = planetOrbitCenterX + Math.cos(orbit.angle) * orbit.radius - orbit.width / 2;
      const y = planetOrbitCenterY + Math.sin(orbit.angle) * orbit.radius - orbit.height / 2;
      orbit.planet.style.left = `${x}px`;
      orbit.planet.style.top = `${y}px`;
    }
  }

  requestAnimationFrame(animatePlanetOrbits);
}

function getBeijingDate() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" }));
}

function formatCountdown(ms) {
  const safeMs = Math.max(0, ms);
  const totalSeconds = Math.floor(safeMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateBeijingClock() {
  const now = getBeijingDate();
  beijingTime.textContent = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  if (!nebulaUnlocked) {
    countdownClock.textContent = formatCountdown(unlockAt - Date.now());
  }
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  nebulaCanvas.width = Math.floor(window.innerWidth * ratio);
  nebulaCanvas.height = Math.floor(window.innerHeight * ratio);
  nebulaCanvas.style.width = `${window.innerWidth}px`;
  nebulaCanvas.style.height = `${window.innerHeight}px`;
  nebulaCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
  if (nebulaEnabled) {
    createNebulaParticles();
  }
  setupPlanetOrbits();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function cancelHeroHold() {
  clearTimeout(heroHoldTimer);
  heroHoldTimer = 0;
  heroHoldStartedAt = 0;
  cake?.classList.remove("is-holding");
}

function unlockHeroBegin() {
  if (heroCandleLit) {
    return;
  }

  heroCandleLit = true;
  cake?.classList.remove("wish-made", "is-holding");
  cake?.classList.add("is-lit");
  heroActions?.classList.remove("hero-actions-locked");
  heroActions?.classList.add("hero-actions-unlocked");

  if (heroBeginButton) {
    heroBeginButton.removeAttribute("aria-hidden");
    heroBeginButton.removeAttribute("tabindex");
  }

  if (heroUnlockHint) {
    heroUnlockHint.textContent = "蜡烛已经点亮，今晚的入口已经开启。";
  }

  if (cakeHoldTip) {
    cakeHoldTip.textContent = "蜡烛已经点亮，点击 Begin 开始下面的生日旅程。";
  }

  showToast("蜡烛已经点亮，Begin 已解锁。");
  const cakeRect = cake?.getBoundingClientRect();
  if (cakeRect) {
    makeConfetti(cakeRect.left + cakeRect.width / 2, cakeRect.top + cakeRect.height * 0.22, 88);
  }
}

function beginHeroHold() {
  if (!cake || heroCandleLit || heroHoldTimer) {
    return;
  }

  heroHoldStartedAt = performance.now();
  cake.classList.add("is-holding");

  if (cakeHoldTip) {
    cakeHoldTip.textContent = "保持按住，蜡烛马上就会点亮。";
  }

  heroHoldTimer = window.setTimeout(() => {
    heroHoldTimer = 0;
    unlockHeroBegin();
  }, heroHoldDuration);
}

function handleHeroCakePressEnd(showHint = true) {
  if (heroCandleLit) {
    return;
  }

  const holdElapsed = heroHoldStartedAt ? performance.now() - heroHoldStartedAt : 0;
  const wasHolding = Boolean(heroHoldTimer) || holdElapsed > 0;
  cancelHeroHold();

  if (showHint && wasHolding && holdElapsed < heroHoldDuration && cakeHoldTip) {
    cakeHoldTip.textContent = "再多按一会儿，点亮后 Begin 才会出现。";
  }
}

function makeConfetti(x, y, amount = 42) {
  for (let index = 0; index < amount; index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    confetti.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 5 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.28,
      life: 70 + Math.random() * 45
    });
  }
}

function makeWord(x, y) {
  const word = document.createElement("span");
  word.className = "floating-word";
  word.textContent = wishes[Math.floor(Math.random() * wishes.length)];
  word.style.setProperty("--x", `${x}px`);
  word.style.setProperty("--y", `${y}px`);
  document.body.appendChild(word);
  word.addEventListener("animationend", () => word.remove());
}

function drawConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  confetti = confetti.filter((piece) => piece.life > 0);

  for (const piece of confetti) {
    piece.life -= 1;
    piece.x += piece.vx;
    piece.y += piece.vy;
    piece.vy += 0.08;
    piece.vx *= 0.99;
    piece.rotation += piece.spin;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.globalAlpha = Math.max(piece.life / 90, 0);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.62);
    ctx.restore();
  }

  requestAnimationFrame(drawConfetti);
}

function cakePoint() {
  const part = Math.random();
  const angle = Math.random() * Math.PI * 2;
  let x = 0;
  let y = 0;
  let z = (Math.random() - 0.5) * 90;

  if (part < 0.46) {
    const rx = 190 * Math.sqrt(Math.random());
    x = Math.cos(angle) * rx;
    y = 118 + Math.sin(angle) * 42 + (Math.random() - 0.5) * 42;
    z += Math.sin(angle) * 36;
  } else if (part < 0.72) {
    const rx = 150 * Math.sqrt(Math.random());
    x = Math.cos(angle) * rx;
    y = 36 + Math.sin(angle) * 34;
    z += Math.sin(angle) * 30;
  } else if (part < 0.88) {
    x = (Math.random() - 0.5) * 34;
    y = -82 + Math.random() * 110;
    z = (Math.random() - 0.5) * 18;
  } else {
    const flame = Math.random();
    x = (Math.random() - 0.5) * (34 * (1 - flame * 0.45));
    y = -122 - flame * 62 + Math.random() * 18;
    z = (Math.random() - 0.5) * 24;
  }

  return { x, y, z };
}

function createNebulaParticles() {
  const amount = Math.min(1300, Math.max(760, Math.floor((window.innerWidth * window.innerHeight) / 1200)));
  particles = Array.from({ length: amount }, () => {
    const target = cakePoint();
    const radius = 360 + Math.random() * 560;
    const angle = Math.random() * Math.PI * 2;
    return {
      sx: Math.cos(angle) * radius,
      sy: Math.sin(angle) * radius * 0.7,
      sz: (Math.random() - 0.5) * 700,
      tx: target.x,
      ty: target.y,
      tz: target.z,
      size: 0.8 + Math.random() * 2.2,
      hue: 204 + Math.random() * 34,
      twinkle: Math.random() * Math.PI * 2
    };
  });
}

function projectPoint(x, y, z) {
  const cx = Math.cos(rotationX);
  const sx = Math.sin(rotationX);
  const cy = Math.cos(rotationY);
  const sy = Math.sin(rotationY);
  const y1 = y * cx - z * sx;
  const z1 = y * sx + z * cx;
  const x2 = x * cy + z1 * sy;
  const z2 = -x * sy + z1 * cy;
  const depth = 760 / (760 + z2);
  return {
    x: window.innerWidth / 2 + x2 * depth,
    y: window.innerHeight / 2 + y1 * depth,
    depth
  };
}

function drawNebula() {
  nebulaCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  rotationX += (targetRotationX - rotationX) * 0.08;
  rotationY += (targetRotationY - rotationY) * 0.08;

  if (nebulaUnlocked) {
    nebulaProgress += (1 - nebulaProgress) * 0.018;
  }

  const eased = 1 - Math.pow(1 - nebulaProgress, 3);
  const time = performance.now() * 0.002;

  for (const particle of particles) {
    const x = particle.sx + (particle.tx - particle.sx) * eased;
    const y = particle.sy + (particle.ty - particle.sy) * eased;
    const z = particle.sz + (particle.tz - particle.sz) * eased;
    const point = projectPoint(x, y, z);
    const alpha = 0.16 + eased * 0.72 + Math.sin(time + particle.twinkle) * 0.08;
    const size = particle.size * point.depth * (0.8 + eased * 0.5);

    nebulaCtx.beginPath();
    nebulaCtx.fillStyle = `hsla(${particle.hue}, 100%, ${72 + point.depth * 18}%, ${alpha})`;
    nebulaCtx.shadowBlur = 14 * eased;
    nebulaCtx.shadowColor = "rgba(143, 196, 255, 0.85)";
    nebulaCtx.arc(point.x, point.y, size, 0, Math.PI * 2);
    nebulaCtx.fill();
  }

  nebulaCtx.shadowBlur = 0;
  requestAnimationFrame(drawNebula);
}

function getCandleAnchor() {
  const rect = singleCandle.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + 54
  };
}

function isNearCandleGlow(event) {
  const anchor = getCandleAnchor();
  const dx = event.clientX - anchor.x;
  const dy = event.clientY - anchor.y;
  return Math.hypot(dx, dy) < 150;
}

function setGlowTargetFromPointer(event, strength = 0.72) {
  const anchor = getCandleAnchor();
  const dx = event.clientX - anchor.x;
  const dy = event.clientY - anchor.y;
  const distance = Math.hypot(dx, dy);
  const limit = draggingGlow ? 92 : 30;
  const scale = Math.min(distance, limit) / Math.max(distance, 1);
  glowTargetX = dx * scale * strength;
  glowTargetY = dy * scale * strength;
}

function releaseGlow() {
  draggingGlow = false;
  glowTargetX = 0;
  glowTargetY = 0;
  singleCandle.classList.remove("is-jelly");
}

function updateCandleJelly() {
  const locked = document.body.classList.contains("is-locked") && !nebulaUnlocked;
  if (!locked) {
    glowTargetX = 0;
    glowTargetY = 0;
  }

  const spring = draggingGlow ? 0.24 : 0.11;
  const friction = draggingGlow ? 0.68 : 0.78;
  glowVx = (glowVx + (glowTargetX - glowX) * spring) * friction;
  glowVy = (glowVy + (glowTargetY - glowY) * spring) * friction;
  glowX += glowVx;
  glowY += glowVy;

  const pull = Math.min(110, Math.hypot(glowX, glowY));
  singleCandle.style.setProperty("--glow-x", glowX.toFixed(2));
  singleCandle.style.setProperty("--glow-y", glowY.toFixed(2));
  singleCandle.style.setProperty("--glow-pull", pull.toFixed(2));
  singleCandle.style.setProperty("--candle-x", (glowX * 0.35).toFixed(2));
  singleCandle.style.setProperty("--candle-y", (glowY * 0.25).toFixed(2));

  requestAnimationFrame(updateCandleJelly);
}

function animateCursor() {
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}

function updateScrollSky() {
  const limit = Math.max(window.innerHeight * 2.4, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(window.scrollY / limit, 1);
  document.documentElement.style.setProperty("--sky-progress", progress.toFixed(3));
  requestAnimationFrame(updateScrollSky);
}

function lightWish(x = window.innerWidth / 2, y = window.innerHeight / 2, big = false) {
  makeConfetti(x, y, big ? 140 : 44);
  makeWord(x, y);
  showToast(big ? "蓝色生日烟花已点亮。" : "收到一颗蓝色祝福。");
}

function unlockExperience() {
  if (nebulaUnlocked) return;
  nebulaUnlocked = true;
  document.body.classList.remove("is-locked");
  document.body.classList.add("is-unlocking");
  countdownClock.textContent = "生日剧场已开启";
  showToast("时间到了，星星正在组成蛋糕。");
  makeConfetti(window.innerWidth / 2, window.innerHeight * 0.42, 160);
  setTimeout(() => document.body.classList.add("is-unlocked"), 1200);
  setTimeout(() => document.body.classList.remove("is-unlocking"), 5200);
}

function checkGate() {
  updateBeijingClock();
  if (config.forceUnlocked || Date.now() >= unlockAt) {
    unlockExperience();
  } else {
    document.body.classList.add("is-locked");
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }
}

function syncSaturnMode(mode) {
  const nextMode = mode === "full" ? "full" : "bg";
  saturnMode = nextMode;

  if (saturnBackground) {
    saturnBackground.classList.toggle("is-interactive", nextMode === "full");
  }

  if (!saturnFrameReady || !saturnFrame?.contentWindow) {
    return;
  }

  saturnFrame.contentWindow.postMessage({ type: "saturn-mode", mode: nextMode }, "*");
}

function syncSaturnHandScale(scale) {
  if (!saturnFrameReady || !saturnFrame?.contentWindow) {
    return;
  }

  saturnFrame.contentWindow.postMessage({ type: "saturn-hand-scale", scale }, "*");
}

function syncSaturnCameraStream() {
  if (!saturnFrameReady || !saturnFrame?.contentWindow || !window.__saturnCameraStream) {
    return;
  }

  try {
    saturnFrame.contentWindow.postMessage(
      {
        type: "saturn-camera-stream",
        stream: window.__saturnCameraStream,
      },
      "*"
    );
  } catch (error) {
    // 某些环境不支持跨窗口克隆 MediaStream，保留静态土星展示。
  }
}

function loadSaturnFrame() {
  if (!saturnFrame || saturnFrame.dataset.loaded === "true") {
    return;
  }

  const nextSrc = saturnFrame.dataset.src;
  if (!nextSrc) {
    return;
  }

  saturnFrame.dataset.loaded = "true";
  saturnFrame.src = nextSrc;
}

function ensureSaturnExperienceStarted() {
  saturnExperienceStarted = true;
  requestCameraPermissionFirst();
}

async function requestCameraPermissionFirst() {
  if (!navigator.mediaDevices?.getUserMedia) {
    loadSaturnFrame();
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    window.__saturnCameraStream = stream;

    window.addEventListener(
      "beforeunload",
      () => {
        stream.getTracks().forEach((track) => track.stop());
      },
      { once: true }
    );

    startParentHandTracking(stream);
  } catch (error) {
    syncSaturnHandScale(1);
  } finally {
    loadSaturnFrame();
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

async function startParentHandTracking(stream) {
  if (!stream || parentHandsStarted || typeof Hands !== "function" || !sharedCameraVideo) {
    return;
  }

  parentHandsStarted = true;
  sharedCameraVideo.srcObject = stream;

  try {
    await sharedCameraVideo.play();
  } catch (error) {
    return;
  }

  parentHands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  });

  parentHands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  parentHands.onResults((results) => {
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      syncSaturnHandScale(1);
      return;
    }

    const landmarks = results.multiHandLandmarks[0];
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const indexBase = landmarks[5];

    const palmSize = Math.hypot(indexBase.x - wrist.x, indexBase.y - wrist.y);
    const pinchDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);

    const minRatio = 0.2;
    const maxRatio = 1.2;
    const minScale = 0.3;
    const maxScale = 2.5;

    let normalized = (pinchDist / (palmSize || 0.1) - minRatio) / (maxRatio - minRatio);
    normalized = clamp(normalized, 0, 1);

    const scale = minScale + normalized * (maxScale - minScale);
    syncSaturnHandScale(scale);
  });

  const processFrame = async () => {
    if (!parentHands || sharedCameraVideo.readyState < 2) {
      requestAnimationFrame(processFrame);
      return;
    }

    if (parentHandsFramePending) {
      requestAnimationFrame(processFrame);
      return;
    }

    parentHandsFramePending = true;

    try {
      await parentHands.send({ image: sharedCameraVideo });
    } finally {
      parentHandsFramePending = false;
      requestAnimationFrame(processFrame);
    }
  };

  processFrame();
}

function syncSaturnDrag(dx, dy, phase) {
  if (saturnMode !== "bg" || !saturnFrameReady || !saturnFrame?.contentWindow) {
    return;
  }

  saturnFrame.contentWindow.postMessage(
    {
      type: "saturn-drag",
      dx,
      dy,
      phase,
    },
    "*"
  );
}

function resetPointerDragState() {
  activePointerId = null;
  pointerDragged = false;
  saturnDragActive = false;
}

function openOverlay(modal) {
  if (!overlayLayer || !modal) {
    return;
  }

  if (activeModal && activeModal !== modal) {
    closeOverlay(activeModal);
  }

  activeModal = modal;
  overlayLayer.classList.add("is-open");
  overlayLayer.setAttribute("aria-hidden", "false");
  modal.hidden = false;
  modal.classList.add("is-open");
  document.body.classList.add("overlay-open");
}

function closeOverlay(modal = activeModal) {
  if (!overlayLayer || !modal) {
    return;
  }

  modal.classList.remove("is-open");
  modal.hidden = true;

  if (modal === activeModal) {
    activeModal = null;
  }

  if (!activeModal) {
    overlayLayer.classList.remove("is-open");
    overlayLayer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overlay-open");
  }
}

function pulseFromSource(element) {
  if (!element) {
    return;
  }

  element.animate(
    [
      { transform: "scale(1)", filter: "brightness(1)" },
      { transform: "scale(1.08)", filter: "brightness(1.18)" },
      { transform: "scale(1)", filter: "brightness(1)" }
    ],
    { duration: 420, easing: "cubic-bezier(.16,1,.3,1)" }
  );
}

function animatePhotoZoomFromCard(sourceCard) {
  const sourceImage = sourceCard?.querySelector("img");
  const modalMedia = photoModal?.querySelector(".photo-modal-media");
  const modalNote = photoModal?.querySelector(".photo-modal-note");
  if (!sourceImage || !modalMedia) {
    return;
  }

  const sourceRect = sourceImage.getBoundingClientRect();
  const targetRect = modalMedia.getBoundingClientRect();

  if (!sourceRect.width || !sourceRect.height || !targetRect.width || !targetRect.height) {
    return;
  }

  const dx = sourceRect.left - targetRect.left;
  const dy = sourceRect.top - targetRect.top;
  const sx = sourceRect.width / targetRect.width;
  const sy = sourceRect.height / targetRect.height;

  modalMedia.animate(
    [
      {
        transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`,
        opacity: 0.62,
        borderRadius: "16px"
      },
      {
        transform: "translate(0, 0) scale(1)",
        opacity: 1,
        borderRadius: "24px"
      }
    ],
    { duration: 560, easing: "cubic-bezier(.16,1,.3,1)" }
  );

  modalNote?.animate(
    [
      { opacity: 0, transform: "translateX(24px)" },
      { opacity: 1, transform: "translateX(0)" }
    ],
    { duration: 420, easing: "cubic-bezier(.16,1,.3,1)", delay: 120, fill: "both" }
  );
}

function openPhotoModal(photoId, sourceCard) {
  const memory = photoMemories[photoId];
  if (!photoModal) {
    return;
  }

  const image = sourceCard?.querySelector("img");
  const cardDate = sourceCard?.querySelector(".photo-date")?.textContent?.trim();
  const cardLocation = sourceCard?.querySelector(".photo-location")?.textContent?.trim();
  const metaText = [cardDate || memory?.date, cardLocation || memory?.location].filter(Boolean).join(" · ");

  photoModalImage.src = image?.getAttribute("src") || "./assets/image.png";
  photoModalImage.alt = image?.getAttribute("alt") || "放大的生日照片";
  photoModalMeta.textContent = metaText;
  photoModalTitle.textContent = memory?.title || "这一张我记得很清楚。";
  photoModalText.textContent = memory?.note || "这是一段只属于你们的回忆。";
  pulseFromSource(sourceCard);
  openOverlay(photoModal);
  animatePhotoZoomFromCard(sourceCard);
}

function openFandomModal(key, sourcePlanet) {
  const data = fandomMessages[key];
  if (!data || !fandomModal) {
    return;
  }

  fandomModal.dataset.theme = data.theme;
  fandomLabel.textContent = data.label;
  fandomTitle.textContent = data.title;
  fandomWishes.innerHTML = data.wishes.map((wish) => `<p>${wish}</p>`).join("");
  if (fandomMedia) {
    if (data.video) {
      const splitClass = data.videoAlphaSplit ? " fandom-video-split" : "";
      const fallbackImage = Array.isArray(data.image) ? data.image[0] : (data.image || "./assets/image.png");
      const fallbackAlt = Array.isArray(data.imageAlt) ? data.imageAlt[0] : (data.imageAlt || `${data.label} 图片`);
      fandomMedia.innerHTML = `<video class="fandom-video${splitClass}" src="${data.video}" autoplay loop muted playsinline></video>`;
      const video = fandomMedia.querySelector(".fandom-video");
      video?.addEventListener("error", () => {
        fandomMedia.innerHTML = `<img class="fandom-image" src="${fallbackImage}" alt="${fallbackAlt}" loading="lazy" />`;
      }, { once: true });
    } else {
      const images = Array.isArray(data.image) ? data.image : [data.image || "./assets/image.png"];
      const alts = Array.isArray(data.imageAlt) ? data.imageAlt : [data.imageAlt || `${data.label} 图片`];
      fandomMedia.innerHTML = images
        .map((src, i) => `<img class="fandom-image" src="${src}" alt="${alts[i] ?? alts[0]}" loading="lazy" />`)
        .join("");
    }
  }
  pulseFromSource(sourcePlanet);
  openOverlay(fandomModal);
  fandomModal.querySelector(".fandom-modal-shell")?.animate(
    [
      { opacity: 0, transform: "scale(0.92) translateY(24px)" },
      { opacity: 1, transform: "scale(1) translateY(0)" }
    ],
    { duration: 520, easing: "cubic-bezier(.16,1,.3,1)" }
  );
  showToast("一颗行星被点亮了。");
}

function getSummonPoint(event) {
  const rect = summonCanvas.getBoundingClientRect();
  const scaleX = summonCanvas.width / rect.width;
  const scaleY = summonCanvas.height / rect.height;

  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
}

function clearSummonCanvas() {
  if (!summonCanvas) {
    return;
  }

  const summonCtx = summonCanvas.getContext("2d");
  summonCtx.clearRect(0, 0, summonCanvas.width, summonCanvas.height);
  summonCtx.save();
  summonCtx.strokeStyle = "rgba(255, 244, 207, 0.24)";
  summonCtx.lineWidth = 2;
  summonCtx.setLineDash([14, 18]);
  summonCtx.beginPath();
  summonCtx.arc(summonCanvas.width / 2, summonCanvas.height / 2, summonCanvas.width * 0.36, 0, Math.PI * 2);
  summonCtx.stroke();
  summonCtx.restore();
}

function openSummonOverlay() {
  if (!summonOverlay || gachaBusy || summoningActive) {
    return;
  }

  summoningActive = true;
  summonStrokeStarted = false;
  summonOverlay.classList.remove("is-casting");
  summonOverlay.classList.add("is-open");
  summonOverlay.setAttribute("aria-hidden", "false");
  if (summonCopy) {
    summonCopy.textContent = "在符咒上画一笔，松手后召唤生日祝福。";
  }
  clearSummonCanvas();
  showToast("符咒已经铺好。");
}

function closeSummonOverlay() {
  if (!summonOverlay || summonOverlay.classList.contains("is-casting")) {
    return;
  }

  summonOverlay.classList.remove("is-open");
  summonOverlay.setAttribute("aria-hidden", "true");
  summoningActive = false;
  drawingSummon = false;
  summonStrokeStarted = false;
}

function startSummonStroke(event) {
  if (!summonCanvas || !summoningActive || summonOverlay.classList.contains("is-casting")) {
    return;
  }

  event.preventDefault();
  drawingSummon = true;
  summonStrokeStarted = true;
  summonCanvas.setPointerCapture?.(event.pointerId);
  const point = getSummonPoint(event);
  summonLastX = point.x;
  summonLastY = point.y;

  const summonCtx = summonCanvas.getContext("2d");
  summonCtx.save();
  summonCtx.fillStyle = "rgba(255, 244, 207, 0.86)";
  summonCtx.shadowColor = "rgba(255, 226, 142, 0.9)";
  summonCtx.shadowBlur = 22;
  summonCtx.beginPath();
  summonCtx.arc(point.x, point.y, 7, 0, Math.PI * 2);
  summonCtx.fill();
  summonCtx.restore();
}

function drawSummonStroke(event) {
  if (!drawingSummon || !summonCanvas) {
    return;
  }

  event.preventDefault();
  const point = getSummonPoint(event);
  const summonCtx = summonCanvas.getContext("2d");
  summonCtx.save();
  summonCtx.lineCap = "round";
  summonCtx.lineJoin = "round";
  summonCtx.lineWidth = 18;
  summonCtx.strokeStyle = "rgba(255, 244, 207, 0.92)";
  summonCtx.shadowColor = "rgba(255, 226, 142, 0.92)";
  summonCtx.shadowBlur = 22;
  summonCtx.beginPath();
  summonCtx.moveTo(summonLastX, summonLastY);
  summonCtx.lineTo(point.x, point.y);
  summonCtx.stroke();
  summonCtx.restore();
  summonLastX = point.x;
  summonLastY = point.y;
}

function castSummonSpell() {
  if (!summoningActive || !summonOverlay || summonOverlay.classList.contains("is-casting")) {
    return;
  }

  if (!summonStrokeStarted) {
    closeSummonOverlay();
    return;
  }

  drawingSummon = false;
  summonOverlay.classList.add("is-casting");
  if (summonCopy) {
    summonCopy.textContent = "符咒回应了。";
  }
  showToast("召唤阵亮起来了。");

  setTimeout(() => {
    summonOverlay.classList.remove("is-open", "is-casting");
    summonOverlay.setAttribute("aria-hidden", "true");
    summoningActive = false;
    drawGachaCard();
  }, 980);
}

function drawGachaCard() {
  if (gachaBusy || !gachaResult) {
    return;
  }

  gachaBusy = true;
  const blessing = gachaBlessings[Math.floor(Math.random() * gachaBlessings.length)];
  gachaResult.dataset.rarity = blessing.tier;
  gachaResult.classList.remove("is-flipped");
  gachaResult.classList.add("is-drawing");

  if (gachaButton) {
    gachaButton.disabled = true;
  }

  showToast(blessing.tier === "gold" ? "金色轨迹出现了。" : "蓝色轨迹展开中。");
  makeConfetti(window.innerWidth * 0.5, window.innerHeight * 0.62, blessing.tier === "gold" ? 120 : 78);

  setTimeout(() => {
    gachaRarity.textContent = blessing.rarity;
    gachaTitle.textContent = blessing.title;
    gachaBody.textContent = blessing.body;
    gachaSignature.textContent = blessing.signature;
    gachaResult.classList.add("is-flipped");
  }, 720);

  setTimeout(() => {
    gachaResult.classList.remove("is-drawing");
    if (gachaButton) {
      gachaButton.disabled = false;
    }
    gachaBusy = false;
  }, 1480);
}

function setupLetterReveal() {
  const letterObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        letterLines.forEach((line, index) => {
          line.style.transitionDelay = `${index * 280}ms`;
          line.classList.add("visible");
        });
        letterObserver.disconnect();
      }
    },
    { threshold: 0.36 }
  );

  const letterSection = document.querySelector(".letter-section");
  if (letterSection) {
    letterObserver.observe(letterSection);
  }
}

window.addEventListener("message", (event) => {
  if (event.data?.type === "saturn-camera-request") {
    syncSaturnCameraStream();
  }
});

window.addEventListener("resize", resizeCanvas);

window.addEventListener("pointermove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (document.body.classList.contains("is-locked") && !nebulaUnlocked) {
    if (draggingGlow) {
      setGlowTargetFromPointer(event, 0.9);
    } else if (isNearCandleGlow(event)) {
      setGlowTargetFromPointer(event, 0.28);
    } else {
      glowTargetX = 0;
      glowTargetY = 0;
    }
  }

  if (draggingNebula) {
    return;
  }

  if (activePointerId !== event.pointerId) {
    return;
  }

  const dxFromStart = event.clientX - pointerStartX;
  const dyFromStart = event.clientY - pointerStartY;
  const movement = Math.hypot(dxFromStart, dyFromStart);

  if (!pointerDragged && movement > 8) {
    pointerDragged = true;
  }

  if (pointerDragged && saturnMode === "bg") {
    const dx = event.clientX - pointerLastX;
    const dy = event.clientY - pointerLastY;

    if (!saturnDragActive) {
      saturnDragActive = true;
      syncSaturnDrag(dx, dy, "start");
    } else {
      syncSaturnDrag(dx, dy, "move");
    }
  }

  pointerLastX = event.clientX;
  pointerLastY = event.clientY;
});

window.addEventListener("pointerdown", (event) => {
  const target = event.target;
  const isControl = target.closest("button, a");
  const inNebula = target === nebulaCanvas;
  const locked = document.body.classList.contains("is-locked") && !nebulaUnlocked;
  let startedGlowDrag = false;

  if (nebulaUnlocked && inNebula) {
    draggingNebula = true;
    lastDragX = event.clientX;
    lastDragY = event.clientY;
    nebulaCanvas.setPointerCapture?.(event.pointerId);
  }

  if (locked && isNearCandleGlow(event)) {
    draggingGlow = true;
    startedGlowDrag = true;
    singleCandle.classList.add("is-jelly");
    setGlowTargetFromPointer(event, 0.95);
  }

  if (!isControl && !startedGlowDrag && !inNebula) {
    activePointerId = event.pointerId;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    pointerLastX = event.clientX;
    pointerLastY = event.clientY;
    pointerDragged = false;
    saturnDragActive = false;
  }

  if (!isControl) {
    document.body.classList.add("cursor-active");
    setTimeout(() => document.body.classList.remove("cursor-active"), 180);
  }
});

window.addEventListener("pointerup", (event) => {
  if (draggingGlow) {
    releaseGlow();
  }

  if (draggingNebula) {
    draggingNebula = false;
  }

  if (activePointerId === event.pointerId) {
    if (saturnDragActive) {
      syncSaturnDrag(0, 0, "end");
    } else if (!pointerDragged) {
      const target = event.target;
      const isControl = target.closest("button, a");
      const insideOverlay = target.closest(".overlay-layer.is-open");

      if (!isControl && !insideOverlay) {
        lightWish(event.clientX, event.clientY, Boolean(target.closest("[data-burst='big']")));
      }
    }

    resetPointerDragState();
  }
});

window.addEventListener("pointercancel", () => {
  releaseGlow();
  draggingNebula = false;

  if (saturnDragActive) {
    syncSaturnDrag(0, 0, "end");
  }

  resetPointerDragState();
});

nebulaCanvas.addEventListener("pointermove", (event) => {
  if (!draggingNebula) return;
  const dx = event.clientX - lastDragX;
  const dy = event.clientY - lastDragY;
  targetRotationY += dx * 0.006;
  targetRotationX += dy * 0.004;
  targetRotationX = Math.max(-0.9, Math.min(0.65, targetRotationX));
  lastDragX = event.clientX;
  lastDragY = event.clientY;
});

nebulaCanvas.addEventListener("pointerup", () => {
  draggingNebula = false;
});

nebulaCanvas.addEventListener("pointercancel", () => {
  draggingNebula = false;
});

document.querySelectorAll("[data-burst='big']").forEach((button) => {
  button.addEventListener("click", () => {
    cake.classList.add("wish-made");
    setTimeout(() => cake.classList.remove("wish-made"), 2200);
  });
});

cake.addEventListener("click", (event) => {
  if (!heroCandleLit) {
    event.preventDefault();
    return;
  }

  cake.classList.add("wish-made");
  showToast("蓝色蜡烛吹灭了，愿望会保密。");
  makeConfetti(event.clientX, event.clientY, 96);
  setTimeout(() => cake.classList.remove("wish-made"), 2600);
});

cake.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse" && event.button !== 0) {
    return;
  }

  event.preventDefault();
  cake.setPointerCapture?.(event.pointerId);
  beginHeroHold();
});

cake.addEventListener("pointerup", (event) => {
  cake.releasePointerCapture?.(event.pointerId);
  handleHeroCakePressEnd();
});

cake.addEventListener("pointerleave", () => {
  handleHeroCakePressEnd(false);
});

cake.addEventListener("pointercancel", () => {
  handleHeroCakePressEnd(false);
});

cake.addEventListener("keydown", (event) => {
  if (event.repeat || (event.key !== " " && event.key !== "Enter")) {
    return;
  }

  event.preventDefault();
  beginHeroHold();
});

cake.addEventListener("keyup", (event) => {
  if (event.key !== " " && event.key !== "Enter") {
    return;
  }

  event.preventDefault();
  handleHeroCakePressEnd();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && summonOverlay?.classList.contains("is-open")) {
    closeSummonOverlay();
    return;
  }

  if (event.key === "Escape" && activeModal) {
    closeOverlay(activeModal);
    return;
  }

  if (event.key.toLowerCase() === "b") {
    lightWish(window.innerWidth / 2, window.innerHeight * 0.38, true);
  }
});

for (const item of magneticItems) {
  item.addEventListener("pointerenter", () => document.body.classList.add("cursor-active"));
  item.addEventListener("pointerleave", () => {
    document.body.classList.remove("cursor-active");
    item.style.transform = "";
  });
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.045}px, ${y * 0.045}px)`;
  });
}

photoCards.forEach((card) => {
  card.addEventListener("click", () => {
    openPhotoModal(Number(card.dataset.photoId), card);
  });
});

planets.forEach((planet) => {
  planet.addEventListener("click", () => {
    openFandomModal(planet.dataset.fandom, planet);
  });
});

overlayLayer?.addEventListener("click", (event) => {
  if (event.target === overlayLayer) {
    closeOverlay(activeModal);
  }
});

document.querySelectorAll(".overlay-close").forEach((button) => {
  button.addEventListener("click", () => {
    closeOverlay(button.closest(".photo-modal, .fandom-modal"));
  });
});

gachaButton?.addEventListener("click", openSummonOverlay);
summonCancel?.addEventListener("click", closeSummonOverlay);
summonCanvas?.addEventListener("pointerdown", startSummonStroke);
summonCanvas?.addEventListener("pointermove", drawSummonStroke);
summonCanvas?.addEventListener("pointerup", castSummonSpell);
summonCanvas?.addEventListener("pointercancel", closeSummonOverlay);

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    }
  },
  { threshold: 0.16 }
);

for (const item of revealItems) {
  observer.observe(item);
}

if (saturnFrame) {
  const syncWhenReady = () => {
    saturnFrameReady = true;
    syncSaturnMode(saturnStageVisible ? "full" : "bg");
    syncSaturnCameraStream();
    syncSaturnHandScale(1);
  };

  saturnFrame.addEventListener("load", syncWhenReady);

  if (saturnFrame.contentDocument?.readyState === "complete") {
    syncWhenReady();
  }
}

if (saturnStage) {
  const saturnObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        saturnStageVisible = entry.isIntersecting && entry.intersectionRatio >= 0.45;
        if (saturnStageVisible && !saturnExperienceStarted) {
          ensureSaturnExperienceStarted();
        }
        syncSaturnMode(saturnStageVisible ? "full" : "bg");
      }
    },
    { threshold: [0.2, 0.45, 0.7] }
  );

  saturnObserver.observe(saturnStage);
}

setupLetterReveal();
resizeCanvas();
animatePlanetOrbits();
drawConfetti();
if (nebulaEnabled) {
  drawNebula();
}
updateCandleJelly();
animateCursor();
updateScrollSky();
syncSaturnMode("bg");
checkGate();
setInterval(checkGate, 1000);
