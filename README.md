# Jenova ![Travis CI](https://travis-ci.org/TheIronDeveloper/jenova.svg)

A game of life module that is intended to work both in a server side and client side environment.

## Implementation

This module exposes 3 functions.

1. **compress** - Given a board array, return a compressed value and board-width
2. **expand** - Given a compressed value and width, return a board array
3. **next** - Given a board array, calculate the next "step", and return it in a callback function

All three functions make use of an matrix consisting of 0s and 1s.

**Example Board**:

```javascript
var myBoard = [
    [0, 0, 1],
    [0, 1, 1],
    [0, 0, 0]
];

jenova.next(myBoard, function(nextBoard){});

```

## Example Usage

### Browser-Only

```javascript

// Using WebPack
var jenova = require("jenova");

var initialBoard = [
	[0, 1, 0, 0, 0],
	[0, 0, 1, 1, 0],
	[0, 1, 1, 0, 0],
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

### Server-to-Browser (using WebSockets)

**Server:**

```javascript

var initialBoard = [
	[0, 1, 0, 0, 0],
	[0, 0, 1, 1, 0],
	[0, 1, 1, 0, 0],
	[0, 0, 0, 0, 0]
];

function generateBoard(board) {
	jenova.next(board, function(newBoard) {
		io.emit('newBoard', jenova.compress(newBoard));
		setTimeout(generateBoard.bind(this, newBoard), 1000);
	});
}

```

**Client:**

```javascript

var gameOfLifeCanvas = document.getElementById('gameOfLife');
var socket = io.connect('http://localhost:3000');

socket.on('newBoard', function (compressedBoard) {
	var newBoard = jenova.expand(compressedBoard.compressed, compressedBoard.width);
	generateBoard(newBoard, gameOfLifeCanvas)
});
```


## Notes

[The test cases](https://github.com/TheIronDeveloper/jenova/tree/master/test) also serve as pseudo-documentation