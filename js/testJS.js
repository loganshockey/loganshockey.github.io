const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

const rSlider = document.getElementById('rSlider');
const gSlider = document.getElementById('gSlider');
const bSlider = document.getElementById('bSlider');
const feedback = document.getElementById('feedback');

const rBox = document.getElementById('rBox');
const gBox = document.getElementById('gBox');
const bBox = document.getElementById('bBox');

const targetColorBox = document.getElementById('targetColor');
let hasPainted = false;


const targetColor = {
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256)
};
targetColorBox.style.backgroundColor = `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`;

let painting = false;

function updateSliderBoxes() {
  rBox.style.backgroundColor = `rgb(${rSlider.value},0,0)`;
  gBox.style.backgroundColor = `rgb(0,${gSlider.value},0)`;
  bBox.style.backgroundColor = `rgb(0,0,${bSlider.value})`;
}
updateSliderBoxes();

canvas.addEventListener('mousedown', () => {
  painting = true;
});
canvas.addEventListener('mouseup', () => {
  painting = false;
});
canvas.addEventListener('mousemove', paint);

function paint(e) {
  if (!painting) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const r = parseInt(rSlider.value);
  const g = parseInt(gSlider.value);
  const b = parseInt(bSlider.value);

  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fillRect(x, y, 10, 10);

  if (!hasPainted) {
    hasPainted = true;
  }

  
  const diff =
    Math.abs(r - targetColor.r) +
    Math.abs(g - targetColor.g) +
    Math.abs(b - targetColor.b);

  const threshold = 90; 

  let message = `Your color: rgb(${r}, ${g}, ${b}) — `;
  message += `Difference from target: ${diff}`;

  if (diff <= threshold) {
    message += ` Color Matched!`;
  } else {
    message += ` - Try again!`;
  }

  feedback.textContent = message;
}


rSlider.addEventListener('input', updateSliderBoxes);
gSlider.addEventListener('input', updateSliderBoxes);
bSlider.addEventListener('input', updateSliderBoxes);