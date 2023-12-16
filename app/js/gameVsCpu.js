import {
  player1Mark,
  resetWinner,
  resetBoard,
  setCurrentPlayer,
  toggleDisplay,
  renderBoard,
  toggleCurrentPlayer,
  updateTurnMark,
  handleComputerMove,
  handleCellClick,
  setPlayerType,
  currentPlayer,
} from "./gameFunctions.js";

import { resetScores, updateScores } from "./scores.js";

import { createAndAppendScoreElements } from "./scoreboardUtils.js";

export let cpuMark;

const vsCpuButton = document.querySelector(".game-menu__start-btn--vs-cpu");

export function startVsCPU() {
  setPlayerType("cpu");

  cpuMark = currentPlayer === "X" ? "O" : "X";
  console.log("Метка игрока CPU :", cpuMark);

  // Сброс переменных игры
  resetWinner();
  resetBoard();

  // Сброс счетчиков и обновление отображения
  resetScores();
  updateScores();

  // Переключение отображения и отрисовка доски
  toggleDisplay();
  renderBoard();

  // Если метка не выбрана или выбрана "X", первый ход делает "X"
  if (!player1Mark || player1Mark === "X") {
    setCurrentPlayer("X");
  } else {
    // Если выбрана "O", переключаем текущего игрока
    toggleCurrentPlayer();
    updateTurnMark();

    handleComputerMove();
  }

  const cells = document.querySelectorAll(".game-board__cell");
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick);
  });
}

vsCpuButton.addEventListener("click", () => {
  createAndAppendScoreElements(player1Mark, "cpu");
  startVsCPU();
});
