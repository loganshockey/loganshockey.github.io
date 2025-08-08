
const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");

const rBox = document.getElementById("rBox");
const gBox = document.getElementById("gBox");
const bBox = document.getElementById("bBox");


function getCurrentColor() {
  return `rgb(${rSlider.value}, ${gSlider.value}, ${bSlider.value})`;
}


function updateColorBoxes() {
  const color = getCurrentColor();
  rBox.textContent = rSlider.value;
  gBox.textContent = gSlider.value;
  bBox.textContent = bSlider.value;

  rBox.style.backgroundColor = color;
  gBox.style.backgroundColor = color;
  bBox.style.backgroundColor = color;
}


function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}


const targetColors = {};


function assignTargetColors() {
  const numberGroups = document.querySelectorAll("g[id^='num-']");

  numberGroups.forEach(group => {
    const targetColor = getRandomColor();

    const children = group.querySelectorAll("*");
    children.forEach(child => {
      child.setAttribute("fill", targetColor);
    });

    const regionId = group.id.replace("num-", "region-");
    targetColors[regionId] = targetColor;
  });
}

function setupPainting() {
  const regions = document.querySelectorAll(".paint-region");

  regions.forEach(region => {
    region.style.cursor = "pointer";

    region.addEventListener("click", () => {
      const color = getCurrentColor();
      region.setAttribute("fill", color);

    });
  });
}

function isColorMatch(userColor, targetColor, tolerance = 30) {
  const [ur, ug, ub] = userColor.match(/\d+/g).map(Number);
  const [tr, tg, tb] = targetColor.match(/\d+/g).map(Number);

  return (
    Math.abs(ur - tr) <= tolerance &&
    Math.abs(ug - tg) <= tolerance &&
    Math.abs(ub - tb) <= tolerance
  );
}


document.addEventListener("DOMContentLoaded", () => {
  updateColorBoxes();
  assignTargetColors();
  setupPainting();

  [rSlider, gSlider, bSlider].forEach(slider =>
    slider.addEventListener("input", updateColorBoxes)
  );
});
