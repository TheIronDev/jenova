# Jenova

A game of life module that is intended to work both in a server side and client side environment.

![Travis CI](https://travis-ci.org/TheIronDeveloper/jenova.svg)

## Usage

**Browser**:

```javascript

// Using WebPack
var jenova = require("jenova");

var initialBoard = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 1, 1, 1, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0]
];

function generateBoard(board, canvas) {

	var ctx = canvas.getContext('2d'),
		width = canvas.width,
		height = canvas.height,
		cellHeight = height/ board.length,
		cellWidth = width / board[0].length;

	// Loop through the board and draw each cell
	board.forEach(function(row, rowIndex) {
		row.forEach(function(col, colIndex) {
			ctx.fillStyle = col ? '#ccc' : '#fff';
			ctx.fillRect(colIndex*cellWidth, rowIndex*cellHeight, cellWidth, cellHeight);
			ctx.strokeRect(colIndex*cellWidth, rowIndex*cellHeight, cellWidth, cellHeight);
		});
	});

	// Finally Generate a new board, with a callback to redraw it
	jenova.next(board, function(newBoard) {
		setTimeout(generateBoard.bind(this, newBoard, canvas), 200);
	});
}

window.requestAnimationFrame(generateBoard.bind(this, initialBoard, document.getElementById('myCanvas')));
```

**Node**:

```javascript
// TODO: Implement me :)
```

## Implementation

This module exposes 3 functions.

1. **compress** - Given a board array, return a compressed value
2. **expand** - Given a compressed value, width, and height, return a board array
3. **next** - Given a board array, calculate the next "step", and return it in a callback function

All three functions make use of an matrix consisting of 0s and 1s.

**Example Board**:

```javascript
var myBoard = [
    [0, 0, 1],
    [0, 1, 1],
    [0, 0, 0]
];

jenova.next(myBoard, function(nextBoard){
    // ...
});
```