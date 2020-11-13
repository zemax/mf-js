/**
 * Quadratic Out Easing
 *
 * @param    time    current time
 * @param    from    start value
 * @param    offset    difference between start and end values
 * @param    duration    duration
 * @return
 */
export const easeOutQuad = ( time, from, offset, duration ) => {
    time = time / duration;
    return (-offset * time * (time - 2) + from);
};

export default easeOutQuad;
