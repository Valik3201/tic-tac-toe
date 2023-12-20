import "./slider.js";
import "./gameFunctions.js";
import "./scores.js";
import "./checkWinner.js";
import "./gameVsCpu.js";
import "./gameVsPlayer.js";
import "./round.js";

import { slideBg } from "./slider.js";
import {
  gameBoard,
  choosePlayerAndMark,
  toggleDisplay,
} from "./gameFunctions.js";

const buttonX = document.querySelector(".game-menu__mark-btn--x");
const buttonO = document.querySelector(".game-menu__mark-btn--o");

buttonX.addEventListener("click", () => {
  choosePlayerAndMark("X");
  slideBg(0);
});

buttonO.addEventListener("click", () => {
  choosePlayerAndMark("O");
  slideBg(1);
});

gameBoard.style.display = "none";
