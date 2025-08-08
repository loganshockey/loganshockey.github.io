const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");

const rBox = document.getElementById("rBox");
const gBox = document.getElementById("gBox");
const bBox = document.getElementById("bBox");


function getCurrentColor() {
  const r = rSlider.value;
  const g = gSlider.value;
  const b = bSlider.value;
  return `rgb(${r}, ${g}, ${b})`;
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


[rSlider, gSlider, bSlider].forEach(slider =>
  slider.addEventListener("input", updateColorBoxes)
);


function setupPainting() {
  const svg = document.querySelector("svg");

  if (!svg) {
    console.warn("SVG not found!");
    return;
  }

  const regions = svg.querySelectorAll("path, polygon, rect, circle");

  regions.forEach(region => {
    region.style.cursor = "pointer"; 

    region.addEventListener("click", () => {
      const color = getCurrentColor();
      region.setAttribute("fill", color);

    });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  updateColorBoxes();  
  setupPainting();     
});