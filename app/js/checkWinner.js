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

// Функция для проверки выигрыша
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

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern; // Возвращаем выигрышную комбинацию
    }
  }

  const isTie = board.every((cell) => cell !== "");
  if (isTie) {
    return "tie"; // Возвращаем "tie" при ничьей
  }

  return null; // Возвращаем null в случае продолжения игры
}

// Функция для отрисовки результатов
export function displayWinnerResult(result, player, playerType, pattern) {
  const modalTextWinner = document.querySelector(".modal__text");

  if (result === "tie") {
    console.log("Игра окончена. Ничья!");

    setTimeout(() => {
      showModal("roundResultModal");

      incrementTiesScore();
      updateScores();

      resetWinner();
      toggleGameEnded(true);
    }, 500);

    modalTextWinner.innerHTML = "";

    const modalText = document.querySelector(".modal__win-message");
    modalText.classList.remove("winner-x", "winner-o");
    modalText.classList.add("tied");
    modalText.innerHTML = `<p>ROUND TIED</p>`;

    return true;
  } else if (result && result !== "tie") {
    modalTextWinner.innerHTML = getWinnerText(player, playerType);

    setTimeout(() => {
      result.forEach((index, i) => {
        setTimeout(() => {
          const cell = document.querySelector(
            `.game-board__cell[data-index="${index}"]`
          );
          cell.classList.add(`winner-${player.toLowerCase()}`);
        }, i * 300);
      });
    }, 500);

    const modalText = document.querySelector(".modal__win-message");
    modalText.classList.remove("winner-x", "winner-o", "tied");
    modalText.classList.add(`winner-${player.toLowerCase()}`);
    modalText.innerHTML = `
      <svg fill="currentColor">
        <use xlink:href="./app/assets/icons.svg#icon-${player.toLowerCase()}"></use>
      </svg>
      <p>TAKES THE ROUND</p>`;

    setTimeout(() => {
      showModal("roundResultModal");

      if (player === "X") {
        incrementPlayer1Score();
      } else if (player === "O") {
        incrementPlayer2Score();
      }

      updateScores();

      console.log("Игрок " + player + " побеждает!");

      toggleGameEnded(true);

      setWinnerToCurrentPlayer();
    }, 1000);

    return true;
  }

  return false;
}

function getWinnerText(player, playerType) {
  if (playerType !== "cpu") {
    return player === player1Mark ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
  } else {
    return player === player1Mark && player !== cpuMark
      ? "YOU WON!"
      : "OH NO, YOU LOST…";
  }
}
