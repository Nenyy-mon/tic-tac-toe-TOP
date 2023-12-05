const displayMessage = (()=> {
  const renderMessage = (message) => {
    document.querySelector("#message").innerHTML = message
    
  }

  return {
    renderMessage,
  }
})();


  const Gameboard = (() => {
  let gameboard = ["","","","","","","","",""]

  const render = () => {
    let boardHTML = "";

    gameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`
    })
    document.querySelector("#board").innerHTML = boardHTML
    const squares = document.querySelectorAll(".square")
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick)
    })
   
  }
  const update = (index, value) => {
   gameboard[index] = value;
    render();
  }

  const getGameboard = () => gameboard

  return {
    render,
    update,
    getGameboard,
  }
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark
  }
}


const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;


  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value,"X"),
      createPlayer(document.querySelector("#player2").value,"O")
    ]
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render()
  
  }
  const handleClick  = (event) => {
    let index = event.target.id.split("-")[1]
    console.log(index)
    console.log(players[currentPlayerIndex].name)
    if(Gameboard.getGameboard()[index] !== "") 
      return;

    Gameboard.update(index, players[currentPlayerIndex].mark)

    if(checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
      gameOver = true;
      displayMessage.renderMessage(`${players[currentPlayerIndex].name} wins! `)
      document.querySelector("#message").classList.add("active")
      document.querySelector("#message").classList.remove("hidden")
     
    } else if (checkForTie(Gameboard.getGameboard())) {
      gameOver = true;
      displayMessage.renderMessage(`It's a tie!`)
      document.querySelector("#message").classList.add("active")
      document.querySelector("#message").classList.remove("hidden")
    }
    
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 :0
  }

  const restart = () => {
    for (let i = 0; i< 9; i++) {
      Gameboard.update(i, "")
    }
    Gameboard.render()
  }

  return {
    start,
    restart,
    handleClick
  }
})();

function checkForTie(board) {
  return board.every(cell=> cell !== '')
}
document.querySelector("#message").addEventListener("click", () => {
  document.querySelector("#message").classList.remove("active")
  document.querySelector("#message").classList.add("hidden")
})
function checkForWin(board) {
  const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]
  for (let i = 0;i<winningCombination.length; i++) {
    const [a,b,c] = winningCombination[i];
    if(board[a] && board[a]=== board[b] && board[a] === board[c]) {
      return true;
    } 
  }
  return false;
}

const restartBtn = document.querySelector("#restartBtn")
restartBtn.addEventListener("click",() => Game.restart())

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener('click', () => {
  Game.start()
})