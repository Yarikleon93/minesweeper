import React, { Component } from 'react';
import './App.css';

import { CELL, DIFFICULTY_LEVELS } from '../../config';
import { NeighbourService } from '../../services';

export class App extends Component {
  cellsToOpen = [];

  componentDidMount() {
    this.newGame();
  }

  newGame() {
    const level = DIFFICULTY_LEVELS.NORMAL;
    const cells = Array(level.height * level.width).fill().map(() => ({
      type: null,
      covered: true,
    }));

    let minesToSet = level.mineCount;

    while (minesToSet) {
      const index = Math.floor(Math.random() * level.height * level.width);
      if (!cells[index].type) {
        cells[index].type = CELL.MINE;
        minesToSet = minesToSet - 1;
      }
    }
    this.setState({ cells, level });
  }

  setCell(index, cell) {
    const cells = [...this.state.cells];
    cells[index] = cell;
    return this.setState({ cells });
  }

  showMines() {
    const cells = this.state.cells.map(({ type, covered }) => ({
      type,
      covered: type === CELL.MINE ? false : covered,
    }));

    return this.setState({ cells });
  }

  openCellAsync() {
    const cellIndex = this.cellsToOpen.shift();
    const neighbourIndexes = NeighbourService.getNeighbourIndexes(cellIndex, this.state.level.width, this.state.level.height);
    const mineCount = neighbourIndexes.filter(index => this.state.cells[index].type === CELL.MINE).length;
    const type = `mines${mineCount}`;
    this.setCell(cellIndex, { type, covered: false });
    if (!mineCount) {
      neighbourIndexes.forEach(neighborIndex => {
        if (this.state.cells[neighborIndex].covered && !this.cellsToOpen.includes(neighborIndex)) {
          this.cellsToOpen.push(neighborIndex);
        }
      });
    }
    if (this.cellsToOpen.length) {
      setTimeout(() => this.openCellAsync(), 50);
    }
  }

  openCellSync(cellIndex) {
    const neighbourIndexes = NeighbourService.getNeighbourIndexes(cellIndex, this.state.level.width, this.state.level.height);
    const mineCount = neighbourIndexes.filter(index => this.cells[index].type === CELL.MINE).length;
    const type = `mines${mineCount}`;
    this.cells[cellIndex] = { type, covered: false };
    if (!mineCount) {
      neighbourIndexes.forEach(neighborIndex => {
        if (this.cells[neighborIndex].covered)
          this.openCellSync(neighborIndex);
      });
    }
  }

  handleClick = async (e) => {
    // do nothing if asyncOpening is still happening
    if (this.cellsToOpen.length) return;
    /** @type HTMLDivElement */
    const cellIndex = Number(e.target.dataset.index);
    if (!Number.isInteger(cellIndex)) return;

    if (this.state.cells[cellIndex].type === CELL.MINE) {
      await this.showMines();
      await this.setCell(cellIndex, { type: CELL.MINE_HIT, covered: false });
      setTimeout(() => {
        alert('gameover');
        this.newGame();
      });
      return;
    }

    if (this.checkbox.checked) {
      this.openCellsAsync(cellIndex);
    } else {
      this.openCellsSync(cellIndex);
    }
  }

  openCellsSync(cellIndex) {
    this.cells = [...this.state.cells];
    this.openCellSync(cellIndex);
    this.setState({ cells: this.cells });
  }

  openCellsAsync(cellIndex) {
    this.cellsToOpen = [cellIndex];
    this.openCellAsync();

  }

  handleContextMenu = (e) => {
    e.preventDefault();
    const cellIndex = Number(e.target.dataset.index);

    console.log('Right click on ', cellIndex);
    return false;
  }

  render() {
    if (!this.state) return null;

    return (
      <div className="App">
        Async <input type="checkbox" ref={el => this.checkbox = el}></input>
        <div id="minefield" onClick={this.handleClick} onContextMenu={this.handleContextMenu}>
          {this.state.cells.map((cell, index) =>
            <div key={index} data-index={index} className={cell.covered ? CELL.COVERED : cell.type}></div>
            )}
        </div>
      </div>
    );
  }
}

