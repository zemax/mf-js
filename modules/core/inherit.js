(function (root, factory) {
	if ( typeof exports === 'object' ) {
		module.exports = factory();
	} else {
		root.inherit = factory();
	}
}(this, function () {
	'use strict';

	var inherit = function (Child, Parent) {
		var Synth = function () {
		};
		Synth.prototype = Parent.prototype;
		Child.prototype = new Synth();
		Child.prototype.constructor = Child;
	}

	return inherit;
}));
