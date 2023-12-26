// Importing functions and variables from scores.js
import { resetScores, updateScores } from "./scores.js";

// Importing functions and variables from gameFunctions.js
import {
  player1Mark,
  setCurrentPlayer,
  resetBoard,
  resetWinner,
  toggleCurrentPlayer,
  setPlayerType,
} from "./gameFunctions.js";

// Importing functions from interface.js
import {
  renderBoard,
  updateTurnMark,
  toggleDisplay,
  handleCellClick,
} from "./interface.js";

// Importing function from scoreboardUtils.js
import { createAndAppendScoreElements } from "./scoreboardUtils.js";

// Getting reference to the "vsPlayer" button
const vsPlayerButton = document.querySelector(
  ".game-menu__start-btn--vs-player"
);

/**
 * Starts a new game against another player.
 *
 * @returns {void}
 */
export function startVsPlayer() {
  // Set the player type to "player"
  setPlayerType("player");

  // Reset game variables
  resetWinner();
  resetBoard();

  // Reset scores and update the display
  resetScores();
  updateScores();

  // If the player mark is not selected or "X" is selected, the first move is for "X"
  if (!player1Mark || player1Mark === "X") {
    setCurrentPlayer("X");
  } else {
    // If "O" is selected, toggle the current player and update the turn mark
    toggleCurrentPlayer();
    updateTurnMark();
  }

  // Toggle the display and render the game board
  toggleDisplay();
  renderBoard();

  // Add event handlers to the cells
  const cells = document.querySelectorAll(".game-board__cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick);
  });
}

// Event listener for the "vsPlayer" button click
vsPlayerButton.addEventListener("click", () => {
  // Create and append score elements for the player
  createAndAppendScoreElements(player1Mark, "player");

  // Start a new game against another player
  startVsPlayer();
});
