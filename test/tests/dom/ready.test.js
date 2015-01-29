var test  = require('tape'),
	ready = require('../../../modules/dom/ready');

test('domready', function (t) {
	t.plan(2);
	ready(function () {
		t.pass('1st ready');

		ready(function () {
			t.pass('2nd ready');
			t.end();
		});
	});
});
