// script.js
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("reset-btn");
let currentPlayer = "X";
let boardState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (boardState[index] === null) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) {
      setTimeout(() => alert(`${currentPlayer} wins!`), 10);
      resetGame();
    } else if (boardState.every(cell => cell)) {
      setTimeout(() => alert("It's a tie!"), 10);
      resetGame();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWin() {
  return winningCombinations.some(combination =>
    combination.every(index => boardState[index] === currentPlayer)
  );
}

function resetGame() {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  currentPlayer = "X";
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);

