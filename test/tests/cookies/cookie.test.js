import test from 'tape';
import cookie from '../../../modules/cookies/cookie' ;

if ( typeof document !== 'undefined' ) {
	test( 'cookie', function ( t ) {
		var cookie_set = 'Hello World ' + Date.now();
		cookie( 'test', cookie_set );

		var cookie_get = cookie( 'test' );

		t.equal( cookie_set, cookie_get );
		t.end();
	} );
}
