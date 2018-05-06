import React, {Component} from 'react';
import Row from './Row.react.js';
import {merge, transpose} from '../Utils/MatrixHelper.js'

const DEFAULT_MATRIX = [
  [
    2, 0, 0, 0
  ],
  [
    0, 4, 0, 0
  ],
  [
    0, 0, 0, 0
  ],
  [
    0, 0, 0, 0
  ]
];
// const DEFAULT_MATRIX = [[2, 4, 8, 16], [32, 64, 128, 256], [512, 1024, 2048, 4096], [8192, 16384, 32768, 65536]];

class Panel extends Component {
  state = {
    matrix: DEFAULT_MATRIX
  };

  componentWillMount() {
    document.addEventListener('keyup', this.keyupHandler.bind(this));
  }

  componentWillUnMount() {
    document.removeEventListener('keyup', this.keyupHandler.bind(this));
  }

  keyupHandler(event) {
    if (event.key === 'Escape') {
      this.reset();
      return;
    }
    this.checkIsGameOver();
    if (this.state.isGameOver) {
      return;
    }
    const originalMatrix = this.state.matrix;
    switch (event.key) {
      case 'ArrowUp':
        this.mergeUp();
        break;
      case 'ArrowRight':
        this.mergeRight();
        break;
      case 'ArrowDown':
        this.mergeDown();
        break;
      case 'ArrowLeft':
        this.mergeLeft();
        break;
      default:
        break;
    }
    const finalMatrix = this.state.matrix;
    if (JSON.stringify(originalMatrix) !== JSON.stringify(finalMatrix)) {
      this.generate();
    }
  }

  reset() {
    this.setState({matrix: DEFAULT_MATRIX, isGameOver: false});
  }

  mergeVert(towardsUp) {
    this.setState({
      matrix: transpose(transpose(this.state.matrix).map(rowValues => merge(rowValues, towardsUp)))
    });
  }

  mergeHoriz(towardsLeft) {
    this.setState({
      matrix: this.state.matrix.map(rowValues => merge(rowValues, towardsLeft))
    });
  }

  mergeUp() {
    this.mergeHoriz(true);
    // this.mergeVert(true);
  }

  mergeRight() {
    // this.mergeHoriz(false);
    this.mergeVert(false);
  }

  mergeDown() {
    this.mergeHoriz(false);
    // this.mergeVert(false);
  }

  mergeLeft() {
    // this.mergeHoriz(true);
    this.mergeVert(true);
  }

  generate() {
    const emptyCells = this.getEmptyCells();
    if (emptyCells.length === 0) {
      this.setState({isGameOver: true});
      return;
    }
    const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const matrix = this.state.matrix;
    matrix[i][j] = 2;
    this.checkIsGameOver();
    this.setState({matrix});
  }

  getEmptyCells() {
    const emptyCells = [];
    // TODO: FIX THIS
    this.state.matrix.map((row, i) => {
      row.map((val, j) => {
        if (val === 0) {
          emptyCells.push([i, j]);
        }
      })
    });
    return emptyCells;
  }

  checkIsGameOver() {
    let isGameOver = true;
    const matrix = this.state.matrix;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (i !== 0) {
          if (matrix[i - 1][j] === matrix[i][j]) {
            isGameOver = false;
          }
        }
        if (j !== 0) {
          if (matrix[i][j - 1] === matrix[i][j]) {
            isGameOver = false;
          }
        }
      }
    }
    this.setState({isGameOver});
  }

  render() {
    const matrix = this.state.matrix;
    const panel = matrix.map((rowValues, i) => <div style={{
        display: 'inline-table'
      }}><Row key={i} rowValues={rowValues}/></div>);
    return <div style={{
        marginTop: '40px'
      }}>{
        this.state.isGameOver
          ? <h1>GAME OVER!</h1>
          : null
      }{panel}</div>
  }
}

export default Panel;
