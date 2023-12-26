import {
  currentPlayer,
  gameEnded,
  board,
  handlePlayerMove,
  handleComputerMove,
  toggleGameEnded,
  playerType,
  player1Mark,
} from "./gameFunctions.js";

import { cpuMark } from "./gameVsCpu.js";

/** @type {HTMLElement} */
export const gameBoard = document.querySelector(".game-board");

/**
 * Renders the game board on the screen.
 *
 * @returns {void}
 */
export function renderBoard() {
  const gameBoardField = document.querySelector(".game-board__field");
  gameBoardField.innerHTML = "";

  board.forEach((_value, index) => {
    const cellElement = document.createElement("div");

    cellElement.classList.add(
      "game-board__cell",
      `playing-${currentPlayer.toLowerCase()}`
    );
    cellElement.setAttribute("data-index", index);

    gameBoardField.appendChild(cellElement);
  });
}

/**
 * Updates the turn mark and player icons on the game board.
 *
 * @returns {void}
 */
export function updateTurnMark() {
  const turnMarkElement = document.querySelector(".game-board__turn-mark");
  const cells = document.querySelectorAll(".game-board__cell");

  if (turnMarkElement) {
    const iconLink = currentPlayer === "X" ? "#icon-x" : "#icon-o";

    turnMarkElement
      .querySelector("use")
      .setAttribute("xlink:href", `./app/assets/icons.svg${iconLink}`);
  }

  cells.forEach((cellElement) => {
    // Remove all player-related classes
    cellElement.classList.remove("playing-x", "playing-o");

    if (playerType !== "cpu" || player1Mark === currentPlayer) {
      cellElement.classList.add(`playing-${currentPlayer.toLowerCase()}`);
    }
  });
}

/**
 * Toggles the display between the game board and the menu.
 *
 * @returns {void}
 */
export function toggleDisplay() {
  const menu = document.querySelector(".game-menu");

  if (gameBoard.style.display === "none") {
    gameBoard.style.display = "flex";
    menu.style.display = "none";
  } else {
    gameBoard.style.display = "none";
    menu.style.display = "flex";
  }

  toggleGameEnded(false);
}

/**
 * Handles a cell click event, allowing the player to make a move.
 *
 * @param {Event} event - The click event on a game cell.
 * @returns {void}
 */
export const handleCellClick = (event) => {
  if (gameEnded) {
    console.log("Game over");
    return;
  }

  if (!gameEnded && playerType === "cpu" && currentPlayer !== player1Mark) {
    console.log("Opponent's move - ", currentPlayer);
    return;
  }

  const cell = event.target;
  const index = Array.from(cell.parentNode.children).indexOf(cell);

  if (board[index] === "") {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute(
      "xlink:href",
      `./app/assets/icons.svg#icon-${currentPlayer.toLowerCase()}`
    );

    svg.appendChild(use);

    cell.innerHTML = "";
    cell.appendChild(svg);

    cell.classList.add(`played-${currentPlayer.toLowerCase()}`);

    board[index] = currentPlayer;
    console.log("Player", currentPlayer, "places a mark on cell", index);

    handlePlayerMove();

    if (
      playerType === "cpu" &&
      !gameEnded &&
      currentPlayer === cpuMark &&
      player1Mark !== cpuMark
    ) {
      handleComputerMove();
    }
  } else {
    console.log("Cell is already occupied!");
  }
};
