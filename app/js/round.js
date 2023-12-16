import {
  updateCurrentPlayer,
  resetBoard,
  toggleGameEnded,
  renderBoard,
  updateTurnMark,
  setWinnerToCurrentPlayer,
  playerType,
  currentPlayer,
  handleComputerMove,
} from "./gameFunctions.js";

import { winner } from "./gameFunctions.js";

const nextRoundBtn = document.querySelector(".modal__next-round");

function nextRound() {
  toggleGameEnded(false);
  resetBoard();
  renderBoard();
  updateCurrentPlayer();
  updateTurnMark();
  startVsPlayer();
}

nextRoundBtn.addEventListener("click", nextRound);

const restartBtn = document.querySelector(".game-board__button--restart");

export function restartGame() {
  const cells = document.querySelectorAll(".game-board__cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("played-x", "played-o", "winner-x", "winner-o");
  });

  resetBoard();
  updateCurrentPlayer();
  updateTurnMark();
  toggleGameEnded(false);
  setWinnerToCurrentPlayer();

  if ((playerType === "cpu") & (winner === currentPlayer)) {
    handleComputerMove();
  }
}

restartBtn.addEventListener("click", restartGame);
