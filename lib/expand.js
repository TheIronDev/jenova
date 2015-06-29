'use strict';

/**
 * Given a compressed value, return a board array
 * @param compressedResult - {String?/Number?} compressed game of life board
 * @returns {Matrix} - Decompressed game of life matrix
 */
function expand(compressedResult) {
	return [[1, 0, 1]];
}

module.exports = expand;