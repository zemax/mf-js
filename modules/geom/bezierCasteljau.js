import Vector2D from "./vector2d";

/**
 * Return positions on a bézier curve
 *
 * @param    t        current time
 * @param    points    points array
 * @return
 */
export const bezierCasteljau = ( t, points ) => {
    let i, j;
    
    if ( points.length === 1 ) {
        points = points[ 0 ];
    }
    
    const output = [];
    for ( i = 0; i < points.length; i++ ) {
        output.push( new Vector2D( points[ i ].x, points[ i ].y ) );
    }
    
    for ( i = 1; i < points.length; i++ ) {
        for ( j = 0; j < points.length - i; j++ ) {
            output[ j ].x = (1 - t) * output[ j ].x + t * output[ j + 1 ].x;
            output[ j ].y = (1 - t) * output[ j ].y + t * output[ j + 1 ].y;
        }
    }
    
    return (output[ 0 ]);
};

export default bezierCasteljau;
