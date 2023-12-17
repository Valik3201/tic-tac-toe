import {
  toggleGameEnded,
  setWinnerToCurrentPlayer,
  resetWinner,
  winner,
  player1Mark,
} from "./gameFunctions.js";

import {
  updateScores,
  incrementPlayer1Score,
  incrementPlayer2Score,
  incrementTiesScore,
} from "./scores.js";

export function checkWinner(board, player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Горизонтальные линии
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Вертикальные линии
    [0, 4, 8],
    [2, 4, 6], // Диагонали
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      // Вывод сообщения о победе в консоль
      console.log(
        "%cИгрок " + player + " побеждает!",
        "color: lawngreen; font-weight: bold;"
      );

      const modal = document.querySelector(".modal");
      modal.style.visibility = "visible";

      const modalTextWinner = document.querySelector(".modal__text");
      modalTextWinner.innerHTML =
        winner !== player1Mark ? "YOU WON!" : "OH NO, YOU LOST…";

      const modalText = document.querySelector(".modal__win-message");
      modalText.classList.remove("winner-x", "winner-o");
      modalText.classList.add(`winner-${player.toLowerCase()}`);
      modalText.innerHTML = `
          <svg width="64" height="64" fill="currentColor">
            <use xlink:href="./app/assets/icons.svg#icon-${player.toLowerCase()}"></use>
          </svg>
        <p>TAKES THE ROUND</p>
      `;

      toggleGameEnded(true);

      setWinnerToCurrentPlayer();

      if (player === "X") {
        incrementPlayer1Score();
      } else if (player === "O") {
        incrementPlayer2Score();
      }

      updateScores();

      // Добавляем классы выигрышным ячейкам с задержкой
      pattern.forEach((index, i) => {
        setTimeout(() => {
          const cell = document.querySelector(
            `.game-board__cell[data-index="${index}"]`
          );
          cell.classList.add(`winner-${player.toLowerCase()}`);
        }, i * 500); // Задержка в миллисекундах между добавлениями классов
      });

      return pattern; // Возвращаем выигрышную комбинацию
    }
  }

  const isBoardFull = board.every((cell) => cell !== "");

  if (isBoardFull) {
    console.log(
      "%cИгра окончена. Ничья!",
      "color: cornflowerblue; font-weight: bold;"
    );

    const modal = document.querySelector(".modal");
    modal.style.visibility = "visible";

    const modalText = document.querySelector(".modal__win-message");
    modalText.classList.remove("winner-x", "winner-o");
    modalText.classList.add("tied");
    modalText.innerHTML = `<p>ROUND TIED</p>`;

    incrementTiesScore();
    updateScores();

    resetWinner();
    toggleGameEnded(true);
  }

  // Если никто не выиграл, возвращаем null
  return null;
}
