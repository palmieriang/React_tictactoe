import React, { Component } from 'react';
import './App.css';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function calculateWinner(squares) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Square = props => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
)

class Board extends Component {
  constructor() {
    super()

    this.state = {
      squares: [
        null, null, null,
        null, null, null,
        null, null, null
      ],
      xIsNext: true
    }
    this.restart = this.restart.bind(this)
  }

  onClick(squareIndex) {
    const {squares, xIsNext} = this.state

    const updatedSquares = squares.map((square, index) => {
      if (index === squareIndex && square === null) {
        this.nextPlayer();
        return xIsNext ? 'X' : 'O'
      }
      return square
    })

    this.setState({
      squares: updatedSquares
    })
  }

  nextPlayer() {
    const {xIsNext} = this.state

    this.setState({
      xIsNext: !xIsNext
    })
  }

  restart() {
    this.setState({
      squares: [
        null, null, null,
        null, null, null,
        null, null, null
      ],
      xIsNext: true
    })
  }

  render() {
    const {squares, xIsNext} = this.state
    const winner = calculateWinner(squares)

    return (
      <div className="container">
        {winner && <div className="status">Winner: {winner} </div>}
        {!winner && <div className="status">Next player: {(xIsNext ? 'X' : 'O')}</div>}
        <div className="board">
          {squares.map((square, index) => (
            <Square className="square" key={index} value={square} onClick={() => this.onClick(index)}/>
          ))}
        </div>
        <button className="main-button" onClick={this.restart}>Restart</button>
      </div>
    );
  }
}

export default Board
