var path = require('path');

module.exports = {
	context: path.resolve('public/javascripts'),
	entry: {
		app: './app.js'
	},
	output: {
		path: path.resolve('./public/javascripts/bundles/app.js'),
		filename: '[name].js'
	},
	resolveLoaders: {
		root: path.join(__dirname, 'node_modules')
	},
	module: {
		loaders: []
	}
};