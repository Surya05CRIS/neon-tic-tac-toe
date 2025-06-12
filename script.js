let currentPlayer = 'X';
let cells = document.querySelectorAll('.cell');
let statusText = document.getElementById('status');
let scoreX = 0, scoreO = 0;
let scoreDisplayX = document.getElementById('scoreX');
let scoreDisplayO = document.getElementById('scoreO');
let clickSound = document.getElementById('clickSound');
let winSound = document.getElementById('winSound');
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

function handleClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] === "" && gameActive) {
    clickSound.play();
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWin()) {
      winSound.play();
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      if (currentPlayer === 'X') {
        scoreX++;
        scoreDisplayX.textContent = scoreX;
      } else {
        scoreO++;
        scoreDisplayO.textContent = scoreO;
      }
      gameActive = false;
    } else if (board.every(cell => cell !== "")) {
      statusText.textContent = "It's a Draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

function checkWin() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function newGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
  newGame();
  scoreX = 0;
  scoreO = 0;
  scoreDisplayX.textContent = 0;
  scoreDisplayO.textContent = 0;
}
