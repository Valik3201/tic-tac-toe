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
} from "./gameFunctions.js";

const vsPlayerButton = document.querySelector(
  ".game-menu__start-btn--vs-player"
);

export function startVsPlayer() {
  // Сброс переменных игры

  console.log("Player 1: ", player1Mark);

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
  const player1ScoreDiv = document.createElement("div");
  player1ScoreDiv.classList.add("game-board__player-1-score");

  const player1Label = document.createElement("p");
  player1Label.classList.add("game-board__score-label");
  player1Label.textContent = `${player1Mark === "X" ? "X (P1)" : "X (P2)"}`;

  const player1Score = document.createElement("p");
  player1Score.classList.add("game-board__score");
  player1Score.id = "player1Score";
  player1Score.textContent = "0";

  player1ScoreDiv.appendChild(player1Label);
  player1ScoreDiv.appendChild(player1Score);

  const tiesScoreDiv = document.createElement("div");
  tiesScoreDiv.classList.add("game-board__ties-score");

  const tiesLabel = document.createElement("p");
  tiesLabel.classList.add("game-board__score-label");
  tiesLabel.textContent = "TIES";

  const tiesScore = document.createElement("p");
  tiesScore.classList.add("game-board__score");
  tiesScore.id = "tiesScore";
  tiesScore.textContent = "0";

  tiesScoreDiv.appendChild(tiesLabel);
  tiesScoreDiv.appendChild(tiesScore);

  const player2ScoreDiv = document.createElement("div");
  player2ScoreDiv.classList.add("game-board__player-2-score");

  const player2Label = document.createElement("p");
  player2Label.classList.add("game-board__score-label");
  player2Label.textContent = `${player1Mark === "X" ? "O (P2)" : "O (P1)"}`;

  const player2Score = document.createElement("p");
  player2Score.classList.add("game-board__score");
  player2Score.id = "player2Score";
  player2Score.textContent = "0";

  player2ScoreDiv.appendChild(player2Label);
  player2ScoreDiv.appendChild(player2Score);

  // Добавляем созданные элементы в контейнер для очков
  const scoresContainer = document.querySelector(".game-board__scores");
  scoresContainer.innerHTML = "";
  scoresContainer.appendChild(player1ScoreDiv);
  scoresContainer.appendChild(tiesScoreDiv);
  scoresContainer.appendChild(player2ScoreDiv);

  startVsPlayer();
});
