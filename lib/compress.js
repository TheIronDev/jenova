'use strict';

/**
 * Given a board array, return a compressed value
 * @param boardArray {Matrix} game of life board
 * @returns {number?/String?} compressed game of life board
 *
 * This compression only supports up to 69 cells.
 * TODO: Add in a bignum library to handle larger matrices
 */
function compress(boardArray) {

	var boardString =  boardArray.reduce(function(memo, row) {
		memo += row.join('');
		return memo;
	}, '');

	return {
		height: boardArray.length || 0,
		width: boardArray[0] && boardArray[0].length || 0,
		compressed: parseInt(boardString, 2)
	};
}

module.exports = compress;