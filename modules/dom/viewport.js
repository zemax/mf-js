// Viewport functions
'use strict';

/**
 * Determine if an element is in the visible viewport
 *
 * @param element
 * @returns {boolean}
 */
export const contains = ( element ) => {
	const rect = element.getBoundingClientRect();
	const html = document.documentElement;
	return ((rect.top >= 0)
			&& (rect.left >= 0)
			&& (rect.bottom <= (window.innerHeight || html.clientHeight))
			&& (rect.right <= (window.innerWidth || html.clientWidth))
	);
};

/**
 * Return Viewport size
 *
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
const size = () => ({
	width:  window.innerWidth || document.documentElement.clientWidth,
	height: window.innerHeight || document.documentElement.clientHeight
});

const viewport = {
	contains,
	size
};

export default viewport;

if ( typeof exports === 'object' ) {
	module.exports = viewport;
}
