// requestAnimationFrame polyfill by Erik Möller, fixes from Paul Irish and Tino Zijdel
(function () {
	'use strict';

	if ( typeof exports === 'object' ) {
		require('../date/now');
	}

	var lastTime = 0;
	var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

	for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ) {
		window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
		window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
	}

	if ( window.requestAnimationFrame === undefined ) {
		window.requestAnimationFrame = function (callback, element) {
			var currTime = Date.now(), timeToCall = Math.max(0, 16 - ( currTime - lastTime ));
			var id = window.setTimeout(function () {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	window.cancelAnimationFrame = window.cancelAnimationFrame || function (id) {
		window.clearTimeout(id);
	};

	if ( typeof exports === 'object' ) {
		var bind = require('../core/bind');

		module.exports = {
			requestAnimationFrame: bind(window.requestAnimationFrame, window),
			cancelAnimationFrame:  bind(window.cancelAnimationFrame, window)
		};
	}
})();
