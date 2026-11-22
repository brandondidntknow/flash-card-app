// grabbing elements

//sections or forms
const cardForm = document.getElementById('card-form');
const studyControls = document.getElementById('study-controls');
const cardDisplay = document.getElementById('card-display');
const masteredDisplay = document.getElementById('mastered-card-count');


//buttons
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const flipBtn = document.getElementById('flip-btn');
const restartBtn = document.getElementById('restart-btn');
const submitBtn = document.getElementById('submit-btn');

//feedback buttons
const gotBtn = document.getElementById('got-btn');
const missBtn = document.getElementById('miss-btn');

// inputs 
const questionInput = document.getElementById('question-input');
const answerInput = document.getElementById('answer-input');

//redraw function variables 
let flashCardIndex = 0;
let isShowingAnswer = false;
let flashCards = JSON.parse(localStorage.getItem('flashCards')) || [];

//saveCards saves the cards into the localstorage (flashCards)
function saveCards() {
    // store in local storage
    localStorage.setItem('flashCards', JSON.stringify(flashCards));
}

//renderCards takes the save data and puts on the display 
function renderCards() {
    //count for mastered cards
    let amountMastered = flashCards.filter(card => card.mastered === true).length;
    //displays mastered cards of total cards
    masteredDisplay.textContent = `${amountMastered} of ${flashCards.length} Mastered`;
    // when there are no flash cards
    if (flashCards.length === 0) {
        cardDisplay.textContent = "No Cards:";
    }
    // when you reached the end of the set
    else if (flashCardIndex >= flashCards.length) {
        cardDisplay.textContent = "End-Of-Set";
    }
    // renders the card depending on isShowingAnswer 
    else {
        //if else when the answer should be showing or the question
        if (!isShowingAnswer) { // question
            cardDisplay.textContent = flashCards[flashCardIndex].question;
        }
        else { //answer
            cardDisplay.textContent = flashCards[flashCardIndex].answer;
        }
    }

    //hidden logic
    //no cards
    if (flashCards.length === 0) {
        flipBtn.hidden = true;
        nextBtn.hidden = true;
        prevBtn.hidden = true;
        restartBtn.hidden = true;
        gotBtn.hidden = true;
        missBtn.hidden = true;
        
    }
    // first card
    else if (flashCardIndex === 0) {
        flipBtn.hidden = false;
        nextBtn.hidden = false;
        prevBtn.hidden = true;
        restartBtn.hidden = true;
        gotBtn.hidden = false;
        missBtn.hidden = false;
        
    }
    //not first or last cards
    else if (flashCardIndex > 0 && flashCardIndex <= flashCards.length -1) {
        flipBtn.hidden = false;
        nextBtn.hidden = false;
        prevBtn.hidden = false;
        restartBtn.hidden = true;
        gotBtn.hidden = false;
        missBtn.hidden = false;
        
    }
    // last card
    else if (flashCardIndex >= flashCards.length) {
        flipBtn.hidden = true;
        nextBtn.hidden = true;
        prevBtn.hidden = false;
        restartBtn.hidden = false;
        gotBtn.hidden = true;
        missBtn.hidden = true;
    }
}
// button event listeners

// submit listener for card from
cardForm.addEventListener('submit', (event) => {
    // prevents refresh
    event.preventDefault();

    //reads inputs and trims whitespace
    let questionText = questionInput.value.trim();
    let answerText = answerInput.value.trim();
    
    // if statement for empty inputs
    if (questionText === '' || answerText === '' )  {
    }

    // push card obj into flashCards
    let card = {question:questionText,answer:answerText,seen:false,mastered:false};
    flashCards.push(card);
    

    // clear inputs
    questionInput.value = "";
    answerInput.value = "";

    //test
    console.log(flashCards);

    //save changes
    saveCards();

    //shows changes
    renderCards();
})

//flip button functionality 
flipBtn.addEventListener('click', () => {
    //toggles show answer value (same as if / else statement)
    isShowingAnswer = !isShowingAnswer;
    
    //redraws into display
    renderCards();
})

// next button functionality
nextBtn.addEventListener('click',() => {
    // makes the card seen
    flashCards[flashCardIndex].seen = true;
    // move the index one over
    flashCardIndex = flashCardIndex + 1;
    //make sure question is showing
    isShowingAnswer = false;
    //save data
    saveCards();
    //redraw
    renderCards();
})

//restart button functionality 
restartBtn.addEventListener('click', () =>{
    //reset toggle
    isShowingAnswer = false;
    // move index to first obj
    flashCardIndex = 0;
    //redraw first card
    renderCards();
    
})

//previous button functionlity
prevBtn.addEventListener('click', () => {
    if (flashCardIndex === 0) {
        renderCards();
    }
    // maove flashcard back 1
    else {flashCardIndex = flashCardIndex - 1;
    //reset is showing answer to false
    isShowingAnswer = false;
    //redraw
    renderCards();
    }
})

// got it button functionlity
gotBtn.addEventListener('click', () => {
    // change mastered property
    flashCards[flashCardIndex].mastered = true;
    //saves changes
    saveCards();
    //redraw 
    renderCards();

})

// missed it button functionlity
missBtn.addEventListener('click', () => {
    // change mastered to false
    flashCards[flashCardIndex].mastered = false;
    //saves changes
    saveCards();
    //redraw 
    renderCards();
})

// displays all
renderCards();