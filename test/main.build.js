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
	console.log('Date.now(): ' + Date.now());
	console.log('now(): ' + now());
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
},{"../modules/animation/requestAnimationFrame":1,"../modules/cookies/cookie":2,"../modules/date/now":4,"../modules/dom/viewport":5}]},{},[6])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uL21vZHVsZXMvYW5pbWF0aW9uL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsIi4uL21vZHVsZXMvY29va2llcy9jb29raWUuanMiLCIuLi9tb2R1bGVzL2NvcmUvYmluZC5qcyIsIi4uL21vZHVsZXMvZGF0ZS9ub3cuanMiLCIuLi9tb2R1bGVzL2RvbS92aWV3cG9ydC5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHBvbHlmaWxsIGJ5IEVyaWsgTcO2bGxlciwgZml4ZXMgZnJvbSBQYXVsIElyaXNoIGFuZCBUaW5vIFppamRlbFxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGlmICggdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICkge1xuXHRcdHJlcXVpcmUoJy4uL2RhdGUvbm93Jyk7XG5cdH1cblxuXHR2YXIgbGFzdFRpbWUgPSAwO1xuXHR2YXIgdmVuZG9ycyA9IFsgJ21zJywgJ21veicsICd3ZWJraXQnLCAnbycgXTtcblxuXHRmb3IgKCB2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4ICkge1xuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbIHZlbmRvcnNbIHggXSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnIF07XG5cdFx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93WyB2ZW5kb3JzWyB4IF0gKyAnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnIF0gfHwgd2luZG93WyB2ZW5kb3JzWyB4IF0gKyAnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJyBdO1xuXHR9XG5cblx0aWYgKCB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSB1bmRlZmluZWQgKSB7XG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgZWxlbWVudCkge1xuXHRcdFx0dmFyIGN1cnJUaW1lID0gRGF0ZS5ub3coKSwgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKCBjdXJyVGltZSAtIGxhc3RUaW1lICkpO1xuXHRcdFx0dmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpO1xuXHRcdFx0fSwgdGltZVRvQ2FsbCk7XG5cdFx0XHRsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcblx0XHRcdHJldHVybiBpZDtcblx0XHR9O1xuXHR9XG5cblx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IGZ1bmN0aW9uIChpZCkge1xuXHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoaWQpO1xuXHR9O1xuXG5cdGlmICggdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICkge1xuXHRcdHZhciBiaW5kID0gcmVxdWlyZSgnLi4vY29yZS9iaW5kJyk7XG5cblx0XHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZTogYmluZCh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLCB3aW5kb3cpLFxuXHRcdFx0Y2FuY2VsQW5pbWF0aW9uRnJhbWU6ICBiaW5kKHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSwgd2luZG93KVxuXHRcdH07XG5cdH1cbn0pKCk7XG4iLCIvLyBDb29raWUgbWFuYWdlbWVudFxuLy8galF1ZXJ5LXNpbXBsaWZpZWQgdmVyc2lvbiBvZiBodHRwczovL2dpdGh1Yi5jb20vY2FyaGFydGwvanF1ZXJ5LWNvb2tpZXNcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0fSBlbHNlIHtcblx0XHRyb290LmNvb2tpZSA9IGZhY3RvcnkoKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRmdW5jdGlvbiBjb29raWVQYXJzZShzKSB7XG5cdFx0dmFyIHBsdXNlcyA9IC9cXCsvZztcblxuXHRcdGlmICggcy5pbmRleE9mKCdcIicpID09PSAwICkge1xuXHRcdFx0Ly8gVGhpcyBpcyBhIHF1b3RlZCBjb29raWVzIGFzIGFjY29yZGluZyB0byBSRkMyMDY4LCB1bmVzY2FwZS4uLlxuXHRcdFx0cyA9IHMuc2xpY2UoMSwgLTEpLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKS5yZXBsYWNlKC9cXFxcXFxcXC9nLCAnXFxcXCcpO1xuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBSZXBsYWNlIHNlcnZlci1zaWRlIHdyaXR0ZW4gcGx1c2VzIHdpdGggc3BhY2VzLlxuXHRcdFx0Ly8gSWYgd2UgY2FuJ3QgZGVjb2RlIHRoZSBjb29raWVzLCBpZ25vcmUgaXQsIGl0J3MgdW51c2FibGUuXG5cdFx0XHQvLyBJZiB3ZSBjYW4ndCBwYXJzZSB0aGUgY29va2llcywgaWdub3JlIGl0LCBpdCdzIHVudXNhYmxlLlxuXHRcdFx0cyA9IGRlY29kZVVSSUNvbXBvbmVudChzLnJlcGxhY2UocGx1c2VzLCAnICcpKTtcblx0XHRcdHJldHVybiBzO1xuXHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGNvb2tpZShrZXksIHZhbHVlLCBvcHRpb25zKSB7XG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0XHQvLyBXcml0ZVxuXG5cdFx0aWYgKCBhcmd1bWVudHMubGVuZ3RoID4gMSApIHtcblx0XHRcdGlmICggdHlwZW9mIG9wdGlvbnMuZXhwaXJlcyA9PT0gJ251bWJlcicgKSB7XG5cdFx0XHRcdHZhciBkYXlzID0gb3B0aW9ucy5leHBpcmVzLCB0ID0gb3B0aW9ucy5leHBpcmVzID0gbmV3IERhdGUoKTtcblx0XHRcdFx0dC5zZXRUaW1lKCt0ICsgZGF5cyAqIDg2NGUrNSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoZG9jdW1lbnQuY29va2llID0gW1xuXHRcdFx0XHRlbmNvZGVVUklDb21wb25lbnQoa2V5KSwgJz0nLCBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLFxuXHRcdFx0XHRvcHRpb25zLmV4cGlyZXMgPyAnOyBleHBpcmVzPScgKyBvcHRpb25zLmV4cGlyZXMudG9VVENTdHJpbmcoKSA6ICcnLFxuXHRcdFx0XHRvcHRpb25zLnBhdGggPyAnOyBwYXRoPScgKyBvcHRpb25zLnBhdGggOiAnJyxcblx0XHRcdFx0b3B0aW9ucy5kb21haW4gPyAnOyBkb21haW49JyArIG9wdGlvbnMuZG9tYWluIDogJycsXG5cdFx0XHRcdG9wdGlvbnMuc2VjdXJlID8gJzsgc2VjdXJlJyA6ICcnXG5cdFx0XHRdLmpvaW4oJycpKTtcblx0XHR9XG5cblx0XHQvLyBSZWFkXG5cblx0XHR2YXIgcmVzdWx0ID0ga2V5ID8gdW5kZWZpbmVkIDoge307XG5cblx0XHQvLyBUbyBwcmV2ZW50IHRoZSBmb3IgbG9vcCBpbiB0aGUgZmlyc3QgcGxhY2UgYXNzaWduIGFuIGVtcHR5IGFycmF5XG5cdFx0Ly8gaW4gY2FzZSB0aGVyZSBhcmUgbm8gY29va2llcyBhdCBhbGwuIEFsc28gcHJldmVudHMgb2RkIHJlc3VsdCB3aGVuXG5cdFx0Ly8gY2FsbGluZyAkLmNvb2tpZXMoKS5cblx0XHR2YXIgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZSA/IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKSA6IFtdO1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwLCBsID0gY29va2llcy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHR2YXIgcGFydHMgPSBjb29raWVzWyBpIF0uc3BsaXQoJz0nKTtcblx0XHRcdHZhciBuYW1lID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzLnNoaWZ0KCkpO1xuXHRcdFx0dmFyIGNvb2tpZSA9IHBhcnRzLmpvaW4oJz0nKTtcblxuXHRcdFx0aWYgKCBrZXkgJiYga2V5ID09PSBuYW1lICkge1xuXHRcdFx0XHRyZXN1bHQgPSBjb29raWVQYXJzZShjb29raWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0Ly8gUHJldmVudCBzdG9yaW5nIGEgY29va2llcyB0aGF0IHdlIGNvdWxkbid0IGRlY29kZS5cblx0XHRcdGlmICggIWtleSAmJiAoY29va2llID0gY29va2llUGFyc2UoY29va2llKSkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmVzdWx0WyBuYW1lIF0gPSBjb29raWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdHJldHVybiBjb29raWU7XG59KSk7XG4iLCIoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QuYmluZCA9IGZhY3RvcnkoKTtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgYmluZCA9IGZ1bmN0aW9uIChtZXRob2QsIGluc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KGluc3RhbmNlLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4gYmluZDtcbn0pKTtcbiIsIi8vIERhdGUubm93IHBvbHlmaWxsXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0RGF0ZS5ub3cgPSBEYXRlLm5vdyB8fCBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cdH07XG5cblx0aWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBEYXRlLm5vdztcblx0fVxufSkoKTtcbiIsIi8vIFZpZXdwb3J0IGZ1bmN0aW9uc1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290LlZpZXdwb3J0ID0gZmFjdG9yeSgpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBWaWV3cG9ydCA9IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERldGVybWluZSBpZiBhbiBlbGVtZW50IGlzIGluIHRoZSB2aXNpYmxlIHZpZXdwb3J0XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgaXNJblZpZXdwb3J0OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdmFyIGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICByZXR1cm4gKChyZWN0LnRvcCA+PSAwKVxuICAgICAgICAgICAgJiYgKHJlY3QubGVmdCA+PSAwKVxuICAgICAgICAgICAgJiYgKHJlY3QuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgaHRtbC5jbGllbnRIZWlnaHQpKVxuICAgICAgICAgICAgJiYgKHJlY3QucmlnaHQgPD0gKHdpbmRvdy5pbm5lcldpZHRoIHx8IGh0bWwuY2xpZW50V2lkdGgpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIFZpZXdwb3J0IHNpemVcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge3t3aWR0aDogKE51bWJlcnxudW1iZXIpLCBoZWlnaHQ6IChOdW1iZXJ8bnVtYmVyKX19XG4gICAgICAgICAqL1xuICAgICAgICBnZXRWaWV3cG9ydFNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gU2Nyb2xsIHRvcCBsZWZ0IHBvc2l0aW9uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHt7eDogTnVtYmVyLCB5OiBOdW1iZXJ9fVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0U2Nyb2xsUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogKHdpbmRvdy5wYWdlWE9mZnNldCAhPT0gdW5kZWZpbmVkKSA/IHdpbmRvdy5wYWdlWE9mZnNldCA6IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlIHx8IGRvY3VtZW50LmJvZHkpLnNjcm9sbExlZnQsXG4gICAgICAgICAgICAgICAgeTogKHdpbmRvdy5wYWdlWU9mZnNldCAhPT0gdW5kZWZpbmVkKSA/IHdpbmRvdy5wYWdlWU9mZnNldCA6IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keS5wYXJlbnROb2RlIHx8IGRvY3VtZW50LmJvZHkpLnNjcm9sbFRvcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBWaWV3cG9ydDtcbn0pKTtcbiIsIi8vIC0tIE5vd1xuKGZ1bmN0aW9uICgpIHtcblx0dmFyIG5vdyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvZGF0ZS9ub3cnKTtcblx0Y29uc29sZS5sb2coJ0RhdGUubm93KCk6ICcgKyBEYXRlLm5vdygpKTtcblx0Y29uc29sZS5sb2coJ25vdygpOiAnICsgbm93KCkpO1xufSkoKTtcblxuLy8gLS0gQ29va2llXG4oZnVuY3Rpb24gKCkge1xuXHR2YXIgY29va2llID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb29raWVzL2Nvb2tpZScpO1xuXHR2YXIgYyA9IGNvb2tpZSgnSGVsbG8nKTtcblx0Y29uc29sZS5sb2coJ0Nvb2tpZTogJyArIGMpO1xuXG5cdGNvb2tpZSgnSGVsbG8nLCAnV29ybGQnKTtcbn0pKCk7XG5cbi8vIC0tIFZpZXdwb3J0XG4oZnVuY3Rpb24gKCkge1xuXHR2YXIgdnAgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2RvbS92aWV3cG9ydCcpO1xuXHRjb25zb2xlLmxvZygnVmlld3BvcnQuZ2V0Vmlld3BvcnRTaXplOicpO1xuXHRjb25zb2xlLmxvZyh2cC5nZXRWaWV3cG9ydFNpemUoKSk7XG59KSgpO1xuXG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbihmdW5jdGlvbiAoKSB7XG5cdHZhciByQUYgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2FuaW1hdGlvbi9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUnKTtcblx0dmFyIHI7XG5cdHZhciBmID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnNvbGUubG9nKCdyZXF1ZXN0QW5pbWF0aW9uRnJhbWUnKTtcblxuXHRcdHIgPSByQUYucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGYpO1xuXHR9O1xuXHRmKCk7XG5cblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2NhbmNlbEFuaW1hdGlvbkZyYW1lJyk7XG5cdFx0ckFGLmNhbmNlbEFuaW1hdGlvbkZyYW1lKHIpO1xuXHR9LCAxMDAwKTtcbn0pKCk7Il19
