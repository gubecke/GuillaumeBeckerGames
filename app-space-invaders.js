const moreDifficult = document.querySelector('#more-difficulty-button');
const startGame = document.querySelector('#start-button');
const lessDifficult = document.querySelector('#less-difficulty-button');
const grid = document.querySelector('.grid');
const resultsDisplay = document.querySelector('.results');
const speedDisplay = document.querySelector('.speed-display');

let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
let results = 0;
let invadersSpeed = 500;
let gameStarted = false;

// Création des cases
for (let i = 0; i < 225; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
];

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader');
    }
  }
}

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader');
  }
}

draw();

squares[currentShooterIndex].classList.add('shooter');

function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter');
  switch(e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
      break;
    case 'ArrowRight':
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
      break;
  }
  squares[currentShooterIndex].classList.add('shooter');
}
document.addEventListener('keydown', moveShooter);

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
  remove();

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }

  draw();

  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    resultsDisplay.innerHTML = 'GAME OVER';
    clearInterval(invadersId);
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > (squares.length)) {
      resultsDisplay.innerHTML = 'GAME OVER';
      clearInterval(invadersId);
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = 'YOU WIN';
    clearInterval(invadersId);
  }
}

// Fonction tirer laser
function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;

  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser');
    currentLaserIndex -= width;
    if(currentLaserIndex < 0) {
      clearInterval(laserId);
      return;
    }
    squares[currentLaserIndex].classList.add('laser');

    if(squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser');
      squares[currentLaserIndex].classList.remove('invader');
      squares[currentLaserIndex].classList.add('boom');

      setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
      clearInterval(laserId);

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);
      results++;
      resultsDisplay.innerHTML = results;
    }
  }

  switch(e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100);
      break;
  }
}
document.addEventListener('keydown', shoot);

// Met à jour la vitesse affichée
function updateSpeedDisplay() {
  speedDisplay.textContent = `Vitesse : ${invadersSpeed} ms`;
}

// Met à jour la difficulté et la vitesse
function updateDifficulty(newSpeed) {
  clearInterval(invadersId);
  invadersSpeed = newSpeed;
  updateSpeedDisplay();
  if (gameStarted) {
    invadersId = setInterval(moveInvaders, invadersSpeed);
  }
}

lessDifficult.addEventListener('click', () => {
  if (invadersSpeed < 2000) {
    updateDifficulty(invadersSpeed + 100);
  }
});

moreDifficult.addEventListener('click', () => {
  if (invadersSpeed > 100) {
    updateDifficulty(invadersSpeed - 100);
  }
});

startGame.addEventListener('click', () => {
  if (!gameStarted) {
    invadersId = setInterval(moveInvaders, invadersSpeed);
    gameStarted = true;
  }
});

// Animation bouton au clic (déjà dans ton code)
const allButtons = document.querySelectorAll('button');

allButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.remove('clicked'); // reset si déjà cliqué
    void button.offsetWidth; // force le reflow pour relancer l'animation
    button.classList.add('clicked');
  });
});

// === MENU TOGGLE ===
const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');

menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
});

// Initialisation affichage vitesse
updateSpeedDisplay();
