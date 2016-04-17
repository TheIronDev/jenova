'use strict';

var assert = require('assert'),
  compress = require('../lib/compress'),
  expand = require('../lib/expand');

describe('Expand + Compress Working Together', function() {

  it('should return the same board', function() {

    var initialBoard = [[0, 0, 0], [0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 0]],

      compressedBoard = compress(initialBoard),
      expandedBoard = expand(compressedBoard);

    assert.deepEqual(initialBoard, expandedBoard);
  });
});