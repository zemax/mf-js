import easeOutQuad from '../../modules/easing/easeOutQuad';

test( 'easeOutQuad', function () {
    expect( easeOutQuad( 0, 0, 1, 1 ) ).toEqual( 0 );
    expect( easeOutQuad( .5, 0, 1, 1 ) ).toBeGreaterThan( 0 );
    expect( easeOutQuad( 1, 0, 1, 1 ) ).toEqual( 1 );
} );
