'use strict';

var assert = require('assert'),
	compress = require('../lib/compress');

describe('Compress', function() {
	it('should compress a matrix', function() {

		var sampleMatrix = [[1,0,0], [1, 1, 0], [1,1,0]],
			result = compress(sampleMatrix);

		assert.equal(result.compressed, 'ᢘఌ☸䀰\u0000老');
		assert.equal(result.width, 3);
	});

	it('should compress a matrix with padded 0s', function() {

		var sampleMatrix = [[0,0,0], [0,0,0], [1,0,0], [1, 1, 0], [1,1,0]],
			result = compress(sampleMatrix);

		assert.equal(result.compressed, 'ᡢ䁌☆̓ภఀ耀');
	});
});