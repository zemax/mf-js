/**
 * Return the distance in meters between 2 coordinates
 */
module.exports = function (lat1, long1, lat2, long2, radius) {
    if (typeof radius == "undefined") radius = 6378137;

    lat1 *= (Math.PI / 180);
    long1 *= (Math.PI / 180);
    lat2 *= (Math.PI / 180);
    long2 *= (Math.PI / 180);

    var i = (Math.cos(lat1) * Math.cos(lat2) * Math.cos(long1) * Math.cos(long2) + Math.cos(lat1) * Math.sin(long1) * Math.cos(lat2) * Math.sin(long2) + Math.sin(lat1) * Math.sin(lat2));
    var j = (Math.acos(i));

    if (isNaN(j)) {
        j = 0;
    }

    return (radius * j);
};
