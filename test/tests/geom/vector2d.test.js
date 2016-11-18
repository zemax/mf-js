import test from 'tape';
import Vector2D from '../../../modules/geom/vector2d';

test( 'vector2d', function ( t ) {
	const u = new Vector2D( 1, 1 );
	const v = new Vector2D( 2, 3 );

	t.deepEqual( u, { x: 1, y: 1 } );
	t.deepEqual( u.addVector( v ), { x: 3, y: 4 } );
	t.deepEqual( v.substractVector( u ), { x: 1, y: 2 } );
	t.deepEqual( v.multiply( 2 ), { x: 4, y: 6 } );
	t.end();
} );
