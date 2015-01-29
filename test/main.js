// Extend
(function () {
	var extend = require('../modules/core/extend');

	var a = {
		name: 'Bob',
		age:  36
	};

	var b = {
		name: 'Alfred',
		car:  '307 SW'
	};



	console.group('dom/extend');

	console.group('before :');
	console.log(a);
	console.log(b);
	console.groupEnd();

	extend(a, b);

	console.group('after :');
	console.log(a);
	console.log(b);
	console.groupEnd();

	console.groupEnd();
})();

// -- Now
(function () {
	var now = require('../modules/date/now');
	console.group('date/now');
	console.log('Date.now(): ' + Date.now());
	console.log('now(): ' + now());
	console.groupEnd();
})();

// -- Cookie
(function () {
	var cookie = require('../modules/cookies/cookie'),
		now = require('../modules/date/now');

	var c = cookie('test');

	console.group('cookies/cookie');
	console.log('Cookie get: ' + c);

	c = 'Hello World ' + now();
	cookie('test', c);
	console.log('Cookie set: ' + c + ', refresh to test');
	console.groupEnd();
})();

// -- Viewport
(function () {
	var vp = require('../modules/dom/viewport');

	console.group('dom/viewport');
	console.log('Viewport.getViewportSize:');
	console.log(vp.getViewportSize());
	console.groupEnd();
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

// DOM Ready
(function () {
	var ready = require('../modules/dom/ready');

	console.group('dom/ready');
	ready(function () {
		console.log('1st ready');
		console.log(this);

		ready(function () {
			console.log('2nd ready');
			console.log(this);
		});
	});
	console.groupEnd();
})();