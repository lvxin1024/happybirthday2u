const config = window.BIRTHDAY_CONFIG || {};
const unlockAt = Date.parse(`${config.birthdayDate || "2026-07-18"}T00:00:00+08:00`);
const birthdayName = config.birthdayName || "晓彤姐姐";
const birthdayAge = config.birthdayAge || 21;

const canvas = document.querySelector("#confetti-canvas");
const ctx = canvas.getContext("2d");
const nebulaCanvas = document.querySelector("#nebula-canvas");
const nebulaCtx = nebulaCanvas.getContext("2d");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const toast = document.querySelector(".toast");
const cake = document.querySelector(".cake");
const singleCandle = document.querySelector(".single-candle");
const countdownClock = document.querySelector(".countdown-clock");
const beijingTime = document.querySelector(".beijing-time");
const birthdayReveal = document.querySelector(".birthday-reveal");
const magneticItems = document.querySelectorAll(".magnetic");
const revealItems = document.querySelectorAll(".reveal");
const sceneTabs = document.querySelectorAll(".scene-tab");
const sceneDisplay = document.querySelector(".scene-display");
const sceneLabel = document.querySelector(".scene-label");
const sceneTitle = document.querySelector(".scene-title");
const sceneBody = document.querySelector(".scene-body");
const sceneSymbols = document.querySelector(".scene-symbols");
const chapters = document.querySelectorAll(".chapter");

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
  "朋友一直都在"
];

const scenes = {
  six: {
    label: "音乐剧 SIX",
    title: "六位女王把聚光灯递给今天的你。",
    body: "愿你拥有舞台中央的笃定，也拥有谢幕以后被朋友拥抱的松弛。",
    symbols: ["♛", "♛", "♛", "♛", "♛", "♛"],
    toast: "SIX 舞台亮起：今天你是女王。"
  },
  chicago: {
    label: "音乐剧芝加哥",
    title: "爵士灯牌闪烁，生日节拍刚刚好。",
    body: "愿你说话有底气，行动有节奏，连普通一天都像漂亮的开场八拍。",
    symbols: ["JAZZ", "✦", "帽", "椅", "灯"],
    toast: "芝加哥灯牌亮了：给你一点爵士好运。"
  },
  friends: {
    label: "老友记",
    title: "沙发留好，咖啡也热着。",
    body: "愿你永远有可以随时坐下的人，有不用解释也被懂得的快乐。",
    symbols: ["☕", "沙发", "门框", "笑声", "朋友"],
    toast: "老友记彩蛋：朋友席已为你保留。"
  },
  reverse: {
    label: "重返未来：1999",
    title: "雨落进手提箱，时间替你保存快乐。",
    body: "愿过去给你灵感，未来给你回响，而今天给你一场清澈的蓝色雨。",
    symbols: ["1999", "☂", "雨", "箱", "钟"],
    toast: "1999 雨幕开启：愿望被收入手提箱。"
  },
  rusty: {
    label: "锈湖",
    title: "解开蓝色方块，里面是好运。",
    body: "愿生活里的谜题都有线索，难题背后都藏着一枚温柔的钥匙。",
    symbols: ["◆", "湖", "钥", "谜", "方"],
    toast: "锈湖谜题解锁：好运钥匙掉落。"
  },
  onmyoji: {
    label: "阴阳师",
    title: "符咒轻响，把坏天气挡在门外。",
    body: "愿新一岁有人守护，也有自己召唤光亮的能力。",
    symbols: ["☯", "符", "铃", "阵", "守"],
    toast: "阴阳阵已启动：祝福守护中。"
  },
  night: {
    label: "夜幕之下",
    title: "雾散以后，路灯把出口照亮。",
    body: "愿你穿过所有夜色时，都能看见前方有一束专门为你留着的蓝光。",
    symbols: ["月", "雾", "钥", "夜", "灯"],
    toast: "夜幕彩蛋：雾散了，生日灯亮了。"
  }
};

let confetti = [];
let particles = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;
let nebulaProgress = 0;
let nebulaUnlocked = false;
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
  countdownClock.textContent = formatCountdown(unlockAt - Date.now());
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
  createNebulaParticles();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function makeConfetti(x, y, amount = 42) {
  for (let i = 0; i < amount; i += 1) {
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

function switchScene(key, announce = true) {
  const scene = scenes[key];
  if (!scene) return;

  sceneTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.target === key));
  sceneDisplay.dataset.activeScene = key;
  sceneLabel.textContent = scene.label;
  sceneTitle.textContent = scene.title;
  sceneBody.textContent = scene.body;
  sceneSymbols.innerHTML = scene.symbols.map((symbol) => `<span>${symbol}</span>`).join("");
  sceneDisplay.animate(
    [
      { opacity: 0.78, transform: "translateY(10px) scale(0.985)" },
      { opacity: 1, transform: "translateY(0) scale(1)" }
    ],
    { duration: 360, easing: "cubic-bezier(.16,1,.3,1)" }
  );

  if (announce) {
    showToast(scene.toast);
    const rect = sceneDisplay.getBoundingClientRect();
    makeConfetti(rect.left + rect.width * 0.5, rect.top + rect.height * 0.32, 78);
  }
}

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

  if (!startedGlowDrag) {
    lightWish(event.clientX, event.clientY, Boolean(target.closest("[data-burst='big']")));
  }

  if (!isControl) {
    document.body.classList.add("cursor-active");
    setTimeout(() => document.body.classList.remove("cursor-active"), 180);
  }
});

window.addEventListener("pointerup", releaseGlow);
window.addEventListener("pointercancel", releaseGlow);

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
  cake.classList.add("wish-made");
  showToast("蓝色蜡烛吹灭了，愿望会保密。");
  makeConfetti(event.clientX, event.clientY, 96);
  setTimeout(() => cake.classList.remove("wish-made"), 2600);
});

window.addEventListener("keydown", (event) => {
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

sceneTabs.forEach((tab) => {
  tab.addEventListener("click", () => switchScene(tab.dataset.target));
});

chapters.forEach((chapter) => {
  chapter.addEventListener("click", (event) => {
    const sceneKey = chapter.dataset.scene;
    switchScene(sceneKey);
    makeWord(event.clientX, event.clientY);
  });
});

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

resizeCanvas();
drawConfetti();
drawNebula();
updateCandleJelly();
animateCursor();
updateScrollSky();
switchScene("six", false);
checkGate();
setInterval(checkGate, 1000);
