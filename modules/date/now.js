// Date.now polyfill
(function () {
	'use strict';

	Date.now = Date.now || function () {
		return (new Date()).getTime();
	};

	if ( typeof exports === 'object' ) {
		module.exports = Date.now;
	}
})();
