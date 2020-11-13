import linear from '../../modules/easing/linear';

test( 'linear', function () {
    expect( linear( 0, 0, 1, 1 ) ).toEqual( 0 );
    expect( linear( .5, 0, 1, 1 ) ).toBeGreaterThan( 0 );
    expect( linear( 1, 0, 1, 1 ) ).toEqual( 1 );
} );
