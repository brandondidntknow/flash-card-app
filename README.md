# Flashcards

A simple flashcard study app built with plain HTML, CSS, and JavaScript. Add your own cards, flip through them, and track which ones you've mastered. Your cards are saved in your browser, so they're still there when you come back.

(https://brandondidntknow.github.io/flash-card-app/)

## Features

- Add cards with a question and an answer
- Flip a card to reveal the answer
- Move forward and back through the set with Next and Previous
- Mark each card "Got it" or "Missed it"
- See your progress as a "X of Y Mastered" count
- Restart the set when you reach the end
- Cards and scores persist after a refresh (saved with `localStorage`)

## How to use

1. Type a question and an answer into the form, then press Submit.
2. Use **Flip** to check the answer.
3. Press **Got it** or **Missed it** to score the card.
4. Press **Next** to move on. At the end of the set, press **Restart** to go through the cards again.

## Run it locally

No build step or dependencies are needed.

1. Clone or download this repository.
2. Open `index.html` in a browser (or use the Live Server extension in VS Code).

## How it works

The app keeps its data in one place and redraws the screen from it:

- `flashCards`: an array of card objects (`question`, `answer`, `seen`, `mastered`), saved to `localStorage`
- `flashCardIndex`: which card is currently on screen
- `isShowingAnswer`: whether the question or the answer is showing
- `renderCards()`: draws the card, the mastered count, and decides which buttons are visible

Every button changes the data, saves it if the cards changed, and then calls `renderCards()`.

## Built with

- HTML
- CSS (flexbox)
- JavaScript (DOM manipulation, `localStorage`)

## What I learned

- Keeping a single source of truth and rendering the page from it
- Managing state with variables and handling edge cases (no cards, first card, end of set)
- Saving and loading data with `localStorage` and JSON
- Debugging with the browser Console, Network tab, and Elements panel
