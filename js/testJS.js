const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
let painting = false;

const rSlider = document.getElementById('rRange');
const gSlider = document.getElementById('gRange');
const bSlider = document.getElementById('bRange');

const rBox = document.getElementById('rBox');
const gBox = document.getElementById('gBox');
const bBox = document.getElementById('bBox');

const feedback = document.getElementById('feedback');


const targetColor = {
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256),
};


const targetBox = document.getElementById('targetColor');
targetBox.style.backgroundColor = `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`;

function updateColorBoxes() {
  rBox.style.backgroundColor = `rgb(${rSlider.value}, 0, 0)`;
  gBox.style.backgroundColor = `rgb(0, ${gSlider.value}, 0)`;
  bBox.style.backgroundColor = `rgb(0, 0, ${bSlider.value})`;
}

updateColorBoxes();

function getBrushColor() {
  return `rgb(${rSlider.value}, ${gSlider.value}, ${bSlider.value})`;
}

function getCurrentRGBObject() {
  return {
    r: parseInt(rSlider.value),
    g: parseInt(gSlider.value),
    b: parseInt(bSlider.value),
  };
}

canvas.addEventListener('mousedown', () => {
  painting = true;
});

canvas.addEventListener('mouseup', () => {
  painting = false;
  ctx.beginPath();
  showColorFeedback(); 
});

canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!painting) return;
  const rect = canvas.getBoundingClientRect();
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.strokeStyle = getBrushColor();

  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

[rSlider, gSlider, bSlider].forEach(slider => {
  slider.addEventListener('input', updateColorBoxes);
});

function showColorFeedback() {
  const current = getCurrentRGBObject();
  const diff = Math.sqrt(
    Math.pow(current.r - targetColor.r, 2) +
    Math.pow(current.g - targetColor.g, 2) +
    Math.pow(current.b - targetColor.b, 2)
  );

  const tolerance = 100;

  const message =
    diff < tolerance
      ? `Color Matched! rgb(${current.r}, ${current.g}, ${current.b})`
      : `Try Again: rgb(${current.r}, ${current.g}, ${current.b})`;

  feedback.textContent = message;
}