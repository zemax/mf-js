import test from 'tape';
import  '../../../modules/animation/requestAnimationFrame';

if ( typeof window !== 'undefined' ) {
	test( 'requestAnimationFrame', function ( t ) {
		t.plan( 3 );
		t.equal( typeof window.requestAnimationFrame, 'function' );
		t.equal( typeof window.cancelAnimationFrame, 'function' );
		window.requestAnimationFrame( function () {
			t.pass( 'call' );
		} )
	} );
}
