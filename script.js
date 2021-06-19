const gameBoard = (() => {
  const boardArray = new Array(9);
  const winArray = [];

  const getCell = (index) => boardArray[index];

  const setCell = (index, player) => {
    let currentCell = document.querySelector(`[data-value="${index}"]`);
    currentCell.textContent = player.getSign();
    boardArray[index] = player.getSign();
  };

  const getWinCell = (index) => winArray[index];

  const setWinCell = (value) => {
    winArray.push(value);
    console.log(winArray);
  };

  const clear = () => {
    for (let i = 0; i < boardArray.length; i++) {
      boardArray[i] = undefined;
    }
    for (let i = 0; i < 3; i++) winArray.pop();
  };
  return {
    getCell,
    setCell,
    clear,
    setWinCell,
    getWinCell,
  };
})();

const Player = (sign) => {
  let currentSign = sign;
  const getSign = () => currentSign;
  const setSign = (sign) => {
    currentSign = sign;
  };
  return {
    getSign,
    setSign,
  };
};

const Skynet = (() => {
  const skynetMove = () => Number.parseInt(Math.random() * 9);
  return {
    skynetMove,
  };
})();

const gameChief = (() => {
  let isFinished = false;
  const you = Player("X");
  const notYou = Player("O");
  const magicSquare = [4, 9, 2, 3, 5, 7, 8, 1, 6];

  const getYou = () => you;
  const GetNotYou = () => notYou;
  const getIsFinished = () => isFinished;

  const changeIsFinished = (status) => (isFinished = status);

  const changeSign = (sign) => {
    if (sign == "X") {
      you.setSign("X");
      notYou.setSign("O");
    } else {
      you.setSign("O");
      notYou.setSign("X");
    }
  };

  const endTheGame = (whoWon) => {
    changeIsFinished(true);
    let winText = document.querySelector("#result-game");
    if (whoWon == "Draw") {
      winText.textContent = "It's a draw";
    } else winText.textContent = `The winner is ${whoWon}`;
  };

  const isItDraw = (board) => {
    for (let i = 0; i < 9; i++) {
      console.log(board.getCell(i));
      if (board.getCell(i) == undefined) {
        return false;
      }
    }
    return true;
  };

  const checkWinner = (board, player) => {
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        for (let l = 0; l < 9; l++)
          if (i != j && i != l && j != l)
            if (
              board.getCell(i) === player.getSign() &&
              board.getCell(j) === player.getSign() &&
              board.getCell(l) === player.getSign()
            )
              if (magicSquare[i] + magicSquare[j] + magicSquare[l] == 15) {
                gameBoard.setWinCell(i);
                gameBoard.setWinCell(j);
                gameBoard.setWinCell(l);
                visualChief.displayWinCells();
                return true;
              }
  };

  const playerTurn = (index) => {
    const cell = gameBoard.getCell(index);
    if (cell == undefined) {
      gameBoard.setCell(index, you);
      if (checkWinner(gameBoard, you)) endTheGame(you.getSign());
      else if (isItDraw(gameBoard)) endTheGame("Draw");
      else {
        setTimeout(skynetTurn, 200);
      }
    }
  };

  const skynetTurn = () => {
    const index = Skynet.skynetMove();
    const cell = gameBoard.getCell(index);
    if (cell == undefined) {
      gameBoard.setCell(index, notYou);
      if (checkWinner(gameBoard, notYou)) endTheGame(notYou.getSign());
      else if (isItDraw(gameBoard)) endTheGame("Draw");
    } else skynetTurn();
  };

  const resetGame = () => {
    gameChief.changeIsFinished(false);
    let winText = document.querySelector("#result-game");
    winText.textContent = "";
    visualChief.resetCells();
    gameBoard.clear();

    if (you.getSign() == "O") {
      skynetTurn();
    }
  };

  return {
    getYou,
    GetNotYou,
    changeSign,
    playerTurn,
    skynetTurn,
    endTheGame,
    resetGame,
    getIsFinished,
    changeIsFinished,
  };
})();

const visualChief = (() => {
  const changeSignButton = document.querySelector("#togBtn");
  const gameCells = document.querySelectorAll(".game-cell");
  const resetButton = document.querySelector(".reset-button");

  const changePlayerSign = (sign) => {
    gameChief.changeSign(sign);
    gameChief.resetGame();
  };

  changeSignButton.addEventListener("click", () =>
    changeSignButton.checked ? changePlayerSign("O") : changePlayerSign("X")
  );

  gameCells.forEach((element, index) => {
    element.addEventListener("click", () => {
      if (gameChief.getIsFinished() == false) gameChief.playerTurn(index);
      else {
        gameChief.resetGame();
      }
    });
  });

  resetButton.addEventListener("click", gameChief.resetGame);

  const resetCells = () => {
    gameCells.forEach((e) => {
      e.textContent = "";
    });
    notDisplayWinCells();
  };

  const displayWinCells = () => {
    for (let i = 0; i < 3; i++) {
      let currentCell = document.querySelector(
        `[data-value="${gameBoard.getWinCell(i)}"]`
      );
      currentCell.classList.add("win-cell");
    }
  };

  const notDisplayWinCells = () => {
    for (let i = 0; i < 3; i++) {
      if (gameBoard.getWinCell(i) == undefined) return;
      let currentCell = document.querySelector(
        `[data-value="${gameBoard.getWinCell(i)}"]`
      );
      currentCell.classList.remove("win-cell");
    }
  };

  return {
    changePlayerSign,
    resetCells,
    displayWinCells,
    notDisplayWinCells,
  };
})();
