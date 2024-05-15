document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box');
  const resetButton = document.querySelector('.reBtn');
  let currentPlayer = 'X';
  let board = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

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

  function handleBoxClick(event) {
    const box = event.target;
    const boxIndex = Array.from(boxes).indexOf(box);

    if (board[boxIndex] !== '' || !gameActive) {
      return;
    }

    board[boxIndex] = currentPlayer;
    box.textContent = currentPlayer;

    if (checkWinner()) {
      alert(`${currentPlayer} has won!`);
      gameActive = false;
      return;
    }

    if (board.every(cell => cell !== '')) {
      alert("It's a draw!");
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function checkWinner() {
    return winningConditions.some(condition => {
      const [a, b, c] = condition;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  }

  function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    boxes.forEach(box => (box.textContent = ''));
  }

  boxes.forEach(box => box.addEventListener('click', handleBoxClick));
  resetButton.addEventListener('click', resetGame);
});
