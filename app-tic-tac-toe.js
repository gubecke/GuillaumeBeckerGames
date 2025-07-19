document.addEventListener('DOMContentLoaded', () => {

    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    let currentPlayer = "X";

    function makeMove(row, col){
        if(board[row][col] === ''){
            board[row][col] = currentPlayer

            displayBoard();

            if(checkWin(currentPlayer)){
                alert(`${currentPlayer} win !`)
                resetGame();
                return;
            }

            if(checkDraw()){
                alert("It's a draw");
                resetGame();
                return;
            }

            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        }
    }

    function checkWin(player){
        for(let row = 0; row < 3; row++){
            if(board[row][0] === player && board[row][1] === player && board[row][2] === player)
            return true;
        }
        for(let col = 0; col < 3; col++){
            if(board[0][col] === player && board[1][col] === player && board[2][col] === player)
            return true;
        }
        if(board[0][0] === player && board[1][1] === player && board[2][2] === player){
            return true;
        }
        if(board[0][2] === player && board[1][1] === player && board[2][0] === player){
            return true;
        }
        return false;
    }

    function checkDraw(){
        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                if(board[row][col] === ''){
                    return false;
                }
            }
        }
        return true;
    }

    function displayBoard(){
        const boardContainer = document.querySelector("#board")
        boardContainer.innerHTML = '';

        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                const cell = document.createElement('div');
                cell.classList.add("cell");
                cell.classList.remove('x', 'o')
                cell.textContent = board[row][col];
                if (board[row][col] === 'X') {
                    cell.classList.add('x');
                }
                if (board[row][col] === 'O') {
                    cell.classList.add('o');
                }

                cell.addEventListener("click", function(){
                    makeMove(row, col);
                });

                boardContainer.appendChild(cell)
            }
        }
    }

    function resetGame(){
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        currentPlayer = 'X';
        displayBoard();
    }

    displayBoard();

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