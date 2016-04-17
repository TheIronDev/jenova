'use strict';

/**
 * Get Neighbors of a current cell
 * @param {Matrix} board - Full Board
 * @param {Number} width - Board width
 * @param {Number} rowIndex - cells row index
 * @param {Number} colIndex - cells column index
 * @returns {Matrix} Matrix of neighbor values
 */
function getNeighbors(board, width, rowIndex, colIndex) {

  var boardLength = board.length,
    topRow = rowIndex - 1 >= 0 ? rowIndex - 1 : boardLength - 1,
    bottomRow = (rowIndex + 1) % boardLength,

    leftCol = colIndex - 1 >= 0 ? colIndex - 1 : width - 1,
    rightCol = (colIndex + 1) % width,

    top = board[topRow],
    middle = board[rowIndex],
    low = board[bottomRow];

  return [
    top[leftCol], top[colIndex], top[rightCol],
    middle[leftCol], middle[rightCol],
    low[leftCol], low[colIndex], low[rightCol]
  ];
}

function getNeighborRuleMap(ruleString) {
  return ruleString.match(/\d/g).reduce(function(memo, count) {
    memo[count] = true;
    return memo;
  }, {});
}

/**
 * Given a board array, calculate the next "step", and return it in a callback function
 *
 * Implementation details: I check "out-of-bound" neighbors using modulo. They are not assumed to be dead
 *
 * @param {Matrix} board - Matrix containing 1s and 0s, representing a game of life board
 * @param {Object} options - A set of rules that guide how we generate the next board
 *  options.rule {String} - String representation of how cells are born or survive.
 *      It defaults to "B3/S23", which means a dead cell is born if there are 3 neighbors, and survives with 2 or 3 neighbors
 *
 *  options.updateCell {Function} - function that helps decide how our cell value changes.
 *      It expects the follow params: currentCell, neighborCount
 *
 * @param {Function} callback - function called with the "next" iteration of the game board
 * @returns {undefined} undefined
 */
function next(board, options, callback) {

  var width = board[0].length,
    rule = options.rule || 'B3/S23',
    ruleSet = rule.split('/'),

  // Get true/false maps of neighborCount rules
    bornMap = options.bornMap || getNeighborRuleMap(ruleSet[0]),
    surviveMap = options.surviveMap || getNeighborRuleMap(ruleSet[1]),

    defaultUpdateCellFn = function(cellValue, neighborCount) {

      // If the cell is dead (0), we look at the bornValueMap to see if gets to a "born" status.
      if (cellValue === 0) {
        return bornMap[neighborCount] ? 1 : 0;
      }

      // Otherwise, we check to see if the cell will survive.
      return surviveMap[neighborCount] ? 1 : 0;
    },

    updateCell = options.updateCell || defaultUpdateCellFn,

    newBoard = board.map(function(row, rowIndex) {
      return row.map(function(cell, colIndex) {

        var neighbors = getNeighbors(board, width, rowIndex, colIndex),
          neighborCount = neighbors.reduce(function(memo, neighbor) {
            return memo + neighbor;
          }, 0);

        return updateCell(cell, neighborCount);
      });
    });

  callback(newBoard);
}
module.exports = next;