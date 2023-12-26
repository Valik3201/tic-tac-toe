/**
 * Creates an HTML element with optional class name and id.
 *
 * @param {string} tag - The HTML tag name for the element.
 * @param {string} [className] - The optional class name to add to the element.
 * @param {string} [id] - The optional id to assign to the element.
 * @returns {HTMLElement} - The created HTML element.
 */
function createElement(tag, className, id) {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (id) element.id = id;
  return element;
}

/**
 * Creates and returns a score element with label and initial value.
 *
 * @param {string} labelText - The label text for the score element.
 * @param {string} scoreId - The id for the score element.
 * @param {string} initialValue - The initial value for the score element.
 * @param {string} scoreClass - The class for the score element.
 * @returns {HTMLElement} - The created score element.
 */
function createScoreElement(labelText, scoreId, initialValue, scoreClass) {
  const scoreDiv = createElement("div", scoreClass);
  const label = createElement("p", "game-board__score-label");
  label.textContent = labelText;

  const score = createElement("p", "game-board__score");
  score.id = scoreId;
  score.textContent = initialValue;

  scoreDiv.appendChild(label);
  scoreDiv.appendChild(score);

  return scoreDiv;
}

/**
 * Creates and appends score elements for player 1, ties, and player 2.
 *
 * @param {string} player1Mark - The mark for player 1.
 * @param {string} playerType - The type of player ("cpu" or "player").
 * @returns {void}
 */
export function createAndAppendScoreElements(player1Mark, playerType) {
  const scoresContainer = document.querySelector(".game-board__scores");
  scoresContainer.textContent = "";

  let player1Label, player2Label;

  if (playerType === "cpu") {
    player1Label = `${player1Mark === "X" ? "X (YOU)" : "X (CPU)"}`;
    player2Label = `${player1Mark === "X" ? "O (CPU)" : "O (YOU)"}`;
  } else if (playerType === "player") {
    player1Label = `${player1Mark === "X" ? "X (P1)" : "X (P2)"}`;
    player2Label = `${player1Mark === "X" ? "O (P2)" : "O (P1)"}`;
  }

  const player1ScoreDiv = createScoreElement(
    player1Label,
    "player1Score",
    "0",
    "game-board__player-1-score"
  );
  const tiesScoreDiv = createScoreElement(
    "TIES",
    "tiesScore",
    "0",
    "game-board__ties-score"
  );
  const player2ScoreDiv = createScoreElement(
    player2Label,
    "player2Score",
    "0",
    "game-board__player-2-score"
  );

  scoresContainer.appendChild(player1ScoreDiv);
  scoresContainer.appendChild(tiesScoreDiv);
  scoresContainer.appendChild(player2ScoreDiv);
}
