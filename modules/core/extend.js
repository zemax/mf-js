(function (root, factory) {
	if ( typeof exports === 'object' ) {
		module.exports = factory();
	} else {
		root.extend = factory();
	}
}(this, function () {
	'use strict';

	function deepExtend(out) {
		out = out || {};

		for ( var i = 1, l = arguments.length; i < l; i++ ) {
			var obj = arguments[ i ];

			if ( !obj ) {
				continue;
			}

			for ( var key in obj ) {
				if ( obj.hasOwnProperty(key) ) {
					if ( typeof obj[ key ] === 'object' ) {
						deepExtend(out[ key ], obj[ key ]);
					}
					else {
						out[ key ] = obj[ key ];
					}
				}
			}
		}

		return out;
	};

	return deepExtend;
}));
