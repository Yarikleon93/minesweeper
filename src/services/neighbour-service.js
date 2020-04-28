export class NeighbourService {
  /**
   * @param {number} index
   * @param {number} width
   * @param {number} height
   * @returns number[]
   */
  static getNeighbourIndexes(index, width, height) {
    const neighbours = [];
    const isFirstRow = index < width;
    const isFirstCol = index % width === 0;
    const isLastRow = index >= width * (height - 1);
    const isLastCol = (index + 1) % width === 0;

    if (!isFirstRow && !isFirstCol) neighbours.push(index - 1 - width);
    if (!isFirstRow) neighbours.push(index - width);
    if (!isFirstRow && !isLastCol) neighbours.push(index + 1 - width);
    if (!isFirstCol) neighbours.push(index - 1);
    if (!isLastCol) neighbours.push(index + 1);
    if (!isFirstCol && !isLastRow) neighbours.push(index - 1 + width);
    if (!isLastRow) neighbours.push(index + width);
    if (!isLastRow && !isLastCol) neighbours.push(index + 1 + width);
    return neighbours;
  }

  // 0 1 2
  // 3 4 5
  // 6 7 8
}

