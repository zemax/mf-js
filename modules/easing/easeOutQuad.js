/**
 * Quadratic Out Easing
 *
 * @param    t    current time
 * @param    b    start value
 * @param    c    difference between start and end values
 * @param    d    duration
 * @return
 */
module.exports = function (t, b, c, d) {
    t = t / d;
    return (-c * t * (t - 2) + b);
};
