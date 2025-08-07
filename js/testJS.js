const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");

const rPreview = document.getElementById("rPreview");
const gPreview = document.getElementById("gPreview");
const bPreview = document.getElementById("bPreview");

const feedback = document.getElementById("feedback");
const targetColorBox = document.getElementById("targetColorBox");

let painting = false;
let hasPainted = false;


const targetColor = {
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256)
};


targetColorBox.style.backgroundColor = `rgb(${targetColor.r},${targetColor.g},${targetColor.b})`;

const updatePreviewColors = () => {
  rPreview.style.backgroundColor = `rgb(${rSlider.value},0,0)`;
  gPreview.style.backgroundColor = `rgb(0,${gSlider.value},0)`;
  bPreview.style.backgroundColor = `rgb(0,0,${bSlider.value})`;
};

const getColor = () => {
  return {
    r: parseInt(rSlider.value),
    g: parseInt(gSlider.value),
    b: parseInt(bSlider.value)
  };
};

const colorMatch = (current, target, tolerance = 10) => {
  const diffR = Math.abs(current.r - target.r);
  const diffG = Math.abs(current.g - target.g);
  const diffB = Math.abs(current.b - target.b);

  const totalDiff = diffR + diffG + diffB;

  if (diffR <= tolerance && diffG <= tolerance && diffB <= tolerance) {
    return { match: true, totalDiff };
  }

  return { match: false, totalDiff };
};

const updateFeedback = () => {
  if (!hasPainted) {
    feedback.textContent = ""; 
    return;
  }

  const current = getColor();
  const { match, totalDiff } = colorMatch(current, targetColor, 10);

  if (match) {
    feedback.textContent = `Match found!`;
    feedback.style.color = "green";
  } else if (totalDiff < 60) {
    feedback.textContent = `Getting Closer`;
    feedback.style.color = "orange";
  } else {
    feedback.textContent = `Try Again`;
    feedback.style.color = "red";
  }
};

const paint = (e) => {
  if (!painting) return;

  if (!hasPainted) {
    hasPainted = true;
  }

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const currentColor = getColor();
  ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fill();

  updateFeedback();
};

canvas.addEventListener("mousedown", () => painting = true);
canvas.addEventListener("mouseup", () => painting = false);
canvas.addEventListener("mouseleave", () => painting = false);
canvas.addEventListener("mousemove", paint);

rSlider.addEventListener("input", () => {
  updatePreviewColors();
  if (hasPainted) updateFeedback();
});

gSlider.addEventListener("input", () => {
  updatePreviewColors();
  if (hasPainted) updateFeedback();
});

bSlider.addEventListener("input", () => {
  updatePreviewColors();
  if (hasPainted) updateFeedback();
});


updatePreviewColors();
updateFeedback();