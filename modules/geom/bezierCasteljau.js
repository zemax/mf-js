/**
 * Return positions on a bézier curve
 *
 * @param    t        current time
 * @param    points    points array
 * @return
 */
const bezierCasteljau = ( t, points ) => {
	var i, j;

	if ( points.length == 1 ) {
		points = points[ 0 ];
	}

	var output = [];
	for ( i = 0; i < points.length; i++ ) {
		output.push( new mf.geom.Vector2D( points[ i ].x, points[ i ].y ) );
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

if ( typeof exports === 'object' ) {
	module.exports = bezierCasteljau;
}
