// Date.now with polyfill
(function (root, factory) {
	if ( typeof exports === 'object' ) {
		module.exports = factory();
	} else {
		root.Date.now = factory();
	}
}(this, function () {
	'use strict';

	return (Date.now || function () {
		return (new Date()).getTime();
	});
}));
