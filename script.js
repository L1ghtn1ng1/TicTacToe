function GameBoard() {
  const board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
          board[i].push(null);
        }
    }
    const getBoard = () => board;
    const setBoard = (row, col, player) => {
      if (board[row][col] === null) {
        board[row][col] = player.getMark();
        return true
      }
      else{
       alert('Invalid move');
       return false;
      }
    }
    return { getBoard, setBoard};
}

function Player(name, mark) {
  this.name = name;
  this.mark = mark;
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
}

function Game() {
  var p1Score = 0
  var p2Score = 0
  let board = GameBoard();
  const player1 = new Player('Player 1', 'X');
  const player2 = new Player('Player 2', 'O');
  let currentPlayer = player1;
  const getCurrentPlayer = () => currentPlayer;
  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }
  const resetBoard = () => {
    board = GameBoard();
  }
  const play = (row, col) => {
    if(board.setBoard(row, col, currentPlayer)){
        switchPlayer();
    }
  }
  const getBoard = () => board.getBoard();
  const getScore = () => {
    return {p1Score, p2Score};
  }
  const checkWinner = () => {
    //handle for tie
    let tie = true;
    const board = getBoard();
    let winner = null;
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        winner = board[i][0];
      }
    }
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        winner = board[0][i];
      }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      winner = board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      winner = board[0][2];
    }
    if(winner){
      alert(`${winner} wins!`);
      if(winner === 'X'){
        p1Score ++;
      }
      else{
        p2Score ++;
      }
      return true;
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === null) {
            tie = false;
            }
        }
    }
    if (tie) {
        alert('Tie Game!');
        return true;
    }
  };
  return { getCurrentPlayer, play, getBoard, resetBoard, checkWinner, getScore };
}


function ScreenController(){
    let game = Game();
    const player1Score = document.querySelector('.player1-score');
    const player2Score = document.querySelector('.player2-score');
    const playerTurn = document.querySelector('.turn');
    const boardDisplay = document.querySelector('.board');
    const restartBtn = document.querySelector('.restart');
    restartBtn.addEventListener('click', () => {
        game.resetBoard();
        game = Game();
        updateScreen();
    });
    const updateScreen = () => {
        playerTurn.textContent = `${game.getCurrentPlayer().getName()}'s turn`;
        const board = game.getBoard();
        boardDisplay.innerHTML = '';
        const {p1Score, p2Score} = game.getScore();
        player1Score.innerHTML = p1Score;
        player2Score.innerHTML = p2Score;
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('button');
                cell.classList.add('cell');
                cell.textContent = board[i][j];
                cell.addEventListener('click', () => {
                    game.play(i, j)                    
                    updateScreen();
                    setTimeout(() => {
                        if(game.checkWinner()){
                            game.resetBoard();
                            updateScreen();
                        }
                    }, 1500);
                    
                });
                row.appendChild(cell);
            }
            boardDisplay.appendChild(row);
        }      
    }
    return { updateScreen };
}

const screen = ScreenController(); 
screen.updateScreen();