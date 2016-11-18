'use strict';

/**
 * Constructor
 */
class Color {
	constructor( r, g, b ) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	getNBTransform( ratio ) {
		var rwgt = 0.3086;
		var gwgt = 0.6094;
		var bwgt = 0.0820;

		var r = ((1 - ratio) + ratio * rwgt) * this.r + (ratio * gwgt) * this.g + (ratio * bwgt) * this.b;
		var g = (ratio * rwgt) * this.r + ((1 - ratio) + ratio * gwgt) * this.g + (ratio * bwgt) * this.b;
		var b = (ratio * rwgt) * this.r + (ratio * gwgt) * this.g + ((1 - ratio) + ratio * bwgt) * this.b;

		return (new Color( r, g, b ));
	}

	/**
	 * Return a Color from HSB values
	 *
	 * @param    h    (0 - 360)
	 * @param    s    (0 - 100)
	 * @param    v    (0 - 100)
	 * @return
	 */
	static hsb( h, s, v ) {
		var r = 0, g = 0, b = 0;

		h = h % 360;
		s /= 100;
		v /= 100;
		h /= 60;

		var i = Math.floor( h );
		var f = h - i;
		var p = v * (1 - s);
		var q = v * (1 - (s * f));
		var t = v * (1 - (s * (1 - f)));

		if ( i == 0 ) {
			r = v;
			g = t;
			b = p;
		}
		else if ( i == 1 ) {
			r = q;
			g = v;
			b = p;
		}
		else if ( i == 2 ) {
			r = p;
			g = v;
			b = t;
		}
		else if ( i == 3 ) {
			r = p;
			g = q;
			b = v;
		}
		else if ( i == 4 ) {
			r = t;
			g = p;
			b = v;
		}
		else if ( i == 5 ) {
			r = v;
			g = p;
			b = q;
		}

		r = Math.floor( r * 255 );
		g = Math.floor( g * 255 );
		b = Math.floor( b * 255 );

		return (new Color( r, g, b ));
	}
}

export default Color;

if ( typeof exports === 'object' ) {
	module.exports = Color;
}
