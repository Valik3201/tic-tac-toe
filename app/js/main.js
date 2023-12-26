// Importing modules
import "./slider.js";
import "./gameFunctions.js";
import "./scores.js";
import "./checkWinner.js";
import "./gameVsCpu.js";
import "./gameVsPlayer.js";
import "./round.js";
import "./interface.js";

// Importing specific functions/variables from modules
import { slideBg } from "./slider.js";
import { choosePlayerAndMark } from "./gameFunctions.js";
import { gameBoard } from "./interface.js";

// Getting references to HTML elements
const buttonX = document.querySelector(".game-menu__mark-btn--x");
const buttonO = document.querySelector(".game-menu__mark-btn--o");

// Event listeners for selecting player marks
buttonX.addEventListener("click", () => {
  /**
   * Event handler for selecting "X" mark.
   * Updates player mark, slides background, and sets up the game.
   *
   * @event click
   * @returns {void}
   */
  choosePlayerAndMark("X");
  slideBg(0);
});

buttonO.addEventListener("click", () => {
  /**
   * Event handler for selecting "O" mark.
   * Updates player mark, slides background, and sets up the game.
   *
   * @event click
   * @returns {void}
   */
  choosePlayerAndMark("O");
  slideBg(1);
});

// Hide the game board initially
gameBoard.style.display = "none";
