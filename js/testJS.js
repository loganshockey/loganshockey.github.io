const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

const rRange = document.getElementById('rRange');
const gRange = document.getElementById('gRange');
const bRange = document.getElementById('bRange');

const rBox = document.getElementById('rBox');
const gBox = document.getElementById('gBox');
const bBox = document.getElementById('bBox');

const targetColorBox = document.getElementById('targetColor');
const feedback = document.getElementById('feedback');

let painting = false;
let hasPainted = false;


const targetColor = {
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256)
};

targetColorBox.style.backgroundColor = `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})`;


function updateColorBoxes() {
  rBox.style.backgroundColor = `rgb(${rRange.value}, 0, 0)`;
  gBox.style.backgroundColor = `rgb(0, ${gRange.value}, 0)`;
  bBox.style.backgroundColor = `rgb(0, 0, ${bRange.value})`;
}


function draw(e) {
  if (!painting) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const r = parseInt(rRange.value);
  const g = parseInt(gRange.value);
  const b = parseInt(bRange.value);

  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fill();

  if (!hasPainted) {
    hasPainted = true;
    checkColorMatch(r, g, b);
  }
}


function colorDifference(c1, c2) {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
}

function checkColorMatch(r, g, b) {
  const diff = colorDifference({ r, g, b }, targetColor);
  if (diff < 30) {
    feedback.textContent = 'Color Matched! (${current.r}, ${current.g}, ${current.b})';
  } else {
    feedback.textContent = 'Try again: ${totalDiff}';
  }
}


canvas.addEventListener('mousedown', (e) => {
  painting = true;
  draw(e);
});

canvas.addEventListener('mouseup', () => {
  painting = false;
});

canvas.addEventListener('mousemove', draw);


[rRange, gRange, bRange].forEach(range => {
  range.addEventListener('input', updateColorBoxes);
});

updateColorBoxes();