"use strict";

export const position = () => ({
	x: (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
	y: (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
});

export const size = () =>({
	width:  (document.documentElement || document.body.parentNode || document.body).scrollWidth,
	height: (document.documentElement || document.body.parentNode || document.body).scrollHeight
});

const scroll = {
	position,
	size
};

export default scroll;

if ( typeof exports === 'object' ) {
	module.exports = scroll;
}
