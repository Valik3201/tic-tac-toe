export let player1Score = 0;
export let player2Score = 0;
export let tiesScore = 0;

export function updateScores() {
  const player1ScoreElem = document.querySelector("#player1Score");
  player1ScoreElem.textContent = player1Score;

  const player2ScoreElem = document.querySelector("#player2Score");
  player2ScoreElem.textContent = player2Score;

  const tiesScoreElem = document.querySelector("#tiesScore");
  tiesScoreElem.textContent = tiesScore;
}

export function resetScores() {
  player1Score = 0;
  player2Score = 0;
  tiesScore = 0;
}

export function incrementPlayer1Score() {
  player1Score++;
}

export function incrementPlayer2Score() {
  player2Score++;
}

export function incrementTiesScore() {
  tiesScore++;
}
