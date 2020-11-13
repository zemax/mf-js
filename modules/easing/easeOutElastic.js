/**
 * Elastic Out easing
 *
 * @param    time    current time
 * @param    from    start value
 * @param    offset    difference between start and end values
 * @param    duration    duration
 * @param    amplitude    amplitude
 * @param    period    period
 * @return
 */
export const easeOutElastic = ( time, from, offset, duration, amplitude, period ) => {
    if ( time === 0 ) {
        return (from);
    }
    
    time = time / duration;
    if ( time === 1 ) {
        return (from + offset);
    }
    
    let s;
    
    if ( period !== 0 ) {
        period = duration * 0.3;
    }
    if ( amplitude < Math.abs( offset ) ) {
        amplitude = offset;
        s         = period / 4;
    }
    else {
        s = period / (2 * Math.PI) * Math.asin( offset / amplitude );
    }
    
    return (amplitude * Math.pow( 2, -10 * time ) * Math.sin( (time * duration - s) * (2 * Math.PI) / period ) + offset + from);
};

export default easeOutElastic;
