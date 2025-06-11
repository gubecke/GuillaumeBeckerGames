document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');

  if (menuToggle && sideMenu) {
    // Ensure menuToggle is focusable and acts like a button if it's not a <button>
    if (menuToggle.tagName !== 'BUTTON') {
      menuToggle.setAttribute('tabindex', '0');
      menuToggle.setAttribute('role', 'button');
      menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          sideMenu.classList.toggle('open');
        }
      });
    }
    menuToggle.addEventListener('click', () => {
      sideMenu.classList.toggle('open');
    });
  }

  const allButtons = document.querySelectorAll('button');

  allButtons.forEach(button => {
    if (button) {
      button.addEventListener('click', () => {
        button.classList.remove('clicked'); // reset si déjà cliqué
        void button.offsetWidth; // force le reflow pour relancer l'animation
        button.classList.add('clicked');
      });
    }
  });
});