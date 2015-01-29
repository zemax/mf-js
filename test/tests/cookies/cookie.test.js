var test   = require('tape'),
	now    = require('../../../modules/date/now'),
	cookie = require('../../../modules/cookies/cookie');

test('cookie', function (t) {
	var cookie_set = 'Hello World ' + now();
	cookie('test', cookie_set);

	var cookie_get = cookie('test');

	t.equal(cookie_set, cookie_get);
	t.end();
});
