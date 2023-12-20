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

const nextRoundBtn = document.querySelector(".modal__next-round");
const restartBtn = document.querySelector(".game-board__button--restart");
const quitBtn = document.querySelector(".modal__quit");

export function showModal(id) {
  const modal = document.querySelector(`#${id}`);
  modal.classList.remove("show", "out");
  modal.classList.add("show");
}

export function hideModal(id) {
  const modal = document.querySelector(`#${id}`);
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
  hideModal("roundResultModal");
  resetGame();
});

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

restartBtn.addEventListener("click", restartGame);

export function quitGame() {
  hideModal("roundResultModal");
  toggleGameEnded(true);
  toggleDisplay();
  resetWinner();
  setCurrentPlayer("X");
}

quitBtn.addEventListener("click", quitGame);

const logoElement = document.querySelector(".game-board__info .custom-logo");

logoElement.addEventListener("click", quitGame);
