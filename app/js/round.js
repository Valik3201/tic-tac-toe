import {
  updateCurrentPlayer,
  resetBoard,
  toggleGameEnded,
  renderBoard,
  updateTurnMark,
} from "./gameFunctions.js";

const nextRoundBtn = document.querySelector(".modal__next-round");

function nextRound() {
  resetBoard();
  renderBoard();
  updateCurrentPlayer();
  updateTurnMark();
  startVsPlayer();
}

nextRoundBtn.addEventListener("click", nextRound);

const restartBtn = document.querySelector(".game-board__button--restart");

export function restartGame() {
  resetBoard();

  const cells = document.querySelectorAll(".game-board__cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("played-x", "played-o", "winner-x", "winner-o");
  });

  updateCurrentPlayer();
  updateTurnMark();

  toggleGameEnded();
}

restartBtn.addEventListener("click", restartGame);
