const quoteContainer = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// loader function
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Complete function
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Getting quote from API
async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor === "") {
            author.innerText = 'Unknown';
        } else {
            author.innerText = data.quoteAuthor;
        }
        if (data.quoteText.length > 120) {
            quote.classList.add('long-quote');
        } else {
            quote.classList.remove('long-quote');
        }
        quote.innerText = data.quoteText;
        complete();
    } catch (error) {
        getQuote();
    }
}

function tweetQuote() {
    const quoteText = quote.innerText;
    const authorText = author.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;
    window.open(twitterUrl, '_blank');
}

// On Load
getQuote();

// Event Listeners
newBtn.addEventListener('click', getQuote);

twitterBtn.addEventListener('click', tweetQuote);