const redSlider = document.getElementById('red');
const greenSlider = document.getElementById('green');
const blueSlider = document.getElementById('blue');

const redValue = document.getElementById('redValue');
const greenValue = document.getElementById('greenValue');
const blueValue = document.getElementById('blueValue');

const colorPreview = document.getElementById('colorPreview');

function updateColor() {
  const r = parseInt(redSlider.value);
  const g = parseInt(greenSlider.value);
  const b = parseInt(blueSlider.value);

  redValue.textContent = r;
  greenValue.textContent = g;
  blueValue.textContent = b;

  const color = `rgb(${r}, ${g}, ${b})`;
  colorPreview.style.backgroundColor = color;
}

redSlider.addEventListener('input', updateColor);
greenSlider.addEventListener('input', updateColor);
blueSlider.addEventListener('input', updateColor);


updateColor();