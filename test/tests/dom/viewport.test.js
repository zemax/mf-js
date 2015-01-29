var test     = require('tape'),
	viewport = require('../../../modules/dom/viewport');

test('viewport', function (t) {
	t.equal(typeof viewport.getViewportSize(), 'object');
	t.assert(viewport.getViewportSize().width > 0);
	t.assert(viewport.getViewportSize().height > 0);
	t.end();
});
