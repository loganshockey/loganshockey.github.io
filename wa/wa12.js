const newQuote = document.querySelector("#js-new-quote");
const endpoint = "https://catfact.ninja/fact";

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

newQuote.addEventListener("click", getQuote);
getQuote();