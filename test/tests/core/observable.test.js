var test       = require('tape'),
	extend     = require('../../../modules/core/extend'),
	observable = require('../../../modules/core/observable');

test('observable', function (t) {
	function C() {
	};
	extend(C.prototype, observable);

	var a = new C();
	var b = new C();
	var c = new C();

	function f (e){
		count++;
	}

	a.on('pouet', function(e){
		count++;
	});
	b.on('pouet', f);
	c.on('pouet', f);

	var count = 0;

	a.trigger('pouet');
	t.equal(count, 1);

	b.trigger(new Event('pouet'));
	t.equal(count, 2);

	c.trigger('pouet');
	t.equal(count, 3);

	b.off('pouet', f);

	a.trigger('pouet');
	t.equal(count, 4);

	b.trigger(new Event('pouet'));
	t.equal(count, 4);

	c.trigger('pouet');
	t.equal(count, 5);

	t.end();
});