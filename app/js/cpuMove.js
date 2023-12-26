import { checkWinner } from "./checkWinner.js";
import { cpuMark } from "./gameVsCpu.js";

/**
 * Finds the best move for the computer player using the minimax algorithm.
 *
 * @param {string[]} board - The current state of the game board.
 * @param {string} currentPlayer - The current player ("X" or "O").
 * @returns {number} - The index of the best move.
 */
export function findBestMove(board, currentPlayer) {
  const oppositePlayer = cpuMark === "X" ? "O" : "X";

  /**
   * Recursive function for the minimax algorithm.
   *
   * @param {string[]} board - The current state of the game board.
   * @param {number} depth - The depth of the search.
   * @param {boolean} isMaximizingPlayer - Indicates if the current player is maximizing.
   * @returns {number} - The score of the current move.
   */
  function minimax(board, depth, isMaximizingPlayer) {
    const result = checkWinner(board, currentPlayer);

    if (result !== null) {
      if (result === "tie") {
        return 0;
      }

      return isMaximizingPlayer ? -1 : 1;
    }

    if (depth >= board.length) {
      return 0;
    }

    if (isMaximizingPlayer) {
      let bestScore = -Infinity;

      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = currentPlayer;
          bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
          board[i] = "";
        }
      }

      return bestScore;
    } else {
      let bestScore = Infinity;

      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = oppositePlayer;
          bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
          board[i] = "";
        }
      }

      return bestScore;
    }
  }

  // Find the optimal move
  let bestMove = -1;
  let bestScore = -Infinity;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = currentPlayer;
      const moveScore = minimax(board, 0, false);
      board[i] = "";

      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

/**
 * Logs the computer's move on the game board.
 *
 * @param {number} cellIndex - The index of the cell where the computer places its mark.
 * @param {string} currentPlayer - The current player ("X" or "O").
 * @returns {void}
 */
export function logComputerMove(cellIndex, currentPlayer) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute(
    "xlink:href",
    `./app/assets/icons.svg#icon-${currentPlayer.toLowerCase()}`
  );

  svg.appendChild(use);

  const cell = document.querySelector(
    `.game-board__cell[data-index="${cellIndex}"]`
  );
  cell.innerHTML = "";

  cell.appendChild(svg);

  cell.classList.add(`played-${currentPlayer.toLowerCase()}`);

  console.log("CPU", currentPlayer, "places a mark on cell", cellIndex);
}
