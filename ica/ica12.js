const newQuote = document.querySelector("#js-new-quote");
const answerBtn = document.querySelector("#js-answer");

answerBtn.addEventListener('click',displayAnswer);
newQuote.addEventListener("click", getQuote);
const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

let json = ''; 

async function getQuote() {
    const answerArea=document.querySelector("#js-answer-text");
    answerArea.textContent = '';
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        
        json = await response.json();
        // console.log(json.question);
        // console.log(json.answer);
        displayQuote(json.question);

    } catch (err) {
        console.log(err);
        alert('Failed to fetch a new trivia');
    }
}

function displayAnswer() {
    const answerText = json.answer;
    const answerArea = document.querySelector("#js-answer-text")
    answerArea. textContent = answerText;
}

function displayQuote(quote) {
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;
}

getQuote();

