const TOLERANCE = 50;

const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");
const rBox = document.getElementById("rBox");
const gBox = document.getElementById("gBox");
const bBox = document.getElementById("bBox");
const feedbackText = document.getElementById("feedbackText");

const entry = document.getElementById("phoneEntry");
const backspaceBtn = document.getElementById("backspaceBtn");
const submitBtn = document.getElementById("submitPhone");

const digitTargetColor = {};
const numberGroupsByDigit = {};
const regionsByDigit = {};
const unlockedDigits = new Set();

function currentRGB() {
  return [
    parseInt(rSlider.value, 10),
    parseInt(gSlider.value, 10),
    parseInt(bSlider.value, 10),
  ];
}

function updateColorBoxes() {
  const [r, g, b] = currentRGB();
  rBox.textContent = r;
  gBox.textContent = g;
  bBox.textContent = b;
  rBox.style.backgroundColor = `rgb(${r},0,0)`;
  gBox.style.backgroundColor = `rgb(0,${g},0)`;
  bBox.style.backgroundColor = `rgb(0,0,${b})`;
}

[rSlider, gSlider, bSlider].forEach(s => s.addEventListener("input", updateColorBoxes));

function parseRgbString(s) {
  const m = s && s.match(/\d+/g);
  return m ? m.map(Number) : null;
}

function withinTolerance(rgb1, rgb2, tol = TOLERANCE) {
  return (
    Math.abs(rgb1[0] - rgb2[0]) <= tol &&
    Math.abs(rgb1[1] - rgb2[1]) <= tol &&
    Math.abs(rgb1[2] - rgb2[2]) <= tol
  );
}

function setFeedback(msg) {
  feedbackText.textContent = msg;
}

function applyUnlockedStyles() {
  unlockedDigits.forEach(digit => {
    const btn = document.querySelector(`.key[data-digit="${digit}"]`);
    if (btn) {
      btn.classList.remove("locked");
      btn.classList.add("unlocked");
      btn.disabled = false;
    }
  });
}

function saveUnlocked() {
  localStorage.setItem("unlockedDigits", JSON.stringify([...unlockedDigits]));
}

function loadUnlocked() {
  try {
    const arr = JSON.parse(localStorage.getItem("unlockedDigits") || "[]");
    arr.forEach(d => unlockedDigits.add(String(d)));
  } catch (_) {}
}

function initPaintByNumbers() {
  const svg = document.querySelector(".svg-container svg");
  if (!svg) return;

  const numberGroups = [...svg.querySelectorAll(`g[id^="num-"]`)];
  numberGroups.forEach(group => {
    const id = group.id || "";
    const match = id.match(/num-(\d)/);
    if (!match) return;
    const digit = match[1];
    if (!digitTargetColor[digit]) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      digitTargetColor[digit] = [r, g, b];
    }
    const [r, g, b] = digitTargetColor[digit];
    group.querySelectorAll("path").forEach(p => p.setAttribute("fill", `rgb(${r},${g},${b})`));
    if (!numberGroupsByDigit[digit]) numberGroupsByDigit[digit] = [];
    numberGroupsByDigit[digit].push(group);
  });

  const regionPaths = [...svg.querySelectorAll(".paint-region")];
  regionPaths.forEach(region => {
    const id = region.id || "";
    const m = id.match(/region-(\d)/);
    if (!m) return;
    const digit = m[1];
    region.dataset.digit = digit;
    if (!regionsByDigit[digit]) regionsByDigit[digit] = [];
    regionsByDigit[digit].push(region);
  });

  loadUnlocked();
  applyUnlockedStyles();

  regionPaths.forEach(region => {
    region.addEventListener("click", () => {
      const digit = region.dataset.digit;
      if (!digit) return;
      const [r, g, b] = currentRGB();
      region.setAttribute("fill", `rgb(${r},${g},${b})`);
      setFeedback(`Painted region for number ${digit}.`);
      const target = digitTargetColor[digit];
      const allGood = regionsByDigit[digit].every(rEl => {
        const fill = rEl.getAttribute("fill");
        const rgb = parseRgbString(fill);
        return rgb && withinTolerance(rgb, target, TOLERANCE);
      });
      if (allGood && !unlockedDigits.has(digit)) {
        unlockedDigits.add(digit);
        saveUnlocked();
        applyUnlockedStyles();
        setFeedback(`Number ${digit} Unlocked!`);
      }
    });
  });
}

function stripNonDigits(s) {
  return (s || "").replace(/\D/g, "");
}

function formatPhone(digits) {
  const d = stripNonDigits(digits).slice(0, 10);
  const a = d.slice(0,3);
  const b = d.slice(3,6);
  const c = d.slice(6,10);
  if (d.length <= 3) return a;
  if (d.length <= 6) return `(${a}) ${b}`;
  return `(${a}) ${b}-${c}`;
}

function setEntryDigits(digits) {
  const clean = stripNonDigits(digits).slice(0, 10);
  entry.value = formatPhone(clean);
  submitBtn.disabled = clean.length !== 10;
}

document.querySelectorAll(".key").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;
    const d = btn.getAttribute("data-digit");
    if (!/^\d$/.test(d)) return;
    const current = stripNonDigits(entry.value);
    if (current.length >= 10) return;
    setEntryDigits(current + d);
  });
});

backspaceBtn.addEventListener("click", () => {
  const current = stripNonDigits(entry.value);
  setEntryDigits(current.slice(0, -1));
});

submitBtn.addEventListener("click", () => {
  const digits = stripNonDigits(entry.value);
  if (digits.length === 10) {
    console.log("Submitted phone:", digits);
    feedbackText.textContent = `Submitted: ${formatPhone(digits)}`;
  }
});

window.addEventListener("load", () => {
  updateColorBoxes();
  initPaintByNumbers();
});
