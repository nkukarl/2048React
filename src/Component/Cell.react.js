import React, {Component} from 'react';
import './Cell.css';

const VALUE_TO_COLOR_MAP = {
  2: 'black',
  4: 'silver',
  8: 'gray',
  16: 'white',
  32: 'maroon',
  64: 'red',
  128: 'purple',
  256: 'fuchsia',
  512: 'green',
  1024: 'lime',
  2048: 'olive',
  4096: 'yellow',
  8192: 'navy',
  16384: 'blue',
  32768: 'teal',
  65536: 'aqua'
};

class Cell extends Component {
  render() {
    const cellValue = this.props.cellValue;
    return (<div className="Cell" style={{
        backgroundColor: VALUE_TO_COLOR_MAP[cellValue]
      }}>{cellValue}</div>);
  }
}

export default Cell;
