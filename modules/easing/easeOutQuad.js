/**
 * Quadratic Out Easing
 *
 * @param    time    current time
 * @param    from    start value
 * @param    offset    difference between start and end values
 * @param    duration    duration
 * @return
 */
const easeOutQuad = ( time, from, offset, duration ) => {
	time = time / duration;
	return (-offset * time * (time - 2) + from);
};

export default easeOutQuad;

if ( typeof exports === 'object' ) {
	module.exports = easeOutQuad;
}
