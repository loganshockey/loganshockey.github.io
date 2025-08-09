
const redSlider = document.getElementById("rSlider");
const greenSlider = document.getElementById("gSlider");
const blueSlider = document.getElementById("bSlider");

const rBox = document.getElementById("rBox");
const gBox = document.getElementById("gBox");
const bBox = document.getElementById("bBox");

const feedbackText = document.getElementById("feedbackText");

let brushColor = `rgb(128,128,128)`;


function updateBrushColor() {
  const r = parseInt(redSlider.value);
  const g = parseInt(greenSlider.value);
  const b = parseInt(blueSlider.value);
  brushColor = `rgb(${r},${g},${b})`;

  rBox.textContent = r;
  gBox.textContent = g;
  bBox.textContent = b;

  rBox.style.backgroundColor = `rgb(${r},0,0)`;
  gBox.style.backgroundColor = `rgb(0,${g},0)`;
  bBox.style.backgroundColor = `rgb(0,0,${b})`;
}

[redSlider, greenSlider, blueSlider].forEach(slider => {
  slider.addEventListener("input", updateBrushColor);
});
updateBrushColor();


function initPaintByNumbers() {
  const svg = document.querySelector("svg");
  if (!svg) {
    console.error("No SVG found!");
    return;
  }

  
  const numberTexts = [...svg.querySelectorAll("text")].filter(t => /^\d+$/.test(t.textContent.trim()));
  numberTexts.forEach(txt => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    txt.setAttribute("fill", `rgb(${r},${g},${b})`);
    txt.dataset.targetColor = `${r},${g},${b}`;
  });

  
  const shapes = svg.querySelectorAll(".paint-region");
  shapes.forEach(shape => {
    const shapeBox = shape.getBBox();
    let closestNum = null;
    let minDist = Infinity;

    numberTexts.forEach(numEl => {
      const numBox = numEl.getBBox();
      const dx = (shapeBox.x + shapeBox.width / 2) - (numBox.x + numBox.width / 2);
      const dy = (shapeBox.y + shapeBox.height / 2) - (numBox.y + numBox.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        closestNum = numEl;
      }
    });

    if (closestNum) {
      shape.dataset.number = closestNum.textContent.trim();
    }
  });

  
  const numberRegions = {};
  shapes.forEach(shape => {
    const num = shape.dataset.number;
    if (num) {
      if (!numberRegions[num]) numberRegions[num] = [];
      numberRegions[num].push(shape);
    }
  });

  const completedNumbers = new Set();

  
  shapes.forEach(shape => {
    shape.addEventListener("click", () => {
      const num = shape.dataset.number;
      if (!num) return;

      
      const currentRGB = [
        parseInt(redSlider.value),
        parseInt(greenSlider.value),
        parseInt(blueSlider.value)
      ];
      shape.setAttribute("fill", `rgb(${currentRGB.join(",")})`);

      const targetTxt = numberTexts.find(t => t.textContent.trim() === num);
      if (!targetTxt) return;

      const targetRGB = targetTxt.dataset.targetColor.split(",").map(Number);

      
      const allPaintedCorrectly = numberRegions[num].every(s => {
        const fill = s.getAttribute("fill");
        if (!fill) return false;
        const match = fill.match(/\d+/g);
        if (!match) return false;
        const rgb = match.map(Number);
        return colorsMatch(rgb, targetRGB, 50);
      });

      if (allPaintedCorrectly && !completedNumbers.has(num)) {
        completedNumbers.add(num);
        unlockKey(num);
        feedbackText.textContent = `Number Unlocked!`;
      } else {
        feedbackText.textContent = `Painted region for number ${num}.`;
      }
    });
  });

  
  function unlockKey(num) {
    const keyEl = document.querySelector(`.key[data-number="${num}"]`);
    if (keyEl) {
      keyEl.classList.remove("locked");
      keyEl.classList.add("unlocked");
    }
  }
}


function colorsMatch(rgb1, rgb2, tolerance) {
  return Math.abs(rgb1[0] - rgb2[0]) <= tolerance &&
         Math.abs(rgb1[1] - rgb2[1]) <= tolerance &&
         Math.abs(rgb1[2] - rgb2[2]) <= tolerance;
}


window.addEventListener("load", initPaintByNumbers);

