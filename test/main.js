// -- Now
(function () {
	var now = require('../modules/date/now');
	console.log('Date.now(): ' + Date.now());
	console.log('now(): ' + now());
})();

// -- Cookie
(function () {
	var cookie = require('../modules/cookies/cookie');
	var c = cookie('Hello');
	console.log('Cookie: ' + c);

	cookie('Hello', 'World');
})();

// -- Viewport
(function () {
	var vp = require('../modules/dom/viewport');
	console.log('Viewport.getViewportSize:');
	console.log(vp.getViewportSize());
})();

// requestAnimationFrame
(function () {
	var rAF = require('../modules/animation/requestAnimationFrame');
	var r;
	var f = function () {
		console.log('requestAnimationFrame');

		r = rAF.requestAnimationFrame(f);
	};
	f();

	setTimeout(function () {
		console.log('cancelAnimationFrame');
		rAF.cancelAnimationFrame(r);
	}, 1000);
})();