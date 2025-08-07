const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");

const feedbackText = document.getElementById("feedbackText");


const svgRegions = document.querySelectorAll("svg [data-digit]");
const unlockedDigitsContainer = document.getElementById("digitsList");


const unlockedDigits = new Set();


const brushSize = 20;

let isPainting = false;
let lastX = 0;
let lastY = 0;

function rgbString(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}


canvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => {
  isPainting = false;
});
canvas.addEventListener("mouseout", () => {
  isPainting = false;
});
canvas.addEventListener("mousemove", (e) => {
  if (!isPainting) return;
  const r = parseInt(rSlider.value);
  const g = parseInt(gSlider.value);
  const b = parseInt(bSlider.value);

  ctx.strokeStyle = rgbString(r, g, b);
  ctx.lineWidth = brushSize;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
});


function parseRGB(rgbStr) {
  const vals = rgbStr.match(/\d+/g);
  return vals ? { r: +vals[0], g: +vals[1], b: +vals[2] } : null;
}

const COLOR_TOLERANCE = 25;

const digitTargetColors = {
  7: { r: 255, g: 0, b: 0 },   
  3: { r: 0, g: 255, b: 0 },   
  1: { r: 0, g: 0, b: 255 },   
};


function colorDifference(c1, c2) {
  return Math.abs(c1.r - c2.r) + Math.abs(c1.g - c2.g) + Math.abs(c1.b - c2.b);
}

function isColorMatch(paintedColor, digit) {
  const target = digitTargetColors[digit];
  if (!target) return false;
  return colorDifference(paintedColor, target) <= COLOR_TOLERANCE;
}

function updateUnlockedDigitsDisplay() {
  if (unlockedDigits.size === 0) {
    unlockedDigitsContainer.textContent = "Digit Locked";
  } else {
    unlockedDigitsContainer.textContent = Array.from(unlockedDigits).sort().join(", ");
  }
}


svgRegions.forEach((region) => {
  region.addEventListener("click", () => {
    const r = parseInt(rSlider.value);
    const g = parseInt(gSlider.value);
    const b = parseInt(bSlider.value);
    const paintColor = rgbString(r, g, b);


    region.setAttribute("fill", paintColor);

    


  });
});

updateUnlockedDigitsDisplay();