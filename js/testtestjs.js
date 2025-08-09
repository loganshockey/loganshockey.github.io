const COLOR_TOLERANCE = 50;


const regionData = {};

const numberColors = {};

const progress = {};

function initNumberColors() {
  document.querySelectorAll("text").forEach(txt => {
    const number = txt.textContent.trim();
    if (!/^\d+$/.test(number)) return; 

    
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    txt.setAttribute("fill", `rgb(${r},${g},${b})`);

    numberColors[number] = [r, g, b];
    progress[number] = { total: 0, painted: 0, unlocked: false };
  });
}


function initRegionData() {
  document.querySelectorAll(".paint-region").forEach(region => {
    const number = region.getAttribute("data-number");
    if (!number) return;

    regionData[region.id] = { number, painted: false };
    progress[number].total++;
  });
}


const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");
const rBox = document.getElementById("rBox");
const gBox = document.getElementById("gBox");
const bBox = document.getElementById("bBox");

function updateSliderBoxes() {
  rBox.textContent = rSlider.value;
  gBox.textContent = gSlider.value;
  bBox.textContent = bSlider.value;
}
[rSlider, gSlider, bSlider].forEach(slider => {
  slider.addEventListener("input", updateSliderBoxes);
});
updateSliderBoxes();

function getCurrentColor() {
  return [
    parseInt(rSlider.value),
    parseInt(gSlider.value),
    parseInt(bSlider.value)
  ];
}

function colorsMatch(c1, c2, tolerance) {
  return Math.abs(c1[0] - c2[0]) <= tolerance &&
         Math.abs(c1[1] - c2[1]) <= tolerance &&
         Math.abs(c1[2] - c2[2]) <= tolerance;
}


document.querySelectorAll(".paint-region").forEach(region => {
  region.addEventListener("click", () => {
    const id = region.id;
    if (!regionData[id] || regionData[id].painted) return;

    const num = regionData[id].number;
    const targetRGB = numberColors[num];
    const currentRGB = getCurrentColor();

    if (colorsMatch(currentRGB, targetRGB, COLOR_TOLERANCE)) {
      
      region.setAttribute("fill", `rgb(${currentRGB.join(",")})`);
      regionData[id].painted = true;

      
      progress[num].painted++;
      if (!progress[num].unlocked && progress[num].painted === progress[num].total) {
        unlockKey(num);
        progress[num].unlocked = true;
      }
    } else {
      flashFeedback("Try again!");
    }
  });
});


function unlockKey(number) {
  const btn = document.querySelector(`.key[data-digit="${number}"]`);
  if (btn) {
    btn.classList.remove("locked");
    btn.classList.add("unlocked");
    btn.disabled = false;
    flashFeedback(`Key ${number} unlocked!`);
  }
}


const feedback = document.getElementById("feedbackText");
function flashFeedback(text) {
  feedback.textContent = text;
  feedback.style.color = "red";
  setTimeout(() => { feedback.style.color = "black"; }, 800);
}


window.addEventListener("DOMContentLoaded", () => {
  initNumberColors();
  initRegionData();
});
