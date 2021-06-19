const gameBoard = (() => {
  const boardArray = new Array(9);

  const getCell = (index) => boardArray[index];

  const setCell = (index, player) => {
    let currentCell = document.querySelector(`[data-value="${index}"]`);
    currentCell.textContent = player.getSign();
    boardArray[index] = player.getSign();
    console.log(boardArray);
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

const gameChief = (() => {
  const you = Player("X");
  const notYou = Player("O");

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

  const playerTurn = (index) => {
    const cell = gameBoard.getCell(index);
    if (cell == undefined) {
      gameBoard.setCell(index, you);
    }
  };

  return {
    getYou,
    GetNotYou,
    changeSign,
    playerTurn,
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
      changePlayerSign
  }
})();
