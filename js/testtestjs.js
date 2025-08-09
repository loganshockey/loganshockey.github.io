
const COLOR_TOLERANCE = 50; 


const regionData = {
  "region-0g": { number: 1, targetColor: [200, 50, 80], painted: false },
  "region-1g": { number: 1, targetColor: [200, 50, 80], painted: false },
  "region-2b": { number: 2, targetColor: [100, 180, 40], painted: false }
};


const progress = {};
Object.values(regionData).forEach(({ number }) => {
  if (!progress[number]) progress[number] = { total: 0, painted: 0, unlocked: false };
  progress[number].total++;
});


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


document.querySelectorAll(".paint-region").forEach(region => {
  region.addEventListener("click", () => {
    const id = region.id;
    if (!regionData[id] || regionData[id].painted) return;

    const target = regionData[id].targetColor;
    const current = getCurrentColor();

    if (colorsMatch(current, target, COLOR_TOLERANCE)) {
      
      region.setAttribute("fill", `rgb(${current.join(",")})`);
      regionData[id].painted = true;

      
      const num = regionData[id].number;
      progress[num].painted++;

      
      if (!progress[num].unlocked && progress[num].painted === progress[num].total) {
        unlockKey(num);
        progress[num].unlocked = true;
      }
    } else {
      flashFeedback("Try Again!");
    }
  });
});

function colorsMatch(c1, c2, tolerance) {
  return Math.abs(c1[0] - c2[0]) <= tolerance &&
         Math.abs(c1[1] - c2[1]) <= tolerance &&
         Math.abs(c1[2] - c2[2]) <= tolerance;
}


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