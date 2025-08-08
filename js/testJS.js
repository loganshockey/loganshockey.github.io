const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");

const rBox = document.getElementById("rBox");
const gBox = document.getElementById("gBox");
const bBox = document.getElementById("bBox");

const feedbackText = document.getElementById("feedbackText");


const digitTargetColors = {};
const unlockedDigits = new Set();
const tolerance = 60; 

function updateColorBoxes() {
  rBox.style.backgroundColor = `rgb(${rSlider.value},0,0)`;
  gBox.style.backgroundColor = `rgb(0,${gSlider.value},0)`;
  bBox.style.backgroundColor = `rgb(0,0,${bSlider.value})`;
}

function rgbStringToObj(rgbStr) {
  const parts = rgbStr.match(/\d+/g).map(Number);
  return { r: parts[0], g: parts[1], b: parts[2] };
}

function colorDifference(c1, c2) {
  return Math.abs(c1.r - c2.r) +
         Math.abs(c1.g - c2.g) +
         Math.abs(c1.b - c2.b);
}

function initTargetColors() {
  document.querySelectorAll("[id^='num-']").forEach(numEl => {
    const idSuffix = numEl.id.replace("num-", "");
    
    const target = {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256)
    };
    digitTargetColors[idSuffix] = target;
    numEl.setAttribute("fill", `rgb(${target.r},${target.g},${target.b})`);
  });
}

function handleRegionClick(e) {
  const regionId = e.target.id.replace("region-", "");
  const target = digitTargetColors[regionId];
  const userColor = {
    r: parseInt(rSlider.value),
    g: parseInt(gSlider.value),
    b: parseInt(bSlider.value)
  };

  const diff = colorDifference(userColor, target);

  if (diff <= tolerance) {
    e.target.setAttribute("fill", `rgb(${target.r},${target.g},${target.b})`);
    unlockedDigits.add(regionId);
    localStorage.setItem("unlockedDigits", JSON.stringify([...unlockedDigits]));
    feedbackText.textContent = `Color Matched! Value Difference: ${diff}`;
  } else {
    feedbackText.textContent = `Try Again! Value Difference: ${diff}`;
  }
}


[rSlider, gSlider, bSlider].forEach(slider =>
  slider.addEventListener("input", updateColorBoxes)
);

function attachRegionListeners() {
  document.querySelectorAll("[id^='region-']").forEach(regionEl => {
    regionEl.addEventListener("click", handleRegionClick);
  });
}


updateColorBoxes();
initTargetColors();
attachRegionListeners();
