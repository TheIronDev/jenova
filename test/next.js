'use strict';

var assert = require('assert'),
	next = require('../lib/next');

describe('Next', function() {

	it('should generate a new game of life board', function(done) {
		var testBoard = [[0,0,0,0,0], [0,1,0,0,0], [0, 1, 1, 0, 0], [0,1,1,0,0], [0,0,0,0,0]],
			expected = [[0,0,0,0,0],[0,1,1,0,0],[1,0,0,0,0], [0,1,1,0,0], [0,0,0,0,0]];

		next(testBoard, {}, function(result) {
			assert.deepEqual(result, expected);
			done();
		});
	});

	describe('should follow the game\'s rules', function() {
		it('starve with 0 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,0,0,0,0], [0,0,1,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, {}, function(result) {
				assert.deepEqual(result[2][2], 0);
				done();
			});
		});

		it('starve with 1 neighbor', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,0,0,0], [0,0,1,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, {}, function(result) {
				assert.deepEqual(result[2][2], 0);
				done();
			});
		});
		it('survive with 2 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,0,0], [0,0,1,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, {}, function(result) {
				assert.deepEqual(result[2][2], 1);
				done();
			});
		});
		it('survive with 3 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,1,0], [0,0,1,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, {}, function(result) {
				assert.deepEqual(result[2][2], 1);
				done();
			});
		});
		it('starve with 4 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,1,0], [0,1,1,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, {}, function(result) {
				assert.deepEqual(result[2][2], 0);
				done();
			});
		});
		it('starve with 5 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,1,0], [0,1,1,1,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, {}, function(result) {
				assert.deepEqual(result[2][2], 0);
				done();
			});
		});
		it('remain dead with 2 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, {}, function(result) {
				assert.deepEqual(result[2][2], 0);
				done();
			});
		});
		it('repopulate with 3 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,1,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, {}, function(result) {
				assert.deepEqual(result[2][2], 1);
				done();
			});
		});
		it('remain dead with 4 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,0,0], [0,0,0,0,0], [0,1,1,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, {}, function(result) {
				assert.deepEqual(result[2][2], 0);
				done();
			});
		});
	});


	describe('should follow Highlife rules properly', function() {

		var highLifeOptions = {
			rule: 'B36/S23'
		};

		it('starve with 0 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,0,0,0,0], [0,0,1,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, highLifeOptions, function(result) {
				assert.deepEqual(result[2][2], 0);
				done();
			});
		});

		it('starve with 1 neighbor', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,0,0,0], [0,0,1,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, highLifeOptions, function(result) {
				assert.deepEqual(result[2][2], 0);
				done();
			});
		});
		it('survive with 2 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,0,0], [0,0,1,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, highLifeOptions, function(result) {
				assert.deepEqual(result[2][2], 1);
				done();
			});
		});
		it('survive with 3 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,1,0], [0,0,1,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, highLifeOptions, function(result) {
				assert.deepEqual(result[2][2], 1);
				done();
			});
		});
		it('starve with 4 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,1,0], [0,1,1,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, highLifeOptions, function(result) {
				assert.deepEqual(result[2][2], 0);
				done();
			});
		});
		it('starve with 5 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,1,0], [0,1,1,1,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, highLifeOptions, function(result) {
				assert.deepEqual(result[2][2], 0);
				done();
			});
		});
		it('remain dead with 2 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, highLifeOptions, function(result) {
				assert.deepEqual(result[2][2], 0);
				done();
			});
		});
		it('repopulate with 3 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,1,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, highLifeOptions, function(result) {
				assert.deepEqual(result[2][2], 1);
				done();
			});
		});
		it('repopulate with 6 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,1,0], [0,0,0,0,0], [0,1,1,1,0], [0,0,0,0,0]];

			next(zeroNeighbors, highLifeOptions, function(result) {
				assert.deepEqual(result[2][2], 1);
				done();
			});
		});
		it('remain dead with 4 neighbors', function(done) {
			var zeroNeighbors = [[0,0,0,0,0], [0,1,1,0,0], [0,0,0,0,0], [0,1,1,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, highLifeOptions, function(result) {
				assert.deepEqual(result[2][2], 0);
				done();
			});
		});
	});

	describe('still lifes should remain unchanged', function() {

		function testStillLife(stillLife, done) {
			next(stillLife, {}, function(result) {
				assert.deepEqual(result, stillLife);
				done();
			});
		}

		it('block', function(done) {
			var stillLife = [[0,0,0,0], [0,1,1,0], [0,1,1,0], [0,0,0,0]];
			testStillLife(stillLife, done);
		});
		it('beehive', function(done) {
			var stillLife = [[0,0,0,0,0,0], [0,0,1,1,0,0], [0,1,0,0,1,0], [0,0,1,1,0,0], [0,0,0,0,0,0]];
			testStillLife(stillLife, done);
		});
		it('loaf', function(done) {
			var stillLife = [[0,0,0,0,0,0], [0,0,1,1,0,0], [0,1,0,0,1,0], [0,0,1,0,1,0], [0,0,0,1,0,0], [0,0,0,0,0,0]];
			testStillLife(stillLife, done);
		});
		it('boat', function(done) {
			var stillLife = [[0,0,0,0,0], [0,1,1,0,0], [0,1,0,1,0], [0,0,1,0,0], [0,0,0,0,0]];
			testStillLife(stillLife, done);
		});
	});

});