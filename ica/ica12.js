const newQuote = document.querySelector("#js-new-quote");

newQuote.addEventListener("click", getQuote);
const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

function getQuote() {
}

async function getQuote() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        
        const json = await response.json();
        // console.log(json.question);
        // console.log(json.answer);
        displayQuote(json.question);

    } catch (err) {
        console.log(err);
        alert('Failed to fetch a new trivia');
    }
}

function displayQuote(quote) {
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;
}

getQuote();

