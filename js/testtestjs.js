const TOLERANCE = 50;


const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");

const rBox = document.getElementById("rBox");
const gBox = document.getElementById("gBox");
const bBox = document.getElementById("bBox");

const feedbackText = document.getElementById("feedbackText");


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
updateColorBoxes();


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

function centroidOfBBox(el) {
  const b = el.getBBox();
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
}

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
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
  if (!svg) {
    console.error("SVG not found in .svg-container");
    return;
  }

  
  const numberGroups = [...svg.querySelectorAll(`g[id^="num-"]`)];
  numberGroups.forEach(group => {
    
    const id = group.id || "";
    const match = id.match(/\d/);
    if (!match) return;
    const digit = match[0];

    
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

  
  const numGroupInfo = numberGroups.map(g => ({
    el: g,
    digit: (g.id.match(/\d/) || [""])[0],
    center: centroidOfBBox(g),
  }));

  regionPaths.forEach(region => {
    const rc = centroidOfBBox(region);
    
    let nearest = null;
    let best = Infinity;
    numGroupInfo.forEach(info => {
      if (!info.digit) return;
      const d = distance(rc, info.center);
      if (d < best) {
        best = d;
        nearest = info;
      }
    });

    if (!nearest) return;

    
    region.dataset.digit = nearest.digit;

    if (!regionsByDigit[nearest.digit]) regionsByDigit[nearest.digit] = [];
    regionsByDigit[nearest.digit].push(region);
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


window.addEventListener("load", () => {
  updateColorBoxes();
  initPaintByNumbers();
});
