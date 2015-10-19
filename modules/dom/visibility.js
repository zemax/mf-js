(function ( root, factory ) {
	if ( typeof exports === 'object' ) {
		module.exports = factory();
	}
	else {
		root.visibility = factory();
	}
}( this, function () {
	'use strict';

// Set the name of the hidden property and the change event for visibility
	var hidden,
		visibilityChange;

	if ( typeof document.hidden !== "undefined" ) { // Opera 12.10 and Firefox 18 and later support
		hidden           = "hidden";
		visibilityChange = "visibilitychange";
	}
	else if ( typeof document.mozHidden !== "undefined" ) {
		hidden           = "mozHidden";
		visibilityChange = "mozvisibilitychange";
	}
	else if ( typeof document.msHidden !== "undefined" ) {
		hidden           = "msHidden";
		visibilityChange = "msvisibilitychange";
	}
	else if ( typeof document.webkitHidden !== "undefined" ) {
		hidden           = "webkitHidden";
		visibilityChange = "webkitvisibilitychange";
	}

	function visibility( onhide, onshow ) {
		if ( typeof document.addEventListener === "undefined" || typeof document[ hidden ] === "undefined" ) {
			return false;
		}
		else {
			document.addEventListener( visibilityChange, function () {
				if ( document[ hidden ] ) {
					onhide();
				}
				else {
					onshow();
				}
			}, false );

			return true;
		}
	};

	return visibility;
} ));
