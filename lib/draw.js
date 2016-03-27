'use strict';

var next = require('./next');

/**
 * Given a DOM id, start drawing a jenova board onto it, using
 *
 * @param id {String} - Dom id that we will render jenova on to.
 * @param initialBoard {Matrix} game of life board
 * @param nextConfig {Object} - parameters that drive next rules
 * @param drawConfig {Object} - canvas and render parameters
 */
function draw(id, initialBoard, nextConfig, drawConfig) {

	if (!(window && document)) {
		throw new Error('window and/or document were found missing.\nA browser environment is required');
	}

	if(!(initialBoard && initialBoard.length && initialBoard[0].length)) {
		throw new Error('A malformed board was found.\n Please ensure `initialBoard` is a matrix that contains at least 1 row and 1 column');
	}

	nextConfig = nextConfig || {};
	drawConfig = drawConfig || {};

	var canvas = document.getElementById(id);

	if (!canvas) {
		throw new Error("Dom Element doesn't exist");
	}

	var ctx = canvas.getContext('2d'),
		width = canvas.width,
		height = canvas.height,
		cellHeight = height / initialBoard.length,
		cellWidth = width / initialBoard[0].length;

	var filledNodeColor = drawConfig.fillColor || '#ccc',
		emptyNodeColor = drawConfig.emptyColor || '#fff',
		boardSpeed = drawConfig.speed || 200;



	function generateBoard(board) {

		// Loop through the board and draw each cell
		board.forEach(function(row, rowIndex) {
			row.forEach(function(col, colIndex) {

				ctx.fillStyle = col ? filledNodeColor : emptyNodeColor;

				ctx.fillRect( (colIndex * cellWidth) , rowIndex * cellHeight, cellWidth, cellHeight);
				ctx.strokeRect( (colIndex * cellWidth) , rowIndex * cellHeight, cellWidth, cellHeight);
			});
		});

		// Finally Generate a new board, with a callback to redraw it
		next(board, nextConfig, function(newBoard) {
			setTimeout(generateBoard.bind(this, newBoard), boardSpeed);
		});
	}

	window.requestAnimationFrame(generateBoard.bind(this, initialBoard));
}

module.exports = draw;