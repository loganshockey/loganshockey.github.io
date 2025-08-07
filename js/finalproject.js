const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
let brushSize = 10;
let brushColor = "rgb(0,0,0)";

let lastX = null;
let lastY = null;


const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");

function updateBrushColor() {
  const r = redSlider.value;
  const g = greenSlider.value;
  const b = blueSlider.value;
  brushColor = `rgb(${r},${g},${b})`;
}

redSlider.addEventListener("input", updateBrushColor);
greenSlider.addEventListener("input", updateBrushColor);
blueSlider.addEventListener("input", updateBrushColor);


canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
});


canvas.addEventListener("mouseup", () => {
  drawing = false;
  lastX = null;
  lastY = null;
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
  lastX = null;
  lastY = null;
});


canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.strokeStyle = brushColor;
  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
});