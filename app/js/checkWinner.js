import {
  currentPlayer,
  board,
  resetWinner,
  toggleGameEnded,
  setWinnerToCurrentPlayer,
} from "./gameFunctions.js";

import {
  updateScores,
  incrementPlayer1Score,
  incrementPlayer2Score,
  incrementTiesScore,
} from "./scores.js";

export function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Горизонтальные линии
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Вертикальные линии
    [0, 4, 8],
    [2, 4, 6], // Диагонали
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      console.log("Игрок", currentPlayer, "побеждает!");

      setWinnerToCurrentPlayer();

      if (currentPlayer === "X") {
        incrementPlayer1Score();
      } else if (currentPlayer === "O") {
        incrementPlayer2Score();
      }

      toggleGameEnded();

      updateScores();

      // Добавляем классы выигрышным ячейкам с задержкой
      pattern.forEach((index, i) => {
        setTimeout(() => {
          const cell = document.querySelector(
            `.game-board__cell[data-index="${index}"]`
          );
          cell.classList.add(`winner-${currentPlayer.toLowerCase()}`);
        }, i * 500); // Задержка в миллисекундах между добавлениями классов
      });

      return pattern; // Возвращаем выигрышную комбинацию
    }
  }

  const isBoardFull = board.every((cell) => cell !== "");
  if (isBoardFull) {
    console.log("Игра окончена. Ничья!");
    incrementTiesScore();
    updateScores();

    resetWinner();
    toggleGameEnded();
  }

  // Если никто не выиграл, возвращаем null
  return null;
}
