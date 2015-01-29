(function (root, factory) {
	if ( typeof exports === 'object' ) {
		module.exports = factory();
	} else {
		root.domready = factory();
	}
}(this, function () {
	'use strict';

	var ready = false,
		stack = [];

	function completed() {
		document.removeEventListener('DOMContentLoaded', completed, false);
		window.removeEventListener('load', completed, false);

		var f;
		while ( f = stack.shift() ) {
			setTimeout(f, 0);
		}

		ready = true;
	}

	function domready(f) {
		if ( typeof f != 'function' ) {
			return;
		}

		if ( ready || (document.readyState === 'complete' ) ) {
			setTimeout(f, 0);
			return;
		}

		if ( stack.length <= 0 ) {
			document.addEventListener('DOMContentLoaded', completed, false);
			window.addEventListener('load', completed, false);
		}

		stack.push(f);
	}

	return domready;
}));
