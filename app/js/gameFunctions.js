import { checkWinner, displayWinnerResult } from "./checkWinner.js";
import { findBestMove, logComputerMove } from "./cpuMove.js";

// Importing functions from interface.js
import { updateTurnMark } from "./interface.js";

import { cpuMark } from "./gameVsCpu.js";

/** @type {string} */
export let player1Mark = "X";

/** @type {string} */
export let currentPlayer = "X";

/** @type {string | null} */
export let winner = null;

/** @type {boolean} */
export let gameEnded = false;

/** @type {string[]} */
export let board = Array(9).fill("");

/** @type {string} */
export let playerType = "";

/**
 * Sets the player type for the game.
 *
 * @param {string} type - The player type ("player" or "cpu").
 * @returns {void}
 */
export function setPlayerType(type) {
  playerType = type;
}

/**
 * Sets the current player's mark and updates the console log.
 *
 * @param {string} mark - The mark to set for the current player ("X" or "O").
 * @returns {void}
 */
export function setCurrentPlayer(mark) {
  currentPlayer = mark;
  console.log("Player 1 set:", currentPlayer);
}

/**
 * Resets the winner variable to null.
 *
 * @returns {void}
 */
export function resetWinner() {
  winner = null;
}

/**
 * Updates the current player based on the game winner or sets it to "X" if no winner.
 *
 * @returns {void}
 */
export function updateCurrentPlayer() {
  currentPlayer = winner || "X";
}

/**
 * Sets the winner variable to the current player.
 *
 * @returns {void}
 */
export function setWinnerToCurrentPlayer() {
  winner = currentPlayer;
}

/**
 * Toggles the gameEnded variable to the specified status.
 *
 * @param {boolean} newStatus - The new status of the gameEnded variable.
 * @returns {void}
 */
export function toggleGameEnded(newStatus) {
  gameEnded = newStatus;
  console.info("Game ended:", gameEnded ? "Yes" : "No");
}

/**
 * Resets the game board to an array filled with empty strings.
 *
 * @returns {void}
 */
export function resetBoard() {
  board = Array(9).fill("");
}

/**
 * Sets the player's mark and the current player based on the chosen mark.
 *
 * @param {string} playerMark - The mark chosen by the player ("X" or "O").
 * @returns {void}
 */
export function choosePlayerAndMark(playerMark) {
  player1Mark = playerMark;
  currentPlayer = playerMark;
  console.log("Player 1 mark chosen:", player1Mark);
}

/**
 * Toggles the current player between "X" and "O" if the game is not ended.
 * If the game is ended, sets the current player to the winner or the current player.
 *
 * @returns {void}
 */
export function toggleCurrentPlayer() {
  if (!gameEnded) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  } else {
    currentPlayer = winner || currentPlayer;
  }
}

/**
 * Handles the player's move by checking for a winner and updating the turn mark or displaying the winner result.
 *
 * @returns {void}
 */
export function handlePlayerMove() {
  const result = checkWinner(board, currentPlayer);

  if (result) {
    displayWinnerResult(result, currentPlayer, playerType);
  } else {
    toggleCurrentPlayer();
    updateTurnMark();
  }
}

/**
 * Handles the computer's move by finding the best move, logging it, and handling the player's move.
 *
 * @returns {void}
 */
export function handleComputerMove() {
  const computerMoveIndex = findBestMove(board, currentPlayer);

  if (computerMoveIndex !== -1 && currentPlayer === cpuMark) {
    setTimeout(() => {
      logComputerMove(computerMoveIndex, cpuMark);
      board[computerMoveIndex] = cpuMark;

      handlePlayerMove();
    }, 1000);
  }
}
