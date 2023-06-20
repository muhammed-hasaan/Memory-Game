// here are all the symbols that the cards will contain
const symbols = ['😀', '😂', '😭', '💛', '😍', '🤩', '🤑', '😡'];
let cards = [];
let flippedCards = [];
let matchedCards = [];
let moves = 0;

// this function will generate cards inside the html div container
function generateCards() {
    // getting gameboard using js
    const gameBoard = document.getElementById('game-board');

    // gameboard innerhtml set to empty
    gameBoard.innerHTML = '';

    // duplicating the symbols so that each cards displaystwo times
    const shuffledSymbols = symbols.concat(symbols);

    // Now using for loop to assign the symbols to the cards
    for (i = 0; i < shuffledSymbols.length; i++) {

        // creating an element
        const card = document.createElement('div');

        // adding class name to it
        card.className = 'card';

        // setting its inner content
        card.innerHTML = `
      <div class="card-inner">
        <div class="front"></div>
        <div class="back">${shuffledSymbols[i]}</div>
      </div>
    `;

        // adding eventlistener to card so it performs sth when clicked oni it
        card.addEventListener('click', flipCard);

        // appending the card to the main container
        gameBoard.appendChild(card);

        // pushing the card to the array of cards
        cards.push(card);
    };
}

// creating a function that flips the card when clicked
function flipCard() {
    // checking if the card clciiked is already not cliked or already not matched
    if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
        this.classList.add('flipped');
        // pushing the card to the flipped card array
        flippedCards.push(this);

        // checking if two cards are flipped if the are we are checikg for match
        if (flippedCards.length === 2)
            setTimeout(checkForMatch, 1000);
    }
}

// creating a function that checks if both the cards are same
function checkForMatch() {

    // assuming card1 and card2 are the flipped cards
    const [card1, card2] = flippedCards;

    // assigning symbol1 to the symbol of card1 and symbol2 to the symbol of card2
    const symbol1 = card1.querySelector('.back').textContent;
    const symbol2 = card2.querySelector('.back').textContent;

    // checking if symbol1 and symbol2 are the same
    if (symbol1 === symbol2) {

        // if they are they will permenantly be flipped
        card1.classList.add('flipped');
        card2.classList.add('flipped');

        // and will be pushed to matched cards array
        matchedCards.push(card1, card2);

        // flipped cards will be cleared
        flippedCards = [];

        // checking for game over if all the cards are matched
        if (matchedCards.length === cards.length)
            setTimeout(() => alert(`Congratulations! You won in ${moves} moves.`), 500);
    } else {

        // if both the cards are not matching they will be flipped back
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
    }

// will increament moves on every click
    moves++;
}

// resetting the game
function resetGame() {
    cards = []
    flippedCards = []
    matchedCards = []
    moves = 0;
    generateCards();
}

generateCards();