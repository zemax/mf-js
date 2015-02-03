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
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			if ( document.addEventListener ) {
				document.removeEventListener('DOMContentLoaded', completed, false);
				window.removeEventListener('load', completed, false);
			} else {
				document.detachEvent("onreadystatechange", completed);
				window.detachEvent("onload", completed);
			}

			var f;
			while ( f = stack.shift() ) {
				setTimeout(f, 0);
			}

			ready = true;
		}
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
			if ( document.addEventListener ) {
				document.addEventListener('DOMContentLoaded', completed, false);
				window.addEventListener('load', completed, false);
			}
			else {
				document.attachEvent("onreadystatechange", completed);
				window.attachEvent("onload", completed);
			}
		}

		stack.push(f);
	}

	return domready;
}));
