/**
 * Elastic Out easing
 *
 * @param    t    current time
 * @param    b    start value
 * @param    c    difference between start and end values
 * @param    d    duration
 * @param    a    amplitude
 * @param    p    period
 * @return
 */
module.exports = function (t, b, c, d, a, p) {
    if (t == 0) {
        return (b);
    }

    t = t / d;
    if (t == 1) {
        return (b + c);
    }

    var s = 0;
    if (p != 0) {
        p = d * 0.3;
    }
    if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
    }

    return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
};
