export function createAndAppendScoreElements(player1Mark, playerType) {
  const player1ScoreDiv = document.createElement("div");
  player1ScoreDiv.classList.add("game-board__player-1-score");

  const player1Label = document.createElement("p");
  player1Label.classList.add("game-board__score-label");

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

  const player2Score = document.createElement("p");
  player2Score.classList.add("game-board__score");
  player2Score.id = "player2Score";
  player2Score.textContent = "0";

  if (playerType === "player") {
    player1Label.textContent = `${player1Mark === "X" ? "X (P1)" : "X (P2)"}`;
    player2Label.textContent = `${player1Mark === "X" ? "O (P2)" : "O (P1)"}`;
  } else if (playerType === "cpu") {
    player1Label.textContent = `${player1Mark === "X" ? "X (YOU)" : "X (CPU)"}`;
    player2Label.textContent = `${player1Mark === "X" ? "O (CPU)" : "O (YOU)"}`;
  }

  player2ScoreDiv.appendChild(player2Label);
  player2ScoreDiv.appendChild(player2Score);

  const scoresContainer = document.querySelector(".game-board__scores");
  scoresContainer.innerHTML = "";
  scoresContainer.appendChild(player1ScoreDiv);
  scoresContainer.appendChild(tiesScoreDiv);
  scoresContainer.appendChild(player2ScoreDiv);
}
