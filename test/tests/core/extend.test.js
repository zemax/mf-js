var test   = require('tape'),
	extend = require('../../../modules/core/extend');

test('extend', function (t) {
	var a = {
		name: 'Bob',
		age:  36
	};

	var b = {
		name: 'Alfred',
		car:  '307 SW'
	};

	var c = {
		name: 'Alfred',
		age:  36,
		car:  '307 SW'
	}

	extend(a, b);

	t.deepEqual(a, c);
	t.end();
});
