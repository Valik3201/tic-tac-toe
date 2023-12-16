import { checkWinner } from "./checkWinner.js";
import { cpuMark } from "./gameVsCpu.js";

export function findBestMove(board, currentPlayer) {
  // Проверяем, есть ли выигрышный ход для компьютера
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = currentPlayer;
      if (checkWinner(board, currentPlayer)) {
        board[i] = ""; // Отменяем ход
        return i;
      }
      board[i] = ""; // Отменяем ход
    }
  }

  // Если центр свободен, занимаем его
  if (board[4] === "") {
    return 4;
  }

  // Пытаемся занять угловые клетки
  const corners = [0, 2, 6, 8];
  for (const corner of corners) {
    if (board[corner] === "") {
      return corner;
    }
  }

  // Занимаем любую свободную боковую клетку
  const sideCell = [1, 3, 5, 7];
  for (const side of sideCell) {
    if (board[side] === "") {
      return side;
    }
  }

  // Если все клетки заняты, возвращаем -1 (невозможный ход)
  return -1;
}

export function logComputerMove(cellIndex, currentPlayer) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "64");
  svg.setAttribute("height", "64");

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute(
    "xlink:href",
    `./app/assets/icons.svg#icon-${currentPlayer.toLowerCase()}`
  );

  svg.appendChild(use);

  const cell = document.querySelector(
    `.game-board__cell[data-index="${cellIndex}"]`
  );
  cell.innerHTML = "";
  cell.appendChild(svg);

  cell.classList.add(`played-${currentPlayer.toLowerCase()}`);

  console.log("Компьютер", currentPlayer, "ставит метку на клетку", cellIndex);
}
