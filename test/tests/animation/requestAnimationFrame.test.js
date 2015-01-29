var test = require('tape'),
	raf  = require('../../../modules/animation/requestAnimationFrame');

test('requestAnimationFrame', function (t) {
	t.plan(3);
	t.equal(typeof window.requestAnimationFrame, 'function');
	t.equal(typeof window.cancelAnimationFrame, 'function');
	window.requestAnimationFrame(function () {
		t.pass('call');
	})
});
