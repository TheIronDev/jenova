'use strict';

/**
 * Given a compressed value, return a board array
 * @param compressedResult - {String?/Number?} compressed game of life board
 * @param width {number} -  Width of our matrix
 * @param height {number} - Height of our Matrix
 * @returns {Matrix} - Decompressed game of life matrix
 */
function expand(compressedResult, width, height) {
	return [[1, 0, 1]];
}

module.exports = expand;