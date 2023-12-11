const vsCPUButton = document.querySelector(".game-menu__start-btn--vs-cpu");

const game = {
  player1Mark: "", // Will store the mark (X or O) chosen by player 1
  currentPlayer: "X", // Will track the current player (X or O)

  board: Array(9).fill(""),

  choosePlayerAndMark: function (playerMark) {
    this.player1Mark = playerMark;
    this.currentPlayer = playerMark;

    console.log("Метка первого игрока выбрана:", this.player1Mark);
  },

  renderBoard: function () {
    const gameBoardField = document.querySelector(".game-board__field");
    gameBoardField.innerHTML = "";

    this.board.forEach((cell) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("game-board__cell");
      cellElement.textContent = cell;

      gameBoardField.appendChild(cellElement);
    });
  },

  toggleCurrentPlayer: function () {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  },

  updateTurnMark: function () {
    const turnMarkElement = document.querySelector(".game-board__turn-mark"); // Находит элемент с классом .game-board__turn-mark
    if (turnMarkElement) {
      turnMarkElement.textContent = this.currentPlayer; // Устанавливает текстовое содержимое элемента в текущую метку игрока (X или O)
    }
  },

  handlePlayerMove: function () {
    this.checkWinner(); // Проверяет, есть ли победитель после текущего хода
    this.toggleCurrentPlayer(); // Меняет текущего игрока (X на O и наоборот)
    this.updateTurnMark(); // Обновляет метку текущего игрока
  },

  playerScore: 0,
  player1Score: 0,
  player2Score: 0,
  tiesScore: 0,
  cpuScore: 0,

  updateScores: function () {
    const playerScoreElem = document.querySelector("#playerScore");
    const tiesScoreElem = document.querySelector("#tiesScore");
    const cpuScoreElem = document.querySelector("#cpuScore");

    playerScoreElem.textContent = this.playerScore;
    tiesScoreElem.textContent = this.tiesScore;
    cpuScoreElem.textContent = this.cpuScore;

    const player1ScoreElem = document.querySelector("#player1Score");
    const player2ScoreElem = document.querySelector("#player2Score");

    player1ScoreElem.textContent = this.player1Score;
    player2ScoreElem.textContent = this.player2Score;
  },

  checkWinner: function () {
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
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        console.log("Игрок", this.currentPlayer, "побеждает!");
        if (this.currentPlayer === "X") {
          this.player1Score++;
        } else if (this.currentPlayer === "O") {
          this.player2Score++;
        }
        this.updateScores();

        return;
      }
    }

    const isBoardFull = this.board.every((cell) => cell !== "");
    if (isBoardFull) {
      console.log("Игра окончена. Ничья!");
      this.tiesScore++;
      this.updateScores();
    }
  },

  buttonX: document.querySelector(".game-menu__mark-btn--x"),
  buttonO: document.querySelector(".game-menu__mark-btn--o"),

  init: function () {
    this.buttonX.addEventListener("click", () => this.choosePlayerAndMark("X"));
    this.buttonO.addEventListener("click", () => this.choosePlayerAndMark("O"));
  },

  vsPlayerButton: document.querySelector(".game-menu__start-btn--vs-player"),

  startVsPlayer: function () {
    this.vsPlayerButton.addEventListener("click", () => this.startNewRound());
  },

  gameBoard: document.querySelector(".game-board"),
  menu: document.querySelector(".game-menu"),

  startNewRound: function () {
    this.gameBoard.style.display = "flex";
    this.menu.style.display = "none";

    const yourScore = (document.querySelector(
      ".game-board__player-score"
    ).style.display = "none");
    const cpuScore = (document.querySelector(
      ".game-board__cpu-score"
    ).style.display = "none");

    this.renderBoard();

    if (this.player1Mark === "O") {
      this.toggleCurrentPlayer();
    }

    // Удаляем существующие обработчики событий перед добавлением новых
    const cells = document.querySelectorAll(".game-board__cell");
    cells.forEach((cell) => {
      cell.innerHTML = ""; // Очистить содержимое ячейки
      cell.removeEventListener("click", this.handleCellClick);
      cell.addEventListener("click", this.handleCellClick.bind(this));
    });
  },

  handleCellClick: function (event) {
    const cell = event.target;
    const index = Array.from(cell.parentNode.children).indexOf(cell);

    // Проверка, занята ли уже ячейка
    if (this.board[index] === "") {
      cell.innerHTML = this.currentPlayer;
      this.board[index] = this.currentPlayer;
      console.log("Игрок", this.currentPlayer, "ставит метку на клетку", index); // Выводит в консоль информацию о ходе игрока
      this.handlePlayerMove();
    } else {
      console.log("Ячейка уже занята!");
      // Можно добавить дополнительную логику, если ячейка уже занята (например, вывод сообщения)
    }
  },

  nextRoundBtn: document.querySelector(".modal__next-round"),

  nextRound: function () {
    this.nextRoundBtn.addEventListener("click", () => {
      const cells = document.querySelectorAll(".game-board__cell");

      this.board = Array(9).fill("");

      this.renderBoard(); // Очистить поле для нового раунда
      this.currentPlayer = "X"; // Вернуть текущего игрока к начальному значению
      this.updateTurnMark(); // Обновить метку текущего игрока

      game.startVsPlayer();
    });
  },
};

game.init();
game.startVsPlayer();
game.nextRound();
