# <img align="left" height="50" src="https://raw.githubusercontent.com/TheIronDeveloper/jenova/master/images/jenova.png"> Jenova ![Travis CI](https://travis-ci.org/TheIronDeveloper/jenova.svg)

A game of life module that is intended to work both in a server side and client side environment.

## Implementation

This module exposes 3 functions.

1. **compress** - Given a board array, return a compressed value and board-width
2. **expand** - Given a compressed value and width, return a board array
3. **next** - Given a board array, calculate the next "step", and return it in a callback function
4. **draw** - Given a Dom node, and some config, render a game of life board animation.

All three functions make use of an matrix. The default behavior expects 1s and 0s, but you can change how the config
updates.

**Example Board**:

```javascript
var myBoard = [
    [0, 0, 1],
    [0, 1, 1],
    [0, 0, 0]
];

jenova.next(myBoard, {}, function(nextBoard){});

```

### Browser Example

```javascript

// Using WebPack
var jenova = require("jenova");

var initialBoard = [
	[0, 1, 0, 0, 0],
	[0, 0, 1, 1, 0],
	[0, 1, 1, 0, 0],
	[0, 0, 0, 0, 0]
];

jenova.draw('myCanvasId', initialBoard);
```

### WebSockets Example

**Server:**

```javascript

var initialBoard = [
	[0, 1, 0, 0, 0],
	[0, 0, 1, 1, 0],
	[0, 1, 1, 0, 0],
	[0, 0, 0, 0, 0]
];

function generateBoard(board) {
	jenova.next(board, {}, function(newBoard) {
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

* [The test cases](https://github.com/TheIronDeveloper/jenova/tree/master/test) also serve as pseudo-documentation.
* A websocket example can be found here: https://github.com/TheIronDeveloper/websocket-of-life
* Additionally, the `/examples` directory is vanilla express app with an example of `jenova.draw` 