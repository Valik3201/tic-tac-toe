// Importing functions and variables from gameFunctions.js
import {
  updateCurrentPlayer,
  resetBoard,
  toggleGameEnded,
  playerType,
  currentPlayer,
  handleComputerMove,
  setCurrentPlayer,
  resetWinner,
  winner,
} from "./gameFunctions.js";

// Importing functions from interface.js
import { updateTurnMark, toggleDisplay } from "./interface.js";

// Importing variable from gameVsCpu.js
import { cpuMark } from "./gameVsCpu.js";

// Getting references to HTML elements
const nextRoundBtn = document.querySelector(".modal__next-round");
const restartBtn = document.querySelector(".game-board__button--restart");
const quitBtn = document.querySelector(".modal__quit");

/**
 * Displays a modal by removing "out" class and adding "show" class.
 *
 * @param {string} id - The ID of the modal to be shown.
 * @returns {void}
 */
export function showModal(id) {
  const modal = document.querySelector(`#${id}`);
  modal.classList.remove("show", "out");
  modal.classList.add("show");
}

/**
 * Hides a modal by adding "out" class.
 *
 * @param {string} id - The ID of the modal to be hidden.
 * @returns {void}
 */
export function hideModal(id) {
  const modal = document.querySelector(`#${id}`);
  modal.classList.add("out");
}

/**
 * Clears the game board by removing player marks and classes.
 *
 * @returns {void}
 */
function clearBoard() {
  const cells = document.querySelectorAll(".game-board__cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("played-x", "played-o", "winner-x", "winner-o");
  });
}

/**
 * Resets the game by clearing the board, resetting game state, and updating the display.
 *
 * @returns {void}
 */
function resetGame() {
  clearBoard();
  resetBoard();
  updateCurrentPlayer();
  updateTurnMark();
  toggleGameEnded(false);

  // If the game type is against CPU and the winner is the current player or CPU plays as "X", handle the computer move
  if ((playerType === "cpu" && winner === currentPlayer) || cpuMark === "X") {
    handleComputerMove();
  }
}

// Event listener for the "Next Round" button in the round result modal
nextRoundBtn.addEventListener("click", () => {
  hideModal("roundResultModal");
  resetGame();
});

/**
 * Restarts the game by showing a modal with confirmation buttons.
 *
 * @returns {void}
 */
export function restartGame() {
  showModal("restartGameModal");

  const confirmBtn = document.querySelector(".modal__restart-confirmed");
  const cancelBtn = document.querySelector(".modal__cancel");

  confirmBtn.addEventListener("click", () => {
    hideModal("restartGameModal");
    resetGame();
  });

  cancelBtn.addEventListener("click", () => {
    hideModal("restartGameModal");
  });
}

// Event listener for the "Restart" button
restartBtn.addEventListener("click", restartGame);

/**
 * Quits the game by hiding the round result modal, ending the game, updating display, resetting winner, and setting current player to "X".
 *
 * @returns {void}
 */
export function quitGame() {
  hideModal("roundResultModal");
  toggleGameEnded(true);
  toggleDisplay();
  resetWinner();
  setCurrentPlayer("X");
}

// Event listener for the "Quit" button
quitBtn.addEventListener("click", quitGame);

// Event listener for clicking on the game logo to quit the game
const logoElement = document.querySelector(".game-board__info .custom-logo");
logoElement.addEventListener("click", quitGame);
