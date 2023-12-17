import { checkWinner } from "./checkWinner.js";
import { findBestMove, logComputerMove } from "./cpuMove.js";

import { cpuMark } from "./gameVsCpu.js";

export let player1Mark = "X";
export let currentPlayer = "X";
export let winner = null;
export let gameEnded = false;
export let board = Array(9).fill("");

export let playerType = "";

export function setPlayerType(type) {
  playerType = type;
}

export function setCurrentPlayer(mark) {
  currentPlayer = mark;
  console.log("Установлен игрок 1:", currentPlayer);
}

export function resetWinner() {
  winner = null;
}

export function updateCurrentPlayer() {
  currentPlayer = winner || "X";
}

export function setWinnerToCurrentPlayer() {
  winner = currentPlayer;
}

export function toggleGameEnded(newStatus) {
  gameEnded = newStatus;
  console.info("Игра окончена:", gameEnded ? "Да" : "Нет");
}

export function resetBoard() {
  board = Array(9).fill("");
}

export const gameBoard = document.querySelector(".game-board");

export function choosePlayerAndMark(playerMark) {
  player1Mark = playerMark;
  currentPlayer = playerMark;
  console.log("Метка первого игрока выбрана:", player1Mark);
}

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

export function toggleCurrentPlayer() {
  if (!gameEnded) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  } else {
    currentPlayer = winner || currentPlayer;
  }
}

export function updateTurnMark() {
  const turnMarkElement = document.querySelector(".game-board__turn-mark");
  const cells = document.querySelectorAll(".game-board__cell");

  if (turnMarkElement) {
    const iconLink = currentPlayer === "X" ? "#icon-x" : "#icon-o";

    turnMarkElement
      .querySelector("use")
      .setAttribute("xlink:href", `./app/assets/icons.svg${iconLink}`);
  }

  // Обновление классов ячеек
  cells.forEach((cellElement) => {
    // Удаляем все классы, связанные с игроками
    cellElement.classList.remove("playing-x", "playing-o");
    cellElement.classList.add(`playing-${currentPlayer.toLowerCase()}`);

    if (!gameEnded) {
      // Добавляем соответствующий класс в зависимости от текущего игрока
      cellElement.classList.add(`playing-${currentPlayer.toLowerCase()}`);
    }
  });
}

export function handlePlayerMove() {
  checkWinner(board, currentPlayer);
  toggleCurrentPlayer();
  updateTurnMark();
}

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

export const handleCellClick = (event) => {
  if (gameEnded) {
    console.log("%cИгра окончена", "color: orangered; font-weight: bold;");

    return;
  }

  const cell = event.target;
  const index = Array.from(cell.parentNode.children).indexOf(cell);

  if (board[index] === "") {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "64");
    svg.setAttribute("height", "64");

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
    console.log("Игрок", currentPlayer, "ставит метку на клетку", index);

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
    console.log("Ячейка уже занята!");
  }
};

export function handleComputerMove() {
  const computerMoveIndex = findBestMove(board, currentPlayer);

  if (computerMoveIndex !== -1 && currentPlayer === cpuMark) {
    logComputerMove(computerMoveIndex, currentPlayer);
    board[computerMoveIndex] = currentPlayer;

    toggleCurrentPlayer();
    updateTurnMark();
  }
}
