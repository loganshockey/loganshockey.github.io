const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

const redSlider = document.getElementById('red');
const greenSlider = document.getElementById('green');
const blueSlider = document.getElementById('blue');

const redValue = document.getElementById('redValue');
const greenValue = document.getElementById('greenValue');
const blueValue = document.getElementById('blueValue');

const colorPreview = document.getElementById('colorPreview');

let drawing = false;
let brushColor = 'rgb(128, 128, 128)';
const brushSize = 10;

function updateColor() {
  const r = parseInt(redSlider.value);
  const g = parseInt(greenSlider.value);
  const b = parseInt(blueSlider.value);

  redValue.textContent = r;
  greenValue.textContent = g;
  blueValue.textContent = b;

  brushColor = `rgb(${r}, ${g}, ${b})`;
  colorPreview.style.backgroundColor = brushColor;
}


canvas.addEventListener('mousedown', e => {
  drawing = true;
  draw(e);
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (drawing = false));
canvas.addEventListener('mouseleave', () => (drawing = false));

function draw(e) {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.fillStyle = brushColor;
  ctx.beginPath();
  ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
  ctx.fill();
}


redSlider.addEventListener('input', updateColor);
greenSlider.addEventListener('input', updateColor);
blueSlider.addEventListener('input', updateColor);


updateColor();