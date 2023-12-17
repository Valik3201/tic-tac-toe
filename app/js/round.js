import {
  updateCurrentPlayer,
  resetBoard,
  toggleGameEnded,
  updateTurnMark,
  setWinnerToCurrentPlayer,
  playerType,
  currentPlayer,
  handleComputerMove,
  toggleDisplay,
  setCurrentPlayer,
  resetWinner,
} from "./gameFunctions.js";

import { winner } from "./gameFunctions.js";

const nextRoundBtn = document.querySelector(".modal__next-round");

function nextRound() {
  const modal = document.querySelector(".modal");
  modal.style.visibility = "hidden";

  const cells = document.querySelectorAll(".game-board__cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("played-x", "played-o", "winner-x", "winner-o");
  });

  resetBoard();
  updateCurrentPlayer();
  updateTurnMark();
  toggleGameEnded(false);

  if ((playerType === "cpu") & (winner === currentPlayer)) {
    handleComputerMove();
  }
}

nextRoundBtn.addEventListener("click", nextRound);

const restartBtn = document.querySelector(".game-board__button--restart");

export function restartGame() {
  const modal = document.querySelector("#restartGameModal");
  modal.style.visibility = "visible";

  const confirmBtn = document.querySelector(".modal__restart-confirmed");
  const cancelBtn = document.querySelector(".modal__cancel");

  confirmBtn.addEventListener("click", () => {
    modal.style.visibility = "hidden";

    const cells = document.querySelectorAll(".game-board__cell");
    cells.forEach((cell) => {
      cell.innerHTML = "";
      cell.classList.remove("played-x", "played-o", "winner-x", "winner-o");
    });

    resetBoard();
    updateCurrentPlayer();
    updateTurnMark();
    toggleGameEnded(false);

    if ((playerType === "cpu") & (winner === currentPlayer)) {
      handleComputerMove();
    }
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.visibility = "hidden";
  });
}

restartBtn.addEventListener("click", restartGame);

const quitBtn = document.querySelector(".modal__quit");

export function quitGame() {
  const modal = document.querySelector(".modal");
  modal.style.visibility = "hidden";

  toggleGameEnded(true);
  toggleDisplay();
  resetWinner();
  setCurrentPlayer("X");
}

quitBtn.addEventListener("click", quitGame);
