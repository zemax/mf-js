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

},{"../core/bind":3,"../date/now":4}],2:[function(require,module,exports){
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
    if (typeof exports === 'object') {
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

},{}],5:[function(require,module,exports){
// Viewport functions
(function (root, factory) {
    if (typeof exports === 'object') {
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
                width: window.innerWidth || document.documentElement.clientWidth,
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

},{}],6:[function(require,module,exports){
// -- Now
(function () {
	var now = require('../modules/date/now');
	console.log('Date.now: ' + Date.now());
	console.log('now: ' + now());
})();

// -- Cookie
(function () {
	var cookie = require('../modules/cookies/cookie');
	var c = cookie('Hello');
	console.log('Cookie: ' + c);

	cookie('Hello', 'World');
})();

// -- Viewport
(function () {
	var vp = require('../modules/dom/viewport');
	console.log('Viewport.getViewportSize:');
	console.log(vp.getViewportSize());
})();

// requestAnimationFrame
(function () {
	var rAF = require('../modules/animation/requestAnimationFrame');
	console.log(rAF);
	var r;
	var f = function () {
		console.log('requestAnimationFrame !');

		r = rAF.requestAnimationFrame(f);
	};
	f();

	setTimeout(function () {
		console.log('cancelAnimationFrame !');
		rAF.cancelAnimationFrame(r);
	}, 1000);
})();
},{"../modules/animation/requestAnimationFrame":1,"../modules/cookies/cookie":2,"../modules/date/now":4,"../modules/dom/viewport":5}]},{},[6])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uL21vZHVsZXMvYW5pbWF0aW9uL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsIi4uL21vZHVsZXMvY29va2llcy9jb29raWUuanMiLCIuLi9tb2R1bGVzL2NvcmUvYmluZC5qcyIsIi4uL21vZHVsZXMvZGF0ZS9ub3cuanMiLCIuLi9tb2R1bGVzL2RvbS92aWV3cG9ydC5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGwgYnkgRXJpayBNw7ZsbGVyLCBmaXhlcyBmcm9tIFBhdWwgSXJpc2ggYW5kIFRpbm8gWmlqZGVsXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0aWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XG5cdFx0cmVxdWlyZSgnLi4vZGF0ZS9ub3cnKTtcblx0fVxuXG5cdHZhciBsYXN0VGltZSA9IDA7XG5cdHZhciB2ZW5kb3JzID0gWyAnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJyBdO1xuXG5cdGZvciAoIHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3ggKSB7XG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1sgdmVuZG9yc1sgeCBdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZScgXTtcblx0XHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbIHZlbmRvcnNbIHggXSArICdDYW5jZWxBbmltYXRpb25GcmFtZScgXSB8fCB3aW5kb3dbIHZlbmRvcnNbIHggXSArICdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnIF07XG5cdH1cblxuXHRpZiAoIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09IHVuZGVmaW5lZCApIHtcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBlbGVtZW50KSB7XG5cdFx0XHR2YXIgY3VyclRpbWUgPSBEYXRlLm5vdygpLCB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoIGN1cnJUaW1lIC0gbGFzdFRpbWUgKSk7XG5cdFx0XHR2YXIgaWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG5cdFx0XHR9LCB0aW1lVG9DYWxsKTtcblx0XHRcdGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuXHRcdFx0cmV0dXJuIGlkO1xuXHRcdH07XG5cdH1cblxuXHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgZnVuY3Rpb24gKGlkKSB7XG5cdFx0d2luZG93LmNsZWFyVGltZW91dChpZCk7XG5cdH07XG5cblx0aWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XG5cdFx0dmFyIGJpbmQgPSByZXF1aXJlKCcuLi9jb3JlL2JpbmQnKTtcblxuXHRcdG1vZHVsZS5leHBvcnRzID0ge1xuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lOiBiaW5kKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIHdpbmRvdyksXG5cdFx0XHRjYW5jZWxBbmltYXRpb25GcmFtZTogIGJpbmQod2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lLCB3aW5kb3cpXG5cdFx0fTtcblx0fVxufSkoKTtcbiIsIi8vIENvb2tpZSBtYW5hZ2VtZW50XG4vLyBqUXVlcnktc2ltcGxpZmllZCB2ZXJzaW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9jYXJoYXJ0bC9qcXVlcnktY29va2llc1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICggdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICkge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9IGVsc2Uge1xuXHRcdHJvb3QuY29va2llID0gZmFjdG9yeSgpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGZ1bmN0aW9uIGNvb2tpZVBhcnNlKHMpIHtcblx0XHR2YXIgcGx1c2VzID0gL1xcKy9nO1xuXG5cdFx0aWYgKCBzLmluZGV4T2YoJ1wiJykgPT09IDAgKSB7XG5cdFx0XHQvLyBUaGlzIGlzIGEgcXVvdGVkIGNvb2tpZXMgYXMgYWNjb3JkaW5nIHRvIFJGQzIwNjgsIHVuZXNjYXBlLi4uXG5cdFx0XHRzID0gcy5zbGljZSgxLCAtMSkucmVwbGFjZSgvXFxcXFwiL2csICdcIicpLnJlcGxhY2UoL1xcXFxcXFxcL2csICdcXFxcJyk7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIFJlcGxhY2Ugc2VydmVyLXNpZGUgd3JpdHRlbiBwbHVzZXMgd2l0aCBzcGFjZXMuXG5cdFx0XHQvLyBJZiB3ZSBjYW4ndCBkZWNvZGUgdGhlIGNvb2tpZXMsIGlnbm9yZSBpdCwgaXQncyB1bnVzYWJsZS5cblx0XHRcdC8vIElmIHdlIGNhbid0IHBhcnNlIHRoZSBjb29raWVzLCBpZ25vcmUgaXQsIGl0J3MgdW51c2FibGUuXG5cdFx0XHRzID0gZGVjb2RlVVJJQ29tcG9uZW50KHMucmVwbGFjZShwbHVzZXMsICcgJykpO1xuXHRcdFx0cmV0dXJuIHM7XG5cdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gY29va2llKGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRcdC8vIFdyaXRlXG5cblx0XHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPiAxICkge1xuXHRcdFx0aWYgKCB0eXBlb2Ygb3B0aW9ucy5leHBpcmVzID09PSAnbnVtYmVyJyApIHtcblx0XHRcdFx0dmFyIGRheXMgPSBvcHRpb25zLmV4cGlyZXMsIHQgPSBvcHRpb25zLmV4cGlyZXMgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHR0LnNldFRpbWUoK3QgKyBkYXlzICogODY0ZSs1KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIChkb2N1bWVudC5jb29raWUgPSBbXG5cdFx0XHRcdGVuY29kZVVSSUNvbXBvbmVudChrZXkpLCAnPScsIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSksXG5cdFx0XHRcdG9wdGlvbnMuZXhwaXJlcyA/ICc7IGV4cGlyZXM9JyArIG9wdGlvbnMuZXhwaXJlcy50b1VUQ1N0cmluZygpIDogJycsXG5cdFx0XHRcdG9wdGlvbnMucGF0aCA/ICc7IHBhdGg9JyArIG9wdGlvbnMucGF0aCA6ICcnLFxuXHRcdFx0XHRvcHRpb25zLmRvbWFpbiA/ICc7IGRvbWFpbj0nICsgb3B0aW9ucy5kb21haW4gOiAnJyxcblx0XHRcdFx0b3B0aW9ucy5zZWN1cmUgPyAnOyBzZWN1cmUnIDogJydcblx0XHRcdF0uam9pbignJykpO1xuXHRcdH1cblxuXHRcdC8vIFJlYWRcblxuXHRcdHZhciByZXN1bHQgPSBrZXkgPyB1bmRlZmluZWQgOiB7fTtcblxuXHRcdC8vIFRvIHByZXZlbnQgdGhlIGZvciBsb29wIGluIHRoZSBmaXJzdCBwbGFjZSBhc3NpZ24gYW4gZW1wdHkgYXJyYXlcblx0XHQvLyBpbiBjYXNlIHRoZXJlIGFyZSBubyBjb29raWVzIGF0IGFsbC4gQWxzbyBwcmV2ZW50cyBvZGQgcmVzdWx0IHdoZW5cblx0XHQvLyBjYWxsaW5nICQuY29va2llcygpLlxuXHRcdHZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llID8gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpIDogW107XG5cblx0XHRmb3IgKCB2YXIgaSA9IDAsIGwgPSBjb29raWVzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdHZhciBwYXJ0cyA9IGNvb2tpZXNbIGkgXS5zcGxpdCgnPScpO1xuXHRcdFx0dmFyIG5hbWUgPSBkZWNvZGVVUklDb21wb25lbnQocGFydHMuc2hpZnQoKSk7XG5cdFx0XHR2YXIgY29va2llID0gcGFydHMuam9pbignPScpO1xuXG5cdFx0XHRpZiAoIGtleSAmJiBrZXkgPT09IG5hbWUgKSB7XG5cdFx0XHRcdHJlc3VsdCA9IGNvb2tpZVBhcnNlKGNvb2tpZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBQcmV2ZW50IHN0b3JpbmcgYSBjb29raWVzIHRoYXQgd2UgY291bGRuJ3QgZGVjb2RlLlxuXHRcdFx0aWYgKCAha2V5ICYmIChjb29raWUgPSBjb29raWVQYXJzZShjb29raWUpKSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXN1bHRbIG5hbWUgXSA9IGNvb2tpZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0cmV0dXJuIGNvb2tpZTtcbn0pKTtcbiIsIihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5iaW5kID0gZmFjdG9yeSgpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBiaW5kID0gZnVuY3Rpb24gKG1ldGhvZCwgaW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiBiaW5kO1xufSkpO1xuIiwiLy8gRGF0ZS5ub3cgcG9seWZpbGxcbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHREYXRlLm5vdyA9IERhdGUubm93IHx8IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblx0fTtcblxuXHRpZiAoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IERhdGUubm93O1xuXHR9XG59KSgpO1xuIiwiLy8gVmlld3BvcnQgZnVuY3Rpb25zXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QuVmlld3BvcnQgPSBmYWN0b3J5KCk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIFZpZXdwb3J0ID0ge1xuICAgICAgICAvKipcbiAgICAgICAgICogRGV0ZXJtaW5lIGlmIGFuIGVsZW1lbnQgaXMgaW4gdGhlIHZpc2libGUgdmlld3BvcnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBpc0luVmlld3BvcnQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB2YXIgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgIHJldHVybiAoKHJlY3QudG9wID49IDApXG4gICAgICAgICAgICAmJiAocmVjdC5sZWZ0ID49IDApXG4gICAgICAgICAgICAmJiAocmVjdC5ib3R0b20gPD0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBodG1sLmNsaWVudEhlaWdodCkpXG4gICAgICAgICAgICAmJiAocmVjdC5yaWdodCA8PSAod2luZG93LmlubmVyV2lkdGggfHwgaHRtbC5jbGllbnRXaWR0aCkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gVmlld3BvcnQgc2l6ZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7e3dpZHRoOiAoTnVtYmVyfG51bWJlciksIGhlaWdodDogKE51bWJlcnxudW1iZXIpfX1cbiAgICAgICAgICovXG4gICAgICAgIGdldFZpZXdwb3J0U2l6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBTY3JvbGwgdG9wIGxlZnQgcG9zaXRpb25cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge3t4OiBOdW1iZXIsIHk6IE51bWJlcn19XG4gICAgICAgICAqL1xuICAgICAgICBnZXRTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiAod2luZG93LnBhZ2VYT2Zmc2V0ICE9PSB1bmRlZmluZWQpID8gd2luZG93LnBhZ2VYT2Zmc2V0IDogKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUgfHwgZG9jdW1lbnQuYm9keSkuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICB5OiAod2luZG93LnBhZ2VZT2Zmc2V0ICE9PSB1bmRlZmluZWQpID8gd2luZG93LnBhZ2VZT2Zmc2V0IDogKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUgfHwgZG9jdW1lbnQuYm9keSkuc2Nyb2xsVG9wXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFZpZXdwb3J0O1xufSkpO1xuIiwiLy8gLS0gTm93XG4oZnVuY3Rpb24gKCkge1xuXHR2YXIgbm93ID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9kYXRlL25vdycpO1xuXHRjb25zb2xlLmxvZygnRGF0ZS5ub3c6ICcgKyBEYXRlLm5vdygpKTtcblx0Y29uc29sZS5sb2coJ25vdzogJyArIG5vdygpKTtcbn0pKCk7XG5cbi8vIC0tIENvb2tpZVxuKGZ1bmN0aW9uICgpIHtcblx0dmFyIGNvb2tpZSA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29va2llcy9jb29raWUnKTtcblx0dmFyIGMgPSBjb29raWUoJ0hlbGxvJyk7XG5cdGNvbnNvbGUubG9nKCdDb29raWU6ICcgKyBjKTtcblxuXHRjb29raWUoJ0hlbGxvJywgJ1dvcmxkJyk7XG59KSgpO1xuXG4vLyAtLSBWaWV3cG9ydFxuKGZ1bmN0aW9uICgpIHtcblx0dmFyIHZwID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9kb20vdmlld3BvcnQnKTtcblx0Y29uc29sZS5sb2coJ1ZpZXdwb3J0LmdldFZpZXdwb3J0U2l6ZTonKTtcblx0Y29uc29sZS5sb2codnAuZ2V0Vmlld3BvcnRTaXplKCkpO1xufSkoKTtcblxuLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4oZnVuY3Rpb24gKCkge1xuXHR2YXIgckFGID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9hbmltYXRpb24vcmVxdWVzdEFuaW1hdGlvbkZyYW1lJyk7XG5cdGNvbnNvbGUubG9nKHJBRik7XG5cdHZhciByO1xuXHR2YXIgZiA9IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zb2xlLmxvZygncmVxdWVzdEFuaW1hdGlvbkZyYW1lICEnKTtcblxuXHRcdHIgPSByQUYucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGYpO1xuXHR9O1xuXHRmKCk7XG5cblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2NhbmNlbEFuaW1hdGlvbkZyYW1lICEnKTtcblx0XHRyQUYuY2FuY2VsQW5pbWF0aW9uRnJhbWUocik7XG5cdH0sIDEwMDApO1xufSkoKTsiXX0=
