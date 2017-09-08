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
  }

  onClick(squareIndex) {
    const {squares, xIsNext} = this.state

    const updatedSquares = squares.map((square, index) => {
      if (index === squareIndex) {
        return xIsNext ? 'X' : 'O'
      }
      return square
    })

    this.setState({
      squares: updatedSquares,
      xIsNext: !xIsNext
    })
  }

  render() {
    const {squares, xIsNext} = this.state
    const winner = calculateWinner(squares)

    return (
      <div>
        {winner && <div className="status">Winner: {winner} </div>}
        {!winner && <div className="status">Next player: {(xIsNext ? 'X' : 'O')}</div>}
        <div className="board">
          {squares.map((square, index) => (
            <Square key={index} value={square} onClick={() => this.onClick(index)}/>
          ))}
        </div>
      </div>
    );
  }
}

export default Board


