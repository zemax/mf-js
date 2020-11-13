/**
 * Linear easing
 *
 * @param    time    current time
 * @param    from    start value
 * @param    offset    difference between start and end values
 * @param    duration    duration
 * @return
 */
export const linear = ( time, from, offset, duration ) => {
    return (from + offset * (time / duration));
};

export default linear;
