'use strict';

var LZUTF8 = require('lzutf8');

/**
 * Given a board array, return a compressed value
 * @param {Matrix} boardArray game of life board
 * @returns {Object} compressed game of life board
 */
function compress(boardArray) {

  var boardString = boardArray.reduce(function(memo, row) {
    memo += row.join('');
    return memo;
  }, '');

  return {
    width: boardArray[0] && boardArray[0].length || 0,
    compressed: LZUTF8.compress(boardString, {
      outputEncoding: 'BinaryString'
    })
  };
}

module.exports = compress;