import React, { Component } from 'react';
import './App.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends Component {
  constructor() {
    super();
    this.state = {
      squares: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      xIsNext: true
    }
  }

  handleClick(i) {
    console.log(i)
    const squares = this.state.squares.slice()
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
    makeMove(this.state.squares)
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />
  }

  render() {
    const winner = calculateWinner(this.state.squares)

    let status 
    if(winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

let board;
let myMove = true

function getWinner(board) {
   
  // Check if someone won
  var vals = [true, false];
  var allNotNull = true;
  for (var k = 0; k < vals.length; k++) {
    var value = vals[k];
    
    // Check rows, columns, and diagonals
    var diagonalComplete1 = true;
    var diagonalComplete2 = true;
    for (var i = 0; i < 3; i++) {
      if (board[i][i] !== value) {
        diagonalComplete1 = false;
      }
      if (board[2 - i][i] !== value) {
        diagonalComplete2 = false;
      }
      var rowComplete = true;
      var colComplete = true;
      for (var j = 0; j < 3; j++) {
        if (board[i][j] !== value) {
          rowComplete = false;
        }
        if (board[j][i] !== value) {
          colComplete = false;
        }
        if (board[i][j] == null) {
          allNotNull = false;
        }
      }
      if (rowComplete || colComplete) {
        return value ? 1 : 0;
      }
    }
    if (diagonalComplete1 || diagonalComplete2) {
        return value ? 1 : 0;
        myMove = false;
    }
  }
  if (allNotNull) {
    return -1;
  }
  return null;
}

function makeMove(board) {
  setTimeout(function() {
    board = minimaxMove(board);
    console.log(numNodes);
    console.log('selected');
    console.log(board);
    myMove = false;
  }, 800);
}

function minimaxMove(board) {
  numNodes = 0;
  return recurseMinimax(board, true)[1];
}

var numNodes = 0;

function recurseMinimax(board, player) {
  numNodes++;
  var winner = calculateWinner(board);
  if (winner != null) {
    switch(winner) {
      case 1:
        // AI wins
        return [1, board]
      case 0:
        // opponent wins
        return [-1, board]
      case -1:
        // Tie
        return [0, board];
    }
  } else {
    // Next states
    var nextVal = null;
    var nextBoard = null;
    
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board[i][j] == null) {
          board[i][j] = player;
          var value = recurseMinimax(board, !player)[0];
          if ((player && (nextVal == null || value > nextVal)) || (!player && (nextVal == null || value < nextVal))) {
            nextBoard = board.map(function(arr) {
              return arr.slice();
            });
            nextVal = value;
          }
          board[i][j] = null;
        }
      }
    }
    return [nextVal, nextBoard];
  }
}
