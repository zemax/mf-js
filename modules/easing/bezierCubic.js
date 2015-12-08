/**
 * Return positions on a cubic bézier curve
 *
 * @param    t    current time
 * @param    p0    start point
 * @param    p1    control point
 * @param    p2    control point
 * @param    p3    end point
 * @return
 */
module.exports = function (t, p0, p1, p2, p3) {
    var t1 = (1 - t);
    var x = (t1 * t1 * t1) * p0.x + (3 * t1 * t1 * t) * p1.x + (3 * t1 * t * t) * p2.x + (t * t * t) * p3.x;
    var y = (t1 * t1 * t1) * p0.y + (3 * t1 * t1 * t) * p1.y + (3 * t1 * t * t) * p2.y + (t * t * t) * p3.y;
    return (new mf.geom.Vector2D(x, y));
};
