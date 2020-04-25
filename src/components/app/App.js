import React, { Component } from 'react';
import './App.css';

import { CELL } from '../../config';

export class App extends Component {
  state = {
    cells: Array(400).fill().map(() => ({
      type: CELL.MINES0,
      covered: true,
    })),
  }

  componentDidMount() {
    const cells = [...this.state.cells];
    cells[100] = {
      ...cells[100],
      type: CELL.MINE,
    };
    this.setState(this.state);
  }

  handleClick = (e) => {
    console.log('click', this.state);
  }

  render() {
    return (
      <div className="App">
        <div id="minefield" onClick={this.handleClick}>
          {this.state.cells.map((cell, index) =>

            <div key={index} className={cell.covered ? CELL.COVERED : cell.type}></div>
          )}
        </div>
      </div>
    );
  }
}

