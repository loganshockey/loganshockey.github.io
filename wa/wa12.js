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
});

getQuote();