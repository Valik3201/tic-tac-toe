import { checkWinner } from "./checkWinner.js";

export let player1Mark = "X";

export let currentPlayer = "X";

export function setCurrentPlayer(n) {
  currentPlayer = n;
}

export let winner = null;

export function resetWinner() {
  winner = null;
}

export function updateCurrentPlayer() {
  currentPlayer = winner || "X";
}

export function setWinnerToCurrentPlayer() {
  winner = currentPlayer;
}

export let gameEnded = false;

export function toggleGameEnded() {
  gameEnded = !gameEnded;
}

export let board = Array(9).fill("");

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
    cellElement.classList.add("game-board__cell");
    cellElement.setAttribute("data-index", index);

    gameBoardField.appendChild(cellElement);
  });
}

export function toggleCurrentPlayer() {
  if (!gameEnded) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  } else {
    // Если игра завершена, устанавливаем currentPlayer в победителя (если есть)
    currentPlayer = winner || currentPlayer;
  }
}

export function updateTurnMark() {
  const turnMarkElement = document.querySelector(".game-board__turn-mark");

  if (turnMarkElement) {
    // Определяем ссылку на иконку в зависимости от текущего игрока
    const iconLink = currentPlayer === "X" ? "#icon-x" : "#icon-o";

    // Устанавливаем новую ссылку на иконку
    turnMarkElement
      .querySelector("use")
      .setAttribute("xlink:href", `./app/assets/icons.svg${iconLink}`);
  }
}

export function handlePlayerMove() {
  checkWinner();
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
}

export const handleCellClick = (event) => {
  if (gameEnded) {
    console.log("Игра завершена. Нельзя поставить метку.");
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
  } else {
    console.log("Ячейка уже занята!");
  }
};
