const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
// const startButton = Document.getElementsByClassName('.btn__reset');
let missed = 0;

// Hide start button
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');

//Array of Phrases
const phrases = [
"I love coding",
"Javascript can be overwhelming",
"Coding is fun",
"Programing is awesome",
"Js function is difficult"
];

// Event listener for the "Start Game" button
startButton.addEventListener('click', () => {
  overlay.style.display = 'none'; 
});

//Function for a random phrase
function getRandomPhraseAsArray(phrases){
  const randomIndex = Math.floor(Math.random()* phrases.length);
  return phrases[randomIndex].split('');
}

//Function to addPhraseToDisplay
const addPhraseToDisplay = letters => {
  const ul = document.querySelector('ul');
  ul.innerHTML = '';

  for (let i = 0; i < letters.length; i++) {
      const li = document.createElement('li');
      li.textContent = letters[i];
      ul.append(li);

      if (li.textContent.toLowerCase() !== ' ') {
          li.classList.add('letter');
      } else {
          li.classList.add('space');
      }
  }

}
//Function to check if a letter is in the phrase
let randomPhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randomPhrase);
const checkLetter = button => {
  const letters = document.querySelectorAll('.letter') 
  let match = null;

  letters.forEach((letters) => {
      if (letters.textContent.toLowerCase() === button.textContent.toLowerCase()) {
          letters.classList.add('show'); // Show the letters
          match = letters.textContent;
      }
  });
  return match;
}

//Event listener for keyboard clicks

qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('chosen')) {
      const button = e.target;
      button.classList.add('chosen'); // Mark the chosen letter
      button.disabled = true; // Disable the clicked button

      const letterKeyed = checkLetter(button);

      if (!letterKeyed) {
          const tries = document.querySelectorAll('.tries');
          const lostHeart = document.createElement('img');
          lostHeart.src = 'images/lostHeart.png';
          tries[missed].innerHTML = '';
          tries[missed].appendChild(lostHeart);
          missed++; 
      }
      checkWin();
  }
})

const checkWin = () => {
  const letterElements = document.querySelectorAll('.letter');
  const showElements = document.querySelectorAll('.show');

  if (letterElements.length === showElements.length) {

      overlay.className = 'win';
      overlay.style.display = 'flex';
      overlay.querySelector('.title').textContent = 'Congratulations, Harold! You won!';
      startButton.remove();


      // Hide the phrase when displaying the win screen
      hidePhrase();

      const buttons = document.querySelectorAll('.chosen');
      buttons.forEach(function (element) {
          element.classList.remove('chosen');
          element.disabled = false;
      });
  } else if (missed >= 5) {
      overlay.className = 'lose';
      overlay.style.display = 'flex';
      overlay.querySelector('.title').textContent = 'Sorry, Harold, You Lose. Try Again!';
      startButton.remove()
  
      // Hide the phrase when displaying the lose screen
      hidePhrase();

      const buttons = document.querySelectorAll('.chosen');
      buttons.forEach(function (element) {
          element.classList.remove('chosen');
          element.disabled = false;
      });
  }
}

// Function to hide the phrase
function hidePhrase() {
  const phraseList = document.querySelectorAll('#phrase ul li');
  phraseList.forEach(li => li.style.display = 'none');
}

// Function to show the phrase
function showPhrase() {
  const phraseList = document.querySelectorAll('#phrase ul li');
  phraseList.forEach(li => li.style.display = 'list-item');
}