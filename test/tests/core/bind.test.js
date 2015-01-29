var test = require('tape'),
	bind = require('../../../modules/core/bind');

test('bind', function (t) {
	var a = {
		name:   'Alice',
		whoami: function () {
			return 'Alice dit : ' + this.name;
		}
	}

	var b = {
		name:   'Bob',
		whoami: function () {
			return 'Bob dit : ' + this.name;
		}
	}

	t.equal(a.whoami(), 'Alice dit : Alice');
	t.equal(b.whoami(), 'Bob dit : Bob');
	t.equal(bind(a.whoami, b)(), 'Alice dit : Bob');
	t.end();
});
