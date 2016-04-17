'use strict';

var next = require('./next');

function drawCell(cell, colIndex, rowIndex, ctx, width, height, colorMap) {

  var fillStyle = colorMap[cell],
    top = colIndex * width,
    left = rowIndex * height;

  ctx.fillStyle = fillStyle || '#fff';
  ctx.fillRect(top, left, width, height);
  ctx.strokeRect(top, left, width, height);
}

function getClickedCell(event, cellWidth, cellHeight) {

  var canvas = event.target,

    leftOffSet = canvas.offsetLeft,
    topOffset = canvas.offsetTop,

    leftClickPoint = event.pageX,
    topClickPoint = event.pageY,

    x = leftClickPoint - leftOffSet,
    y = topClickPoint - topOffset;

  return {
    col: ~~(x / cellWidth),
    row: ~~(y / cellHeight)
  };
}

/**
 * Given a DOM id, start drawing a jenova board onto it, using the following params:
 *
 * @param {String} id - DOM id representing a canvas element that we will render jenova on to.
 * @param {Matrix} initialBoard - game of life board
 *
 * @param {Object} nextConfig - parameters that drive next rules. (See /lib/next.js for more documentation)
 *
 * @param {Object} drawConfig - canvas and render parameters
 *  drawConfig.lineColor {String} - color to draw the lines between cells
 *  drawConfig.lineWidth {Number} - size of the line borders
 *  drawConfig.colorStateMap {Object} - Map of values for coloring different cell states
 *  drawConfig.speed {Number} - delay between each draw step
 * @deprecated drawConfig.fillColor {String} - color when the cell value is 1
 * @deprecated drawConfig.emptyColor {String} - color when the cell value is 0
 *
 * @param {Function} clickHandler - What happens when we click! It will be passed in the clicked cell's value
 *
 * @returns {undefined} undefined
 */
function draw(id, initialBoard, nextConfig, drawConfig, clickHandler) {

  if (!(window && document)) {
    var msg = 'window and/or document were found missing.';

    throw new Error(msg);
  }

  if (!(initialBoard && initialBoard.length && initialBoard[0].length)) {
    var msg = 'A malformed board was found.';

    throw new Error(msg);
  }

  var canvas = document.getElementById(id);

  if (!canvas) {
    throw new Error('Dom Element doesn\'t exist');
  }

  if (canvas.tagName !== 'CANVAS') {
    throw new Error('Dom Element exists, but its not a canvas element');
  }

  nextConfig = nextConfig || {};
  drawConfig = drawConfig || {};

  var ctx = canvas.getContext('2d'),
    width = canvas.width,
    height = canvas.height,
    cellHeight = height / initialBoard.length,
    cellWidth = width / initialBoard[0].length;

  var colorMap = drawConfig.colorStateMap || {},
    boardSpeed = drawConfig.speed || 200,
    currentBoard = initialBoard,
    clickedCells = [];

  colorMap[0] = colorMap[0] || drawConfig.emptyColor || '#fff';
  colorMap[1] = colorMap[1] || drawConfig.fillColor || '#ccc';

  function canvasClickHandler(event) {

    var canvas = event.target,
      width = canvas.width,
      height = canvas.height,
      newCellVal,
      cellState,
      cellHeight,
      cellWidth,
      col,
      row,
      cell;

    if (currentBoard) {

      cellHeight = height / currentBoard.length;
      cellWidth = width / currentBoard[0].length;

      cell = getClickedCell(event, cellWidth, cellHeight);
      newCellVal = clickHandler(currentBoard[cell.row][cell.col]);
      col = cell.col;
      row = cell.row;

      /**
       * Important State Note: We are making a visual update that doesn't exist on the board yet.
       * We are using the clickedCells array to resolve the differences in state.
       */
      cellState = {
        cell: cell,
        newCellVal: newCellVal
      };
      clickedCells.push(cellState);
      drawCell(newCellVal, col, row, ctx, cellWidth, cellHeight, colorMap);
    }
  }

  function generateBoard(board) {

    // Update the board with the clicks that happened
    clickedCells.forEach(function(cellState) {
      var cell = cellState.cell;

      board[cell.row][cell.col] = cellState.newCellVal;
    });
    // And reset its state back to empty
    clickedCells = [];

    // Loop through the board and draw each cell
    board.forEach(function(row, rowIndex) {
      row.forEach(function(col, colIndex) {
        drawCell(col, colIndex, rowIndex, ctx, cellWidth, cellHeight, colorMap);
      });
    });

    // Finally Generate a new board, with a callback to redraw it
    next(board, nextConfig, function(newBoard) {

      // Updating the currentBoard for our clickHandler's reference
      currentBoard = newBoard;
      setTimeout(generateBoard.bind(null, newBoard), boardSpeed);
    });
  }

  if (clickHandler) {
    canvas.addEventListener('click', canvasClickHandler);
  }

  ctx.lineWidth = drawConfig.lineWidth || 1;
  ctx.strokeStyle = drawConfig.lineColor || '#ccc';

  generateBoard(initialBoard);
}

module.exports = draw;