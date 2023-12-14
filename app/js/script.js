let player1Mark = "";
let currentPlayer = "X";
let board = Array(9).fill("");
let playerScore = 0;
let player1Score = 0;
let player2Score = 0;
let tiesScore = 0;
let cpuScore = 0;
let winner = null;

let gameEnded = false;

const gameBoard = document.querySelector(".game-board");

function choosePlayerAndMark(playerMark) {
  player1Mark = playerMark;
  currentPlayer = playerMark;
  console.log("Метка первого игрока выбрана:", player1Mark);
}

function renderBoard() {
  const gameBoardField = document.querySelector(".game-board__field");
  gameBoardField.innerHTML = "";

  board.forEach((_value, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("game-board__cell");
    cellElement.setAttribute("data-index", index);

    gameBoardField.appendChild(cellElement);
  });
}

function toggleCurrentPlayer() {
  if (!gameEnded) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  } else {
    // Если игра завершена, устанавливаем currentPlayer в победителя (если есть)
    currentPlayer = winner || currentPlayer;
  }
}

function updateTurnMark() {
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

function handlePlayerMove() {
  checkWinner();
  toggleCurrentPlayer();
  updateTurnMark();
}

function updateScores() {
  const playerScoreElem = document.querySelector("#playerScore");
  const tiesScoreElem = document.querySelector("#tiesScore");
  const cpuScoreElem = document.querySelector("#cpuScore");

  playerScoreElem.textContent = playerScore;
  tiesScoreElem.textContent = tiesScore;
  cpuScoreElem.textContent = cpuScore;

  const player1ScoreElem = document.querySelector("#player1Score");
  const player2ScoreElem = document.querySelector("#player2Score");

  player1ScoreElem.textContent = player1Score;
  player2ScoreElem.textContent = player2Score;
}

function checkWinner() {
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
      console.log("Игрок", currentPlayer, "побеждает!");

      winner = currentPlayer;

      if (currentPlayer === "X") {
        player1Score++;
      } else if (currentPlayer === "O") {
        player2Score++;
      }
      gameEnded = true;

      updateScores();

      // Добавляем классы выигрышным ячейкам с задержкой
      pattern.forEach((index, i) => {
        setTimeout(() => {
          const cell = document.querySelector(
            `.game-board__cell[data-index="${index}"]`
          );
          cell.classList.add(`winner-${currentPlayer.toLowerCase()}`);
        }, i * 500); // Задержка в миллисекундах между добавлениями классов
      });

      return pattern; // Возвращаем выигрышную комбинацию
    }
  }

  const isBoardFull = board.every((cell) => cell !== "");
  if (isBoardFull) {
    console.log("Игра окончена. Ничья!");
    tiesScore++;
    updateScores();

    winner = null;
    gameEnded = true;
  }

  // Если никто не выиграл, возвращаем null
  return null;
}

function init() {
  const buttonX = document.querySelector(".game-menu__mark-btn--x");
  const buttonO = document.querySelector(".game-menu__mark-btn--o");

  buttonX.addEventListener("click", () => choosePlayerAndMark("X"));
  buttonO.addEventListener("click", () => choosePlayerAndMark("O"));
  gameBoard.style.display = "none";

  const yourScore = (document.querySelector(
    ".game-board__player-score"
  ).style.display = "none");
  const cpuScore = (document.querySelector(
    ".game-board__cpu-score"
  ).style.display = "none");
}

const vsPlayerButton = document.querySelector(
  ".game-menu__start-btn--vs-player"
);

function startVsPlayer() {
  vsPlayerButton.addEventListener("click", () => startNewRound());
}

function toggleDisplay() {
  const menu = document.querySelector(".game-menu");

  if (gameBoard.style.display === "none") {
    gameBoard.style.display = "flex";
    menu.style.display = "none";
  } else {
    gameBoard.style.display = "none";
    menu.style.display = "flex";
  }
}

function startNewRound() {
  // Проверяем, завершена ли игра
  if (gameEnded) {
    console.log("Игра завершена. Нельзя начать новый раунд.");
    return;
  }

  toggleDisplay();
  renderBoard();

  if (player1Mark === "O") {
    toggleCurrentPlayer();
  }

  const cells = document.querySelectorAll(".game-board__cell");

  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick);
  });
}

const handleCellClick = (event) => {
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

    cell.innerHTML = ""; // Очищаем содержимое ячейки перед добавлением SVG
    cell.appendChild(svg);

    cell.classList.add(`played-${currentPlayer.toLowerCase()}`);

    board[index] = currentPlayer;
    console.log("Игрок", currentPlayer, "ставит метку на клетку", index);
    handlePlayerMove();
  } else {
    console.log("Ячейка уже занята!");
  }
};

const nextRoundBtn = document.querySelector(".modal__next-round");

function nextRound() {
  nextRoundBtn.addEventListener("click", () => {
    const cells = document.querySelectorAll(".game-board__cell");
    board = Array(9).fill("");
    renderBoard();
    currentPlayer = winner || "X";
    updateTurnMark();
    startVsPlayer();
  });
}

const restartBtn = document.querySelector(".game-board__button--restart");

function restartGame() {
  board = Array(9).fill("");

  const cells = document.querySelectorAll(".game-board__cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("played-x", "played-o", "winner-x", "winner-o");
  });

  currentPlayer = winner || "X";
  updateTurnMark();

  gameEnded = false;
}

restartBtn.addEventListener("click", restartGame);

const logoElement = document.querySelector(".game-board__info .custom-logo");

logoElement.addEventListener("click", () => {
  toggleDisplay();
  restartGame();
});

init();
startVsPlayer();
nextRound();
