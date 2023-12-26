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

/**
 * Checks for a winner or a tie in the game board.
 *
 * @param {string[]} board - The current state of the game board.
 * @param {string} player - The current player ("X" or "O").
 * @returns {number[] | "tie" | null} - Returns the winning pattern, "tie" for a tie, or null for ongoing game.
 */
export function checkWinner(board, player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontal lines
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertical lines
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern; // Return the winning pattern
    }
  }

  const isTie = board.every((cell) => cell !== "");
  if (isTie) {
    return "tie"; // Return "tie" for a tie
  }

  return null; // Return null for ongoing game
}

/**
 * Displays the result of the game in a modal and updates scores accordingly.
 *
 * @param {number[] | "tie" | null} result - The result of the game (winning pattern, "tie", or null).
 * @param {string} player - The current player ("X" or "O").
 * @param {string} playerType - The type of player ("cpu" or "player").
 * @param {number[]} pattern - The winning pattern on the game board.
 * @returns {boolean} - Returns true if the game is over, false otherwise.
 */
export function displayWinnerResult(result, player, playerType, pattern) {
  const modalTextWinner = document.querySelector(".modal__text");

  if (result === "tie") {
    console.log("Game over. It's a tie!");

    setTimeout(() => {
      showModal("roundResultModal");

      incrementTiesScore();
      updateScores();

      resetWinner();
    }, 500);

    toggleGameEnded(true);

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

      console.log("Player " + player + " wins!");

      setWinnerToCurrentPlayer();
    }, 1000);

    toggleGameEnded(true);

    return true;
  }

  return false;
}

/**
 * Generates the winner text based on player type and result.
 *
 * @param {string} player - The current player ("X" or "O").
 * @param {string} playerType - The type of player ("cpu" or "player").
 * @returns {string} - The winner text.
 */
function getWinnerText(player, playerType) {
  if (playerType !== "cpu") {
    return player === player1Mark ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
  } else {
    return player === player1Mark && player !== cpuMark
      ? "YOU WON!"
      : "OH NO, YOU LOST…";
  }
}
