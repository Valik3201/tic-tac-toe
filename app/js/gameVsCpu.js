import {
  player1Mark,
  resetWinner,
  resetBoard,
  setCurrentPlayer,
  toggleCurrentPlayer,
  handleComputerMove,
  setPlayerType,
} from "./gameFunctions.js";

import {
  renderBoard,
  updateTurnMark,
  toggleDisplay,
  handleCellClick,
} from "./interface.js";

import { resetScores, updateScores } from "./scores.js";

import { createAndAppendScoreElements } from "./scoreboardUtils.js";

/** @type {string} */
export let cpuMark;

/** @type {HTMLElement} */
const vsCpuButton = document.querySelector(".game-menu__start-btn--vs-cpu");

/**
 * Starts a new game against the CPU.
 *
 * @returns {void}
 */
export function startVsCPU() {
  // Set the player type to "cpu"
  setPlayerType("cpu");

  // Determine CPU's mark based on player1Mark
  cpuMark = player1Mark === "X" ? "O" : "X";
  console.log("CPU Player's Mark:", cpuMark);

  // Reset game variables
  resetWinner();
  resetBoard();

  // Reset scores and update the display
  resetScores();
  updateScores();

  // Toggle the display and render the game board
  toggleDisplay();
  renderBoard();

  // If the player mark is not selected or "X" is selected, the first move is for "X"
  if (!player1Mark || player1Mark === "X") {
    setCurrentPlayer("X");
  } else {
    // If "O" is selected, toggle the current player and update the turn mark
    toggleCurrentPlayer();
    updateTurnMark();

    // Handle the first move by the computer
    handleComputerMove();
  }

  // Add event handlers to the cells
  const cells = document.querySelectorAll(".game-board__cell");
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick);
  });
}

// Event listener for the "vsCpu" button click
vsCpuButton.addEventListener("click", () => {
  // Create and append score elements for the CPU
  createAndAppendScoreElements(player1Mark, "cpu");

  // Start a new game against the CPU
  startVsCPU();
});
