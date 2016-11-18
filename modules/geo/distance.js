/**
 * Return the distance in meters between 2 coordinates
 *
 * @param    point1    expect {latitude, longitude}
 * @param    point2    expect {latitude, longitude}
 * @param    radius    earth radius in meters
 * @return

 */
const distance = ( point1, point2, radius = 6378137 ) => {
	const lat1  = (Math.PI / 180) * point1.latitude;
	const long1 = (Math.PI / 180) * point1.longitude;
	const lat2  = (Math.PI / 180) * point2.latitude;
	const long2 = (Math.PI / 180) * point2.longitude;

	var i = (Math.cos( lat1 ) * Math.cos( lat2 ) * Math.cos( long1 ) * Math.cos( long2 ) + Math.cos( lat1 ) * Math.sin( long1 ) * Math.cos( lat2 ) * Math.sin( long2 ) + Math.sin( lat1 ) * Math.sin( lat2 ));
	var j = (Math.acos( i ));

	if ( isNaN( j ) ) {
		j = 0;
	}

	return (radius * j);
};

export default distance;

if ( typeof exports === 'object' ) {
	module.exports = distance;
}
