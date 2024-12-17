const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGame');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(board.children).indexOf(cell);

    if (gameState[cellIndex] !== '' || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWinner()) {
        showResult(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        showResult('Game is a draw!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function showResult(message) {
    resultMessage.textContent = message;
    resultScreen.style.display = 'flex';
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = "Player X's turn";

    Array.from(board.children).forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
}

function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function startNewGame() {
    restartGame();
    resultScreen.style.display = 'none';
}

createBoard();

restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', startNewGame);