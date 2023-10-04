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
function getRandomPhraseAsArray (phrases){
  const randomIndex = Math.floor(Math.random()* phrases.length);
  return phrases[randomIndex].split('');
}

//Function to addPhraseToDisplay
const addPhraseToDisplay = phrases => {
  const ul = document.querySelector('ul');
  ul.innerHTML = '';

  for (let i = 0; i < phrases.length; i++) {
      const li = document.createElement('li');
      li.textContent = phrases[i];
      ul.append(li);

      if (li.textContent.toLowerCase() !== ' ') {
          li.classList.add('letter');
      } else {
          li.classList.add('space');
      }
  }

}
//Function to check if a letter is in the phrase

const checkLetter = button => {
  const letters = document.querySelectorAll('.keyrow') 
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
