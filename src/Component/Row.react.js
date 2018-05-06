import React, {Component} from 'react';
import Cell from './Cell.react.js';

class Row extends Component {
  render() {
    const rowValues = this.props.rowValues;
    return rowValues.map((cellValue, i) => <Cell key={i} cellValue={cellValue}/>);
  }
}

export default Row;
