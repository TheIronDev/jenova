
var compress = require('./lib/compress'),
	expand = require('./lib/expand'),
	next = require('./lib/next');

module.exports = {
	compress: compress,
	expand: expand,
	next: next
};