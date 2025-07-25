document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.square')
  const mole = document.querySelector('.mole')
  const timeLeft = document.querySelector('#time-left')
  const score = document.querySelector('#score')

  let result = 0
  let hitPosition
  let currentTime = 60
  let timerId = null

  function randomSquare() {
    squares.forEach(square => {
      square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id
  }

  squares.forEach(square => {
    square.addEventListener('mousedown', () => {
      if (square.id == hitPosition) {
        result++
        score.textContent = result
        hitPosition = null
      }
    })
  })

  function moveMole() {
    timerId = setInterval(randomSquare, 1000)
  }

  moveMole()

  function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime == 0) {
      clearInterval(countDownTimerId)
      clearInterval(timerId)
      alert('GAME OVER! Your final score is ' + result)
    }

  }

  let countDownTimerId = setInterval(countDown, 1000)

  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');

  if (menuToggle && sideMenu) {
    menuToggle.addEventListener('click', () => {
      sideMenu.classList.toggle('open')
    });
  }

  const allButtons = document.querySelectorAll('button');

  allButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.remove('clicked'); // reset si déjà cliqué
      void button.offsetWidth; // force le reflow pour relancer l'animation
      button.classList.add('clicked');
    });
  });
});