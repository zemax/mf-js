import test from 'tape';
import ready from '../../../modules/dom/ready';

if ( typeof document !== 'undefined' ) {
	test( 'domready', function ( t ) {
		t.plan( 2 );
		ready( function () {
			t.pass( '1st ready' );

			ready( function () {
				t.pass( '2nd ready' );
				t.end();
			} );
		} );
	} );
}
