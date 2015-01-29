(function (root, factory) {
	if ( typeof exports === 'object' ) {
		module.exports = factory();
	} else {
		root.bind = factory();
	}
}(this, function () {
	'use strict';

	var bind = function (method, instance) {
		return function () {
			return method.apply(instance, arguments);
		};
	};

	return bind;
}));
