'use strict';

/**
 * Get Neighbors of a current cell
 * @param board {Matrix} - Full Board
 * @param width {Number} - Board width
 * @param rowIndex {Number}
 * @param colIndex {Number}
 * @returns {Matrix}
 */
function getNeighbors(board, width, rowIndex, colIndex) {

	var boardLength = board.length,
		topRow = (rowIndex - 1) >= 0 ? (rowIndex - 1) : boardLength - 1,
		bottomRow = (rowIndex + 1) % boardLength,

		leftCol = (colIndex - 1) >= 0 ? (colIndex - 1) : width - 1,
		rightCol = (colIndex + 1) % width;

	return [
		board[topRow][leftCol], board[topRow][colIndex], board[topRow][rightCol],
		board[rowIndex][leftCol], board[rowIndex][rightCol],
		board[bottomRow][leftCol], board[bottomRow][colIndex], board[bottomRow][rightCol]
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
 * @param board {Matrix} - Matrix containing 1s and 0s, representing a game of life board
 * @param options {Object} - A set of rules that guide how we generate the next board
 *  rule {String} - String representation of how cells are born or survive.
 *      It defualts to "B3/S23", which means a dead cell is born if there are 3 neighbors, and survives with 2 or 3 neighbors
 *
 * @param callback {Function} - function called with the "next" iteration of the game board
 */
function next(board, options, callback) {

	var width = board[0].length,
		rule = options.rule || 'B3/S23',
		ruleSet = rule.split('/'),

		// Get maps of neighborCount rules
		bornValueMap = getNeighborRuleMap(ruleSet[0]),
		surviveValueMap = getNeighborRuleMap(ruleSet[1]),

		newBoard = board.map(function(row, rowIndex) {
			return row.map(function(cell, colIndex) {

				var neighbors = getNeighbors(board, width, rowIndex, colIndex),
					neighborCount = neighbors.reduce(function(memo, neighbor) {
						return memo + neighbor;
					}, 0);

				// If the cell is dead (0), we look at the bornValueMap to see if gets to a "born" status.
				if (cell === 0) {
					return bornValueMap[neighborCount] ? 1 : 0;
				}

				// Otherwise, we check to see if the cell will survive.
				return surviveValueMap[neighborCount] ? 1 : 0;
			});
		});

	callback(newBoard);
}
module.exports = next;