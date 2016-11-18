import test from 'tape';
import easeOutElastic from '../../../modules/easing/easeOutElastic';
import easeOutQuad from '../../../modules/easing/easeOutQuad';
import linear from '../../../modules/easing/linear';

test( 'linear', function ( t ) {
	t.equal( linear( 0, 0, 1, 1 ), 0 );
	t.assert( linear( .5, 0, 1, 1 ) > 0 );
	t.equal( linear( 1, 0, 1, 1 ), 1 );
	t.end();
} );
test( 'easeOutQuad', function ( t ) {
	t.equal( easeOutQuad( 0, 0, 1, 1 ), 0 );
	t.assert( easeOutQuad( .5, 0, 1, 1 ) > 0 );
	t.equal( easeOutQuad( 1, 0, 1, 1 ), 1 );
	t.end();
} );
test( 'easeOutElastic', function ( t ) {
	t.equal( easeOutElastic( 0, 0, 1, 1, 0.5, 0.5 ), 0 );
	t.equal( easeOutElastic( 1, 0, 1, 1, 0.5, 0.5 ), 1 );
	t.end();
} );
