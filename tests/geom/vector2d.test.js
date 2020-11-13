import Vector2D from '../../modules/geom/vector2d';

test( 'vector2d', function (  ) {
    const u = new Vector2D( 1, 1 );
    const v = new Vector2D( 2, 3 );
    
    expect( u ).toEqual( { x: 1, y: 1 } );
    expect( u.addVector( v ) ).toEqual( { x: 3, y: 4 } );
    expect( v.substractVector( u ) ).toEqual( { x: 1, y: 2 } );
    expect( v.multiply( 2 ) ).toEqual( { x: 4, y: 6 } );
} );
