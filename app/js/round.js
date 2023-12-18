import {
  updateCurrentPlayer,
  resetBoard,
  toggleGameEnded,
  updateTurnMark,
  playerType,
  currentPlayer,
  handleComputerMove,
  toggleDisplay,
  setCurrentPlayer,
  resetWinner,
  winner,
} from "./gameFunctions.js";

import { cpuMark } from "./gameVsCpu.js";

const modal = document.querySelector(".modal");
const nextRoundBtn = document.querySelector(".modal__next-round");
const restartBtn = document.querySelector(".game-board__button--restart");
const quitBtn = document.querySelector(".modal__quit");

export function showModal() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("show", "out");
  modal.classList.add("show");
}

export function hideModal() {
  const modal = document.querySelector(".modal");
  modal.classList.add("out");
}

function clearBoard() {
  const cells = document.querySelectorAll(".game-board__cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("played-x", "played-o", "winner-x", "winner-o");
  });
}

function resetGame() {
  clearBoard();
  resetBoard();
  updateCurrentPlayer();
  updateTurnMark();
  toggleGameEnded(false);

  if ((playerType === "cpu" && winner === currentPlayer) || cpuMark === "X") {
    handleComputerMove();
  }
}

nextRoundBtn.addEventListener("click", () => {
  hideModal();
  resetGame();
});

export function restartGame() {
  const modalRestart = document.querySelector("#restartGameModal");
  modalRestart.classList.remove("show", "out");
  modalRestart.classList.add("show");

  const confirmBtn = document.querySelector(".modal__restart-confirmed");
  const cancelBtn = document.querySelector(".modal__cancel");

  confirmBtn.addEventListener("click", () => {
    modalRestart.classList.add("out");
    resetGame();
  });

  cancelBtn.addEventListener("click", () => {
    modalRestart.classList.add("out");
  });
}

restartBtn.addEventListener("click", restartGame);

export function quitGame() {
  hideModal();
  toggleGameEnded(true);
  toggleDisplay();
  resetWinner();
  setCurrentPlayer("X");
}

quitBtn.addEventListener("click", quitGame);
