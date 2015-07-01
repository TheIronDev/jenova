'use strict';

var LZUTF8 = require('lzutf8');

/**
 * Given a compressed value, return a board array
 * @param compressedResult - {String?/Number?} compressed game of life board
 * @param width {number} -  Width of our matrix
 * @param height {number} - Height of our Matrix
 * @returns {Matrix} - Decompressed game of life matrix
 */
function expand(compressedResult, width, height) {

	var decompressed = LZUTF8.decompress(compressedResult, {inputEncoding: 'BinaryString'}),

		// 001001 to ['0','0','1','0','0','1']
		decompressedToArray = decompressed.split(''),

		// Map ['1'] to [1], then reduce to a matrix [ [1] ]
		result = decompressedToArray.map((cell) => parseInt(cell, 10))
			.reduce(function(memo, cell, index) {
				if (index%width === 0) {
					memo.push([]);
				}
				memo[memo.length - 1].push(cell);
				return memo;
			}, []);

	return result;
}

module.exports = expand;