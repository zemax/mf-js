import easeOutElastic from '../../modules/easing/easeOutElastic';

test( 'easeOutElastic', function () {
    expect( easeOutElastic( 0, 0, 1, 1, 0.5, 0.5 ) ).toEqual( 0 );
    expect( easeOutElastic( 1, 0, 1, 1, 0.5, 0.5 ) ).toEqual( 1 );
} );
