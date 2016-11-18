import Vector2D from './vector2d';

/**
 * Return positions on a quadratic bézier curve
 *
 * @param    t    current time
 * @param    p0    start point
 * @param    p1    control point
 * @param    p2    end point
 * @return
 */
const bezierQuad = ( t, p0, p1, p2 ) => {
	var t1 = (1 - t);
	var x  = (t1 * t1) * p0.x + (2 * t1 * t) * p1.x + (t * t) * p2.x;
	var y  = (t1 * t1) * p0.y + (2 * t1 * t) * p1.y + (t * t) * p2.y;
	return (new Vector2D( x, y ));
};

export default bezierQuad;

if ( typeof exports === 'object' ) {
	module.exports = bezierQuad;
}
