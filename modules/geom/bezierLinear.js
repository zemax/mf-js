import Vector2D from './vector2d';

/**
 * Return positions on a linear bézier curve
 *
 * @param    t    current time
 * @param    p0    start point
 * @param    p1    end point
 * @return
 */
export const bezierLinear = ( t, p0, p1 ) => {
    const t1 = (1 - t);
    const x  = t1 * p0.x + t * p1.x;
    const y  = t1 * p0.y + t * p1.y;
    
    return (new Vector2D( x, y ));
};

export default bezierLinear;
