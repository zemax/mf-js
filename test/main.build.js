(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// requestAnimationFrame polyfill by Erik Möller, fixes from Paul Irish and Tino Zijdel
(function () {
	'use strict';

	if ( typeof exports === 'object' ) {
		require('../date/now');
	}

	var lastTime = 0;
	var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

	for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ) {
		window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
		window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
	}

	if ( window.requestAnimationFrame === undefined ) {
		window.requestAnimationFrame = function (callback, element) {
			var currTime = Date.now(), timeToCall = Math.max(0, 16 - ( currTime - lastTime ));
			var id = window.setTimeout(function () {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	window.cancelAnimationFrame = window.cancelAnimationFrame || function (id) {
		window.clearTimeout(id);
	};

	if ( typeof exports === 'object' ) {
		var bind = require('../core/bind');

		module.exports = {
			requestAnimationFrame: bind(window.requestAnimationFrame, window),
			cancelAnimationFrame:  bind(window.cancelAnimationFrame, window)
		};
	}
})();

},{"../core/bind":3,"../date/now":5}],2:[function(require,module,exports){
// Cookie management
// jQuery-simplified version of https://github.com/carhartl/jquery-cookies
(function (root, factory) {
	if ( typeof exports === 'object' ) {
		module.exports = factory();
	} else {
		root.cookie = factory();
	}
}(this, function () {
	'use strict';

	function cookieParse(s) {
		var pluses = /\+/g;

		if ( s.indexOf('"') === 0 ) {
			// This is a quoted cookies as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookies, ignore it, it's unusable.
			// If we can't parse the cookies, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return s;
		} catch ( e ) {
		}
	}

	function cookie(key, value, options) {
		options = options || {};

		// Write

		if ( arguments.length > 1 ) {
			if ( typeof options.expires === 'number' ) {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encodeURIComponent(key), '=', encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '',
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookies().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for ( var i = 0, l = cookies.length; i < l; i++ ) {
			var parts = cookies[ i ].split('=');
			var name = decodeURIComponent(parts.shift());
			var cookie = parts.join('=');

			if ( key && key === name ) {
				result = cookieParse(cookie);
				break;
			}

			// Prevent storing a cookies that we couldn't decode.
			if ( !key && (cookie = cookieParse(cookie)) !== undefined ) {
				result[ name ] = cookie;
			}
		}

		return result;
	}

	return cookie;
}));

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
// Date.now polyfill
(function () {
	'use strict';

	Date.now = Date.now || function () {
		return (new Date()).getTime();
	};

	if ( typeof exports === 'object' ) {
		module.exports = Date.now;
	}
})();

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
// Viewport functions
(function (root, factory) {
	if ( typeof exports === 'object' ) {
		module.exports = factory();
	} else {
		root.Viewport = factory();
	}
}(this, function () {
	'use strict';

	var Viewport = {
		/**
		 * Determine if an element is in the visible viewport
		 *
		 * @param element
		 * @returns {boolean}
		 */
		isInViewport: function (element) {
			var rect = element.getBoundingClientRect();
			var html = document.documentElement;
			return ((rect.top >= 0)
			&& (rect.left >= 0)
			&& (rect.bottom <= (window.innerHeight || html.clientHeight))
			&& (rect.right <= (window.innerWidth || html.clientWidth))
			);
		},

		/**
		 * Return Viewport size
		 *
		 * @returns {{width: (Number|number), height: (Number|number)}}
		 */
		getViewportSize: function () {
			return {
				width:  window.innerWidth || document.documentElement.clientWidth,
				height: window.innerHeight || document.documentElement.clientHeight
			};
		},

		/**
		 * Return Scroll top left position
		 *
		 * @returns {{x: Number, y: Number}}
		 */
		getScrollPosition: function () {
			return {
				x: (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
				y: (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
			};
		}
	}

	return Viewport;
}));

},{}],8:[function(require,module,exports){
// Extend
(function () {
	var extend = require('../modules/core/extend');

	var a = {
		name: 'Bob',
		age:  36
	};

	var b = {
		name: 'Alfred',
		car:  '307 SW'
	};



	console.group('dom/extend');

	console.group('before :');
	console.log(a);
	console.log(b);
	console.groupEnd();

	extend(a, b);

	console.group('after :');
	console.log(a);
	console.log(b);
	console.groupEnd();

	console.groupEnd();
})();

// -- Now
(function () {
	var now = require('../modules/date/now');
	console.group('date/now');
	console.log('Date.now(): ' + Date.now());
	console.log('now(): ' + now());
	console.groupEnd();
})();

// -- Cookie
(function () {
	var cookie = require('../modules/cookies/cookie'),
		now = require('../modules/date/now');

	var c = cookie('test');

	console.group('cookies/cookie');
	console.log('Cookie get: ' + c);

	c = 'Hello World ' + now();
	cookie('test', c);
	console.log('Cookie set: ' + c + ', refresh to test');
	console.groupEnd();
})();

// -- Viewport
(function () {
	var vp = require('../modules/dom/viewport');

	console.group('dom/viewport');
	console.log('Viewport.getViewportSize:');
	console.log(vp.getViewportSize());
	console.groupEnd();
})();

// requestAnimationFrame
(function () {
	var rAF = require('../modules/animation/requestAnimationFrame');
	var r;
	var f = function () {
		console.log('requestAnimationFrame');

		r = rAF.requestAnimationFrame(f);
	};
	f();

	setTimeout(function () {
		console.log('cancelAnimationFrame');
		rAF.cancelAnimationFrame(r);
	}, 1000);
})();

// DOM Ready
(function () {
	var ready = require('../modules/dom/ready');

	console.group('dom/ready');
	ready(function () {
		console.log('1st ready');
		console.log(this);

		ready(function () {
			console.log('2nd ready');
			console.log(this);
		});
	});
	console.groupEnd();
})();
},{"../modules/animation/requestAnimationFrame":1,"../modules/cookies/cookie":2,"../modules/core/extend":4,"../modules/date/now":5,"../modules/dom/ready":6,"../modules/dom/viewport":7}]},{},[8])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uL21vZHVsZXMvYW5pbWF0aW9uL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsIi4uL21vZHVsZXMvY29va2llcy9jb29raWUuanMiLCIuLi9tb2R1bGVzL2NvcmUvYmluZC5qcyIsIi4uL21vZHVsZXMvY29yZS9leHRlbmQuanMiLCIuLi9tb2R1bGVzL2RhdGUvbm93LmpzIiwiLi4vbW9kdWxlcy9kb20vcmVhZHkuanMiLCIuLi9tb2R1bGVzL2RvbS92aWV3cG9ydC5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSBwb2x5ZmlsbCBieSBFcmlrIE3DtmxsZXIsIGZpeGVzIGZyb20gUGF1bCBJcmlzaCBhbmQgVGlubyBaaWpkZWxcbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRpZiAoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApIHtcblx0XHRyZXF1aXJlKCcuLi9kYXRlL25vdycpO1xuXHR9XG5cblx0dmFyIGxhc3RUaW1lID0gMDtcblx0dmFyIHZlbmRvcnMgPSBbICdtcycsICdtb3onLCAnd2Via2l0JywgJ28nIF07XG5cblx0Zm9yICggdmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCApIHtcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93WyB2ZW5kb3JzWyB4IF0gKyAnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJyBdO1xuXHRcdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1sgdmVuZG9yc1sgeCBdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJyBdIHx8IHdpbmRvd1sgdmVuZG9yc1sgeCBdICsgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZScgXTtcblx0fVxuXG5cdGlmICggd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGVsZW1lbnQpIHtcblx0XHRcdHZhciBjdXJyVGltZSA9IERhdGUubm93KCksIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtICggY3VyclRpbWUgLSBsYXN0VGltZSApKTtcblx0XHRcdHZhciBpZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTtcblx0XHRcdH0sIHRpbWVUb0NhbGwpO1xuXHRcdFx0bGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG5cdFx0XHRyZXR1cm4gaWQ7XG5cdFx0fTtcblx0fVxuXG5cdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCBmdW5jdGlvbiAoaWQpIHtcblx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KGlkKTtcblx0fTtcblxuXHRpZiAoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApIHtcblx0XHR2YXIgYmluZCA9IHJlcXVpcmUoJy4uL2NvcmUvYmluZCcpO1xuXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWU6IGJpbmQod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSwgd2luZG93KSxcblx0XHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lOiAgYmluZCh3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUsIHdpbmRvdylcblx0XHR9O1xuXHR9XG59KSgpO1xuIiwiLy8gQ29va2llIG1hbmFnZW1lbnRcbi8vIGpRdWVyeS1zaW1wbGlmaWVkIHZlcnNpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL2NhcmhhcnRsL2pxdWVyeS1jb29raWVzXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH0gZWxzZSB7XG5cdFx0cm9vdC5jb29raWUgPSBmYWN0b3J5KCk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0ZnVuY3Rpb24gY29va2llUGFyc2Uocykge1xuXHRcdHZhciBwbHVzZXMgPSAvXFwrL2c7XG5cblx0XHRpZiAoIHMuaW5kZXhPZignXCInKSA9PT0gMCApIHtcblx0XHRcdC8vIFRoaXMgaXMgYSBxdW90ZWQgY29va2llcyBhcyBhY2NvcmRpbmcgdG8gUkZDMjA2OCwgdW5lc2NhcGUuLi5cblx0XHRcdHMgPSBzLnNsaWNlKDEsIC0xKS5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykucmVwbGFjZSgvXFxcXFxcXFwvZywgJ1xcXFwnKTtcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gUmVwbGFjZSBzZXJ2ZXItc2lkZSB3cml0dGVuIHBsdXNlcyB3aXRoIHNwYWNlcy5cblx0XHRcdC8vIElmIHdlIGNhbid0IGRlY29kZSB0aGUgY29va2llcywgaWdub3JlIGl0LCBpdCdzIHVudXNhYmxlLlxuXHRcdFx0Ly8gSWYgd2UgY2FuJ3QgcGFyc2UgdGhlIGNvb2tpZXMsIGlnbm9yZSBpdCwgaXQncyB1bnVzYWJsZS5cblx0XHRcdHMgPSBkZWNvZGVVUklDb21wb25lbnQocy5yZXBsYWNlKHBsdXNlcywgJyAnKSk7XG5cdFx0XHRyZXR1cm4gcztcblx0XHR9IGNhdGNoICggZSApIHtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBjb29raWUoa2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0Ly8gV3JpdGVcblxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCA+IDEgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBvcHRpb25zLmV4cGlyZXMgPT09ICdudW1iZXInICkge1xuXHRcdFx0XHR2YXIgZGF5cyA9IG9wdGlvbnMuZXhwaXJlcywgdCA9IG9wdGlvbnMuZXhwaXJlcyA9IG5ldyBEYXRlKCk7XG5cdFx0XHRcdHQuc2V0VGltZSgrdCArIGRheXMgKiA4NjRlKzUpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gKGRvY3VtZW50LmNvb2tpZSA9IFtcblx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KGtleSksICc9JywgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSxcblx0XHRcdFx0b3B0aW9ucy5leHBpcmVzID8gJzsgZXhwaXJlcz0nICsgb3B0aW9ucy5leHBpcmVzLnRvVVRDU3RyaW5nKCkgOiAnJyxcblx0XHRcdFx0b3B0aW9ucy5wYXRoID8gJzsgcGF0aD0nICsgb3B0aW9ucy5wYXRoIDogJycsXG5cdFx0XHRcdG9wdGlvbnMuZG9tYWluID8gJzsgZG9tYWluPScgKyBvcHRpb25zLmRvbWFpbiA6ICcnLFxuXHRcdFx0XHRvcHRpb25zLnNlY3VyZSA/ICc7IHNlY3VyZScgOiAnJ1xuXHRcdFx0XS5qb2luKCcnKSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVhZFxuXG5cdFx0dmFyIHJlc3VsdCA9IGtleSA/IHVuZGVmaW5lZCA6IHt9O1xuXG5cdFx0Ly8gVG8gcHJldmVudCB0aGUgZm9yIGxvb3AgaW4gdGhlIGZpcnN0IHBsYWNlIGFzc2lnbiBhbiBlbXB0eSBhcnJheVxuXHRcdC8vIGluIGNhc2UgdGhlcmUgYXJlIG5vIGNvb2tpZXMgYXQgYWxsLiBBbHNvIHByZXZlbnRzIG9kZCByZXN1bHQgd2hlblxuXHRcdC8vIGNhbGxpbmcgJC5jb29raWVzKCkuXG5cdFx0dmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUgPyBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJykgOiBbXTtcblxuXHRcdGZvciAoIHZhciBpID0gMCwgbCA9IGNvb2tpZXMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0dmFyIHBhcnRzID0gY29va2llc1sgaSBdLnNwbGl0KCc9Jyk7XG5cdFx0XHR2YXIgbmFtZSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJ0cy5zaGlmdCgpKTtcblx0XHRcdHZhciBjb29raWUgPSBwYXJ0cy5qb2luKCc9Jyk7XG5cblx0XHRcdGlmICgga2V5ICYmIGtleSA9PT0gbmFtZSApIHtcblx0XHRcdFx0cmVzdWx0ID0gY29va2llUGFyc2UoY29va2llKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFByZXZlbnQgc3RvcmluZyBhIGNvb2tpZXMgdGhhdCB3ZSBjb3VsZG4ndCBkZWNvZGUuXG5cdFx0XHRpZiAoICFrZXkgJiYgKGNvb2tpZSA9IGNvb2tpZVBhcnNlKGNvb2tpZSkpICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJlc3VsdFsgbmFtZSBdID0gY29va2llO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRyZXR1cm4gY29va2llO1xufSkpO1xuIiwiKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICggdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICkge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9IGVsc2Uge1xuXHRcdHJvb3QuYmluZCA9IGZhY3RvcnkoKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgYmluZCA9IGZ1bmN0aW9uIChtZXRob2QsIGluc3RhbmNlKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBtZXRob2QuYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cyk7XG5cdFx0fTtcblx0fTtcblxuXHRyZXR1cm4gYmluZDtcbn0pKTtcbiIsIihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0fSBlbHNlIHtcblx0XHRyb290LmV4dGVuZCA9IGZhY3RvcnkoKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRmdW5jdGlvbiBkZWVwRXh0ZW5kKG91dCkge1xuXHRcdG91dCA9IG91dCB8fCB7fTtcblxuXHRcdGZvciAoIHZhciBpID0gMSwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHR2YXIgb2JqID0gYXJndW1lbnRzWyBpIF07XG5cblx0XHRcdGlmICggIW9iaiApIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoIHZhciBrZXkgaW4gb2JqICkge1xuXHRcdFx0XHRpZiAoIG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpICkge1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIG9ialsga2V5IF0gPT09ICdvYmplY3QnICkge1xuXHRcdFx0XHRcdFx0ZGVlcEV4dGVuZChvdXRbIGtleSBdLCBvYmpbIGtleSBdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRvdXRbIGtleSBdID0gb2JqWyBrZXkgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0O1xuXHR9O1xuXG5cdHJldHVybiBkZWVwRXh0ZW5kO1xufSkpO1xuIiwiLy8gRGF0ZS5ub3cgcG9seWZpbGxcbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHREYXRlLm5vdyA9IERhdGUubm93IHx8IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblx0fTtcblxuXHRpZiAoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IERhdGUubm93O1xuXHR9XG59KSgpO1xuIiwiKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICggdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICkge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9IGVsc2Uge1xuXHRcdHJvb3QuZG9tcmVhZHkgPSBmYWN0b3J5KCk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHJlYWR5ID0gZmFsc2UsXG5cdFx0c3RhY2sgPSBbXTtcblxuXHRmdW5jdGlvbiBjb21wbGV0ZWQoKSB7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNvbXBsZXRlZCwgZmFsc2UpO1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgY29tcGxldGVkLCBmYWxzZSk7XG5cblx0XHR2YXIgZjtcblx0XHR3aGlsZSAoIGYgPSBzdGFjay5zaGlmdCgpICkge1xuXHRcdFx0c2V0VGltZW91dChmLCAwKTtcblx0XHR9XG5cblx0XHRyZWFkeSA9IHRydWU7XG5cdH1cblxuXHRmdW5jdGlvbiBkb21yZWFkeShmKSB7XG5cdFx0aWYgKCB0eXBlb2YgZiAhPSAnZnVuY3Rpb24nICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggcmVhZHkgfHwgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScgKSApIHtcblx0XHRcdHNldFRpbWVvdXQoZiwgMCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCBzdGFjay5sZW5ndGggPD0gMCApIHtcblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjb21wbGV0ZWQsIGZhbHNlKTtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY29tcGxldGVkLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0c3RhY2sucHVzaChmKTtcblx0fVxuXG5cdHJldHVybiBkb21yZWFkeTtcbn0pKTtcbiIsIi8vIFZpZXdwb3J0IGZ1bmN0aW9uc1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICggdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICkge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9IGVsc2Uge1xuXHRcdHJvb3QuVmlld3BvcnQgPSBmYWN0b3J5KCk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFZpZXdwb3J0ID0ge1xuXHRcdC8qKlxuXHRcdCAqIERldGVybWluZSBpZiBhbiBlbGVtZW50IGlzIGluIHRoZSB2aXNpYmxlIHZpZXdwb3J0XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gZWxlbWVudFxuXHRcdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHRcdCAqL1xuXHRcdGlzSW5WaWV3cG9ydDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdHZhciBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0cmV0dXJuICgocmVjdC50b3AgPj0gMClcblx0XHRcdCYmIChyZWN0LmxlZnQgPj0gMClcblx0XHRcdCYmIChyZWN0LmJvdHRvbSA8PSAod2luZG93LmlubmVySGVpZ2h0IHx8IGh0bWwuY2xpZW50SGVpZ2h0KSlcblx0XHRcdCYmIChyZWN0LnJpZ2h0IDw9ICh3aW5kb3cuaW5uZXJXaWR0aCB8fCBodG1sLmNsaWVudFdpZHRoKSlcblx0XHRcdCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybiBWaWV3cG9ydCBzaXplXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJucyB7e3dpZHRoOiAoTnVtYmVyfG51bWJlciksIGhlaWdodDogKE51bWJlcnxudW1iZXIpfX1cblx0XHQgKi9cblx0XHRnZXRWaWV3cG9ydFNpemU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHdpZHRoOiAgd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLFxuXHRcdFx0XHRoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm4gU2Nyb2xsIHRvcCBsZWZ0IHBvc2l0aW9uXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJucyB7e3g6IE51bWJlciwgeTogTnVtYmVyfX1cblx0XHQgKi9cblx0XHRnZXRTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0eDogKHdpbmRvdy5wYWdlWE9mZnNldCAhPT0gdW5kZWZpbmVkKSA/IHdpbmRvdy5wYWdlWE9mZnNldCA6IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlIHx8IGRvY3VtZW50LmJvZHkpLnNjcm9sbExlZnQsXG5cdFx0XHRcdHk6ICh3aW5kb3cucGFnZVlPZmZzZXQgIT09IHVuZGVmaW5lZCkgPyB3aW5kb3cucGFnZVlPZmZzZXQgOiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IGRvY3VtZW50LmJvZHkucGFyZW50Tm9kZSB8fCBkb2N1bWVudC5ib2R5KS5zY3JvbGxUb3Bcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIFZpZXdwb3J0O1xufSkpO1xuIiwiLy8gRXh0ZW5kXG4oZnVuY3Rpb24gKCkge1xuXHR2YXIgZXh0ZW5kID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlL2V4dGVuZCcpO1xuXG5cdHZhciBhID0ge1xuXHRcdG5hbWU6ICdCb2InLFxuXHRcdGFnZTogIDM2XG5cdH07XG5cblx0dmFyIGIgPSB7XG5cdFx0bmFtZTogJ0FsZnJlZCcsXG5cdFx0Y2FyOiAgJzMwNyBTVydcblx0fTtcblxuXG5cblx0Y29uc29sZS5ncm91cCgnZG9tL2V4dGVuZCcpO1xuXG5cdGNvbnNvbGUuZ3JvdXAoJ2JlZm9yZSA6Jyk7XG5cdGNvbnNvbGUubG9nKGEpO1xuXHRjb25zb2xlLmxvZyhiKTtcblx0Y29uc29sZS5ncm91cEVuZCgpO1xuXG5cdGV4dGVuZChhLCBiKTtcblxuXHRjb25zb2xlLmdyb3VwKCdhZnRlciA6Jyk7XG5cdGNvbnNvbGUubG9nKGEpO1xuXHRjb25zb2xlLmxvZyhiKTtcblx0Y29uc29sZS5ncm91cEVuZCgpO1xuXG5cdGNvbnNvbGUuZ3JvdXBFbmQoKTtcbn0pKCk7XG5cbi8vIC0tIE5vd1xuKGZ1bmN0aW9uICgpIHtcblx0dmFyIG5vdyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvZGF0ZS9ub3cnKTtcblx0Y29uc29sZS5ncm91cCgnZGF0ZS9ub3cnKTtcblx0Y29uc29sZS5sb2coJ0RhdGUubm93KCk6ICcgKyBEYXRlLm5vdygpKTtcblx0Y29uc29sZS5sb2coJ25vdygpOiAnICsgbm93KCkpO1xuXHRjb25zb2xlLmdyb3VwRW5kKCk7XG59KSgpO1xuXG4vLyAtLSBDb29raWVcbihmdW5jdGlvbiAoKSB7XG5cdHZhciBjb29raWUgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2Nvb2tpZXMvY29va2llJyksXG5cdFx0bm93ID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9kYXRlL25vdycpO1xuXG5cdHZhciBjID0gY29va2llKCd0ZXN0Jyk7XG5cblx0Y29uc29sZS5ncm91cCgnY29va2llcy9jb29raWUnKTtcblx0Y29uc29sZS5sb2coJ0Nvb2tpZSBnZXQ6ICcgKyBjKTtcblxuXHRjID0gJ0hlbGxvIFdvcmxkICcgKyBub3coKTtcblx0Y29va2llKCd0ZXN0JywgYyk7XG5cdGNvbnNvbGUubG9nKCdDb29raWUgc2V0OiAnICsgYyArICcsIHJlZnJlc2ggdG8gdGVzdCcpO1xuXHRjb25zb2xlLmdyb3VwRW5kKCk7XG59KSgpO1xuXG4vLyAtLSBWaWV3cG9ydFxuKGZ1bmN0aW9uICgpIHtcblx0dmFyIHZwID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9kb20vdmlld3BvcnQnKTtcblxuXHRjb25zb2xlLmdyb3VwKCdkb20vdmlld3BvcnQnKTtcblx0Y29uc29sZS5sb2coJ1ZpZXdwb3J0LmdldFZpZXdwb3J0U2l6ZTonKTtcblx0Y29uc29sZS5sb2codnAuZ2V0Vmlld3BvcnRTaXplKCkpO1xuXHRjb25zb2xlLmdyb3VwRW5kKCk7XG59KSgpO1xuXG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbihmdW5jdGlvbiAoKSB7XG5cdHZhciByQUYgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2FuaW1hdGlvbi9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUnKTtcblx0dmFyIHI7XG5cdHZhciBmID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnNvbGUubG9nKCdyZXF1ZXN0QW5pbWF0aW9uRnJhbWUnKTtcblxuXHRcdHIgPSByQUYucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGYpO1xuXHR9O1xuXHRmKCk7XG5cblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2NhbmNlbEFuaW1hdGlvbkZyYW1lJyk7XG5cdFx0ckFGLmNhbmNlbEFuaW1hdGlvbkZyYW1lKHIpO1xuXHR9LCAxMDAwKTtcbn0pKCk7XG5cbi8vIERPTSBSZWFkeVxuKGZ1bmN0aW9uICgpIHtcblx0dmFyIHJlYWR5ID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9kb20vcmVhZHknKTtcblxuXHRjb25zb2xlLmdyb3VwKCdkb20vcmVhZHknKTtcblx0cmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdGNvbnNvbGUubG9nKCcxc3QgcmVhZHknKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzKTtcblxuXHRcdHJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnNvbGUubG9nKCcybmQgcmVhZHknKTtcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMpO1xuXHRcdH0pO1xuXHR9KTtcblx0Y29uc29sZS5ncm91cEVuZCgpO1xufSkoKTsiXX0=
