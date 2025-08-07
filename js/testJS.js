const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");
const feedback = document.getElementById("feedback");

let painting = false;

// Generate a random target color
const targetColor = {
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256)
};

console.log("Target color (shhh!):", targetColor); // Remove this line to hide target color

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
  const current = getColor();
  const { match, totalDiff } = colorMatch(current, targetColor, 10);

  if (match) {
    feedback.textContent = `🎯 Match found! RGB(${current.r}, ${current.g}, ${current.b})`;
    feedback.style.color = "green";
  } else if (totalDiff < 60) {
    feedback.textContent = `Close! Total color difference: ${totalDiff}`;
    feedback.style.color = "orange";
  } else {
    feedback.textContent = `Not quite. Total color difference: ${totalDiff}`;
    feedback.style.color = "red";
  }
};

const paint = (e) => {
  if (!painting) return;

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

rSlider.addEventListener("input", updateFeedback);
gSlider.addEventListener("input", updateFeedback);
bSlider.addEventListener("input", updateFeedback);

updateFeedback();