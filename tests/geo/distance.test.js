import distance from '../../modules/geo/distance';

const Paris   = { latitude: 48.853, longitude: 2.35 };
const NewYork = { latitude: 40.7127837, longitude: -74.0059 };

test( 'distance', function () {
    expect( Math.abs( distance( Paris, NewYork ) - 5836780 ) ).toBeLessThan( 10000 );
} );
