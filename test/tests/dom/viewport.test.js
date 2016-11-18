import test from 'tape';
import viewport from '../../../modules/dom/viewport' ;

if ( typeof document !== 'undefined' ) {
	test( 'viewport', function ( t ) {
		t.equal( typeof viewport.size(), 'object' );
		t.assert( viewport.size().width > 0 );
		t.assert( viewport.size().height > 0 );
		t.end();
	} );
}
