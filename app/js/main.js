import "./checkWinner.js";
import "./gameFunctions.js";
import "./gameVsCpu.js";
import "./gameVsPlayer.js";
import "./round.js";
import "./scores.js";
import "./slider.js";

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

const logoElement = document.querySelector(".game-board__info .custom-logo");

logoElement.addEventListener("click", toggleDisplay);
