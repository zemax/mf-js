import test from 'tape';
import scroll from '../../../modules/dom/scroll';

if ( typeof document !== 'undefined' ) {
	test( 'scroll', function ( t ) {
		t.assert( typeof scroll.position() === 'object' );
		t.assert( scroll.position().x >= 0 );
		t.assert( scroll.position().y >= 0 );

		t.assert( typeof scroll.size() === 'object' );
		t.assert( scroll.size().width >= 0 );
		t.assert( scroll.size().height >= 0 );
		t.end();
	} );
}
