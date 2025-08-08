const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");

const rBox = document.getElementById("rBox");
const gBox = document.getElementById("gBox");
const bBox = document.getElementById("bBox");

const feedbackText = document.getElementById("feedbackText");
const targetColorBox = document.getElementById("targetColorBox");

let isPainting = false;
let paintedOnce = false;
let lastX = 0;
let lastY = 0;


const targetColor = {
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256),
};
targetColorBox.style.backgroundColor = `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`;


const digitTargetColors = {};
document.querySelectorAll('[id^="num-"]').forEach(num => {
  const id = num.id.replace("num-", "");
  const color = {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  };
  digitTargetColors[id] = color;
  num.setAttribute("fill", `rgb(${color.r}, ${color.g}, ${color.b})`);
});


function updateColorBoxes() {
  rBox.style.backgroundColor = `rgb(${rSlider.value}, 0, 0)`;
  gBox.style.backgroundColor = `rgb(0, ${gSlider.value}, 0)`;
  bBox.style.backgroundColor = `rgb(0, 0, ${bSlider.value})`;
}
updateColorBoxes();
[rSlider, gSlider, bSlider].forEach(slider =>
  slider.addEventListener("input", updateColorBoxes)
);


function startPainting(e) {
  isPainting = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}
function stopPainting() {
  isPainting = false;
}
function paint(e) {
  if (!isPainting) return;
  const r = parseInt(rSlider.value);
  const g = parseInt(gSlider.value);
  const b = parseInt(bSlider.value);
  const color = `rgb(${r}, ${g}, ${b})`;

  ctx.strokeStyle = color;
  ctx.lineWidth = 20;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  paintedOnce = true;

  const diffR = Math.abs(r - targetColor.r);
  const diffG = Math.abs(g - targetColor.g);
  const diffB = Math.abs(b - targetColor.b);
  const totalDiff = diffR + diffG + diffB;

  const threshold = 90;
  if (totalDiff <= threshold) {
    feedbackText.textContent = `Color Match! Value Difference: ${totalDiff}`;
  } else {
    feedbackText.textContent = `Try Again! Value Difference: ${totalDiff}`;
  }
}

canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseout", stopPainting);
canvas.addEventListener("mousemove", paint);

// SVG click to paint
document.querySelectorAll('[id^="region-"]').forEach(region => {
  region.addEventListener("click", () => {
    const id = region.id.replace("region-", "");
    const r = parseInt(rSlider.value);
    const g = parseInt(gSlider.value);
    const b = parseInt(bSlider.value);

    region.setAttribute("fill", `rgb(${r},${g},${b})`);

    const target = digitTargetColors[id];
    const diffR = Math.abs(r - target.r);
    const diffG = Math.abs(g - target.g);
    const diffB = Math.abs(b - target.b);
    const totalDiff = diffR + diffG + diffB;
    const threshold = 90;

    if (totalDiff <= threshold) {
      alert(`Digit ${id} unlocked!`);
      localStorage.setItem(`unlocked-${id}`, "true");
    } else {
      alert(`Color Difference: ${totalDiff}`);
    }
  });
});

