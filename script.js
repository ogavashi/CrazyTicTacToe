const gameBoard = (() => {
  const boardArray = new Array(9);

  const getCell = (index) => boardArray[index];

  const setCell = (index, player) => {
    let currentCell = document.querySelector(`[data-value="${index}"]`);
    currentCell.textContent = player.getSign();
    boardArray[index] = player.getSign();
  };
  return {
    getCell,
    setCell,
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
  const you = Player("X");
  const notYou = Player("O");
  const magicSquare = [4, 9, 2, 3, 5, 7, 8, 1, 6];

  const getYou = () => you;
  const GetNotYou = () => notYou;

  const changeSign = (sign) => {
    if (sign == "X") {
      you.setSign("X");
      notYou.setSign("O");
    } else {
      you.setSign("O");
      notYou.setSign("X");
      console.log(you.getSign());
    }
  };

  const endTheGame = (whoWon) => {
    if (whoWon == "Draw") console.log("It's a draw");
    else console.log(`The winner is ${whoWon}`);
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
              if (magicSquare[i] + magicSquare[j] + magicSquare[l] == 15) return true;
  };

  const playerTurn = (index) => {
    const cell = gameBoard.getCell(index);
    if (cell == undefined) {
      gameBoard.setCell(index, you);
      if (checkWinner(gameBoard, you)) endTheGame(you.getSign());
      else if (isItDraw(gameBoard)) endTheGame("Draw");
      else {
        skynetTurn();
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

  return {
    getYou,
    GetNotYou,
    changeSign,
    playerTurn,
    skynetTurn,
    endTheGame,
  };
})();

const visualChief = (() => {
  const changeSignButton = document.querySelector("#togBtn");
  const gameCells = document.querySelectorAll(".game-cell");

  const changePlayerSign = (sign) => {
    gameChief.changeSign(sign);
  };

  changeSignButton.addEventListener("click", () =>
    changeSignButton.checked ? changePlayerSign("O") : changePlayerSign("X")
  );

  gameCells.forEach((element, index) => {
    element.addEventListener("click", () => gameChief.playerTurn(index));
  });
  return {
    changePlayerSign,
  };
})();
