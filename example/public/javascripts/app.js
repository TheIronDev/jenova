

var jenova = require('../../../index.js');

let initialBoard = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 0, 0, 0],
	[0, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0]
];

let drawConfig = {
	colorStateMap: {
		0: '#fff',
		1: '#f0f'
	},
	lineColor: '#efefef',
	lineWidth: 1,
	speed: 100
};

let onClick = (cell) => {
	return cell ? 0 : 1;
};

jenova.draw('calamity', initialBoard, {}, drawConfig, onClick);