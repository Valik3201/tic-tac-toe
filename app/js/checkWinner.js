import {
  toggleGameEnded,
  setWinnerToCurrentPlayer,
  resetWinner,
  player1Mark,
} from "./gameFunctions.js";

import { cpuMark } from "./gameVsCpu.js";

import {
  updateScores,
  incrementPlayer1Score,
  incrementPlayer2Score,
  incrementTiesScore,
} from "./scores.js";

import { showModal } from "./round.js";

export function checkWinner(board, player) {
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

  const isBoardFull = board.every((cell) => cell !== "");

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      // Вывод сообщения о победе в консоль
      console.log("Игрок " + player + " побеждает!");

      setTimeout(() => {
        showModal("roundResultModal");
      }, 1000);

      if (!isBoardFull) {
        const modalTextWinner = document.querySelector(".modal__text");

        if (player === player1Mark && player !== cpuMark) {
          modalTextWinner.innerHTML = "YOU WON!";
        } else {
          modalTextWinner.innerHTML = "OH NO, YOU LOST…";
        }
      }

      const modalText = document.querySelector(".modal__win-message");
      modalText.classList.remove("winner-x", "winner-o", "tied");
      modalText.classList.add(`winner-${player.toLowerCase()}`);
      modalText.innerHTML = `
          <svg fill="currentColor">
            <use xlink:href="./app/assets/icons.svg#icon-${player.toLowerCase()}"></use>
          </svg>
        <p>TAKES THE ROUND</p>`;

      toggleGameEnded(true);

      setWinnerToCurrentPlayer();

      if (player === "X") {
        incrementPlayer1Score();
      } else if (player === "O") {
        incrementPlayer2Score();
      }

      updateScores();

      // Добавляем классы выигрышным ячейкам с задержкой
      pattern.forEach((index, i) => {
        setTimeout(() => {
          const cell = document.querySelector(
            `.game-board__cell[data-index="${index}"]`
          );
          cell.classList.add(`winner-${player.toLowerCase()}`);
        }, i * 300);
      });

      return pattern; // Возвращаем выигрышную комбинацию
    }
  }

  if (isBoardFull) {
    console.log("Игра окончена. Ничья!");
    setTimeout(() => {
      showModal("roundResultModal");
    }, 500);

    const modalTextWinner = document.querySelector(".modal__text");
    modalTextWinner.innerHTML = "";

    const modalText = document.querySelector(".modal__win-message");
    modalText.classList.remove("winner-x", "winner-o");
    modalText.classList.add("tied");
    modalText.innerHTML = `<p>ROUND TIED</p>`;

    incrementTiesScore();
    updateScores();

    resetWinner();
    toggleGameEnded(true);
  }

  // Если никто не выиграл, возвращаем null
  return null;
}
