import Vector2D from './vector2d';

/**
 * Return positions on a linear bézier curve
 *
 * @param    t    current time
 * @param    p0    start point
 * @param    p1    end point
 * @return
 */
const bezierLinear = ( t, p0, p1 ) => {
	var t1 = (1 - t);
	var x  = t1 * p0.x + t * p1.x;
	var y  = t1 * p0.y + t * p1.y;
	return (new Vector2D( x, y ));
};

export default bezierLinear;

if ( typeof exports === 'object' ) {
	module.exports = bezierLinear;
}
