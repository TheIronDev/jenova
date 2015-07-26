'use strict';

var assert = require('assert'),
	expand = require('../lib/expand');

describe('Expand', function() {

	it('should expand a compressed matrix to a matrix', function() {
		var compressedString = 'ᢘఌ☸䀰\u0000老',
			width = 3,
			expanded = expand(compressedString, width);

		assert.deepEqual(expanded, [[1,0,0], [1, 1, 0], [1,1,0]]);
	});

	it('should expand a compressed matrix to a matrix given params as an object', function() {
		var compressedObj = {
				compressed: 'ᢘఌ☸䀰\u0000老',
				width: 3
			},
			expanded = expand(compressedObj);

		assert.deepEqual(expanded, [[1,0,0], [1, 1, 0], [1,1,0]]);
	});

	it('should expand a compressed matrix to a matrix with padded 0s', function() {
		var compressedString = 'ᡢ䁌☆̓ภఀ耀',
			width = 3,
			expanded = expand(compressedString, width);

		assert.deepEqual(expanded, [[0,0,0], [0,0,0], [1,0,0], [1, 1, 0], [1,1,0]]);
	});
});