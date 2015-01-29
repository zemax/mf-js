var test = require('tape'),
	now  = require('../../../modules/date/now');

test('now', function (t) {
	t.equal(typeof Date.now, 'function');
	t.equal(typeof Date.now(), 'number');
	t.end();
});
