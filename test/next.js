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

	describe('should follow a custom updateCell rules', function() {

		// Note: we aren't making use of the born/surive maps, we're using our own custom logic instead
		var options = {
			updateCell: function(cell, neighborCount) {
				if (neighborCount === 0 && cell !== 0) {
					return cell + 1;
				}
				return cell;
			}
		};

		it('increment with no neighbors', function(done) {

			var zeroNeighbors = [[0,0,0,0,0], [0,0,0,0,0], [0,0,1,0,0], [0,0,0,0,0], [0,0,0,0,0]];
			var expected1 = [[0,0,0,0,0], [0,0,0,0,0], [0,0,2,0,0], [0,0,0,0,0], [0,0,0,0,0]];
			var expected2 = [[0,0,0,0,0], [0,0,0,0,0], [0,0,3,0,0], [0,0,0,0,0], [0,0,0,0,0]];

			next(zeroNeighbors, options, function(firstResult) {

				assert.deepEqual(firstResult, expected1);

				next(firstResult, options, function(secondResult) {
					assert.deepEqual(secondResult, expected2);
					done();
				});
			});
		});
	});

	describe('should follow a custom born/survival map over default rules', function() {

		// Note we aren't making use of the born map, it isn't a hard requirement
		var options = {
			bornMap: {
				1: true
			},
			surviveMap: {
				2: true
			}
		};

		it('born with 1 neighbor, only survive with 2', function(done) {

			var zeroNeighbors = [[0,0,0,0,0], [0,0,0,0,0], [0,0,1,0,0], [0,0,0,0,0], [0,0,0,0,0]];
			var expected = [[0,0,0,0,0], [0,1,1,1,0], [0,1,0,1,0], [0,1,1,1,0], [0,0,0,0,0]];
			var expected2 = [[1,0,0,0,1], [0,1,0,1,0], [0,0,0,0,0], [0,1,0,1,0], [1,0,0,0,1]];


			next(zeroNeighbors, options, function(result) {

				assert.deepEqual(result, expected);
				next(result, options, function(result2) {

					assert.deepEqual(result2, expected2);
					done();
				});
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