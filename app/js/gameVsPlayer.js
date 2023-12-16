import { resetScores, updateScores } from "./scores.js";
import {
  player1Mark,
  setCurrentPlayer,
  resetBoard,
  resetWinner,
  renderBoard,
  toggleCurrentPlayer,
  updateTurnMark,
  toggleDisplay,
  handleCellClick,
  setPlayerType,
} from "./gameFunctions.js";

import { createAndAppendScoreElements } from "./scoreboardUtils.js";

const vsPlayerButton = document.querySelector(
  ".game-menu__start-btn--vs-player"
);

export function startVsPlayer() {
  setPlayerType("player");

  // Сброс переменных игры
  resetWinner();
  resetBoard();

  // Сброс счетчиков и обновление отображения
  resetScores();
  updateScores();

  // Если метка не выбрана или выбрана "X", первый ход делает "X"
  if (!player1Mark || player1Mark === "X") {
    setCurrentPlayer("X");
  } else {
    // Если выбрана "O", переключаем текущего игрока
    toggleCurrentPlayer();
    updateTurnMark();
  }

  // Переключение отображения и отрисовка доски
  toggleDisplay();
  renderBoard();

  // Добавление обработчиков событий на ячейки
  const cells = document.querySelectorAll(".game-board__cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick);
  });
}

vsPlayerButton.addEventListener("click", () => {
  createAndAppendScoreElements(player1Mark, "player");
  startVsPlayer();
});
