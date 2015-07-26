'use strict';

var LZUTF8 = require('lzutf8');

/**
 * Given a compressed value, return a board array
 * @param compressed - {String or object} compressed game of life board
 * @param width {number} -  Width of our matrix
 * @returns {Matrix} - Decompressed game of life matrix
 */
function expand(compressed, width) {

	var compressedString = compressed;

	// Check to see if we passed in the compressed object (instead of just a string)
	if (compressed.compressed) {
		width = compressed.width;
		compressedString = compressed.compressed;
	}

	var decompressed = LZUTF8.decompress(compressedString, {inputEncoding: 'BinaryString'}),

		// 001001 to ['0','0','1','0','0','1']
		decompressedToArray = decompressed.split(''),

		// Map ['1'] to [1], then reduce to a matrix [ [1] ]
		result = decompressedToArray
			.map(function(cell) {
				return parseInt(cell, 10);
			})
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