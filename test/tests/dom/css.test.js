import test from 'tape';
import css from '../../../modules/dom/css' ;

if ( typeof document !== 'undefined' ) {
	test( 'css', function ( t ) {
		const elt     = document.createElement( 'div' );
		elt.className = 'dummy';

		t.equal( css.hasClass( elt, 'test' ), false );
		css.addClass( elt, 'test' );
		t.equal( css.hasClass( elt, 'test' ), true );
		css.removeClass( elt, 'test' );
		t.equal( css.hasClass( elt, 'test' ), false );
		t.end();
	} );
}
