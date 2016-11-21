"use strict";

export const position = () => ({
	x: (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
	y: (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
});

export const size = () =>({
	width:  (document.documentElement || document.body.parentNode || document.body).scrollWidth,
	height: (document.documentElement || document.body.parentNode || document.body).scrollHeight
});

import ease from '../easing/easeOutQuad';

export const smoothScrollTo = ( to, duration = 750, from = false ) => {
	const time_start = Date.now();

	if ( from === false ) {
		from = position().y;
	}

	const animateScroll = () => {
		const dt = Date.now() - time_start;

		if ( dt >= duration ) {
			window.scrollTo( 0, to );
			return;

		}

		const s = Math.round( ease( dt, from, to - from, duration ) );

		window.scrollTo( 0, s );
		window.requestAnimationFrame( animateScroll );
	};

	animateScroll();
};

const scroll = {
	position,
	size,
	smoothScrollTo
};

export default scroll;

if ( typeof exports === 'object' ) {
	module.exports = scroll;
}
