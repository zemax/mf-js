/**
 * Linear easing
 *
 * @param    t    current time
 * @param    b    start value
 * @param    c    difference between start and end values
 * @param    d    duration
 * @return
 */
module.exports = function (t, b, c, d) {
    return (b + c * (t / d));
};
