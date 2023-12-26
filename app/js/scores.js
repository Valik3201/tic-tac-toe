/**
 * The score for player 1.
 * @type {number}
 */
export let player1Score = 0;

/**
 * The score for player 2.
 * @type {number}
 */
export let player2Score = 0;

/**
 * The score for ties.
 * @type {number}
 */
export let tiesScore = 0;

/**
 * Updates the displayed scores in the UI.
 * @returns {void}
 */
export function updateScores() {
  const player1ScoreElem = document.querySelector("#player1Score");
  player1ScoreElem.textContent = player1Score;

  const player2ScoreElem = document.querySelector("#player2Score");
  player2ScoreElem.textContent = player2Score;

  const tiesScoreElem = document.querySelector("#tiesScore");
  tiesScoreElem.textContent = tiesScore;
}

/**
 * Resets all scores to zero.
 * @returns {void}
 */
export function resetScores() {
  player1Score = 0;
  player2Score = 0;
  tiesScore = 0;
}

/**
 * Increments the score for player 1.
 * @returns {void}
 */
export function incrementPlayer1Score() {
  player1Score++;
}

/**
 * Increments the score for player 2.
 * @returns {void}
 */
export function incrementPlayer2Score() {
  player2Score++;
}

/**
 * Increments the score for ties.
 * @returns {void}
 */
export function incrementTiesScore() {
  tiesScore++;
}
