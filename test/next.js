'use strict';

var assert = require('assert'),
	next = require('../lib/next');

describe('Next', function() {

	it('should generate a new game of life board', function(done) {
		var testBoard = [[0,0,0,0,0], [0,1,0,0,0], [0, 1, 1, 0, 0], [0,1,1,0,0], [0,0,0,0,0]],
			expected = [[0,0,0,0,0],[0,1,1,0,0],[1,0,0,0,0], [0,1,1,0,0], [0,0,0,0,0]];

		next(testBoard, function(result) {
			assert.deepEqual(result, expected);
			done();
		});
	});
});