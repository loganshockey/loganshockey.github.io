const newQuote = document.querySelector("#js-new-quote");
const endpoint = "https://catfact.ninja/fact";

const colors = ['#FFB6C1', '#87CEFA', '#90EE90', '#FFD700', '#FFA07A']; 
let currentColorIndex = 0;

async function getQuote() {
  try {
    newQuote.classList.add("pop"); 
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    displayQuote(json.fact);

    const app = document.querySelector(".app");
    app.classList.add("flash");
    setTimeout(() => app.classList.remove("flash"), 300);

  } catch (err) {
    console.log(err);
    alert("Failed to fetch a cat fact :(");
  } finally {
    setTimeout(() => newQuote.classList.remove("pop"), 200); 
  }
}

function displayQuote(quote) {
  const quoteText = document.querySelector("#js-quote-text");
  quoteText.textContent = quote;
}

function changeBackgroundColor() {
  const app = document.querySelector('.app');
  app.style.backgroundColor = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length; 
}

newQuote.addEventListener("click", () => {
  getQuote();
  changeBackgroundColor();
  showRandomCat();
});

getQuote();

const catImages = [
  'wa12cats/cat1.png',
  'wa12cats/cat2.jpg',
  'wa12cats/cat3.png',
  'wa12cats/cat4.png',
  'wa12cats/cat5.jpg',
  'wa12cats/cat6.jpg',
  'wa12cats/cat7.png',
  'wa12cats/cat8.jpg',
  'wa12cats/cat9.jpg',
  'wa12cats/cat10.jpg'
];

function showRandomCat() {
  const container = document.getElementById('cat-image-container');
  
  // Pick a random image from the array
  const randomIndex = Math.floor(Math.random() * catImages.length);
  const randomCatSrc = catImages[randomIndex];
  
  // Clear any existing image
  container.innerHTML = '';
  
  // Create a new image element
  const img = document.createElement('img');
  img.src = randomCatSrc;
  img.alt = "Random Cat";
  
  container.appendChild(img);
}