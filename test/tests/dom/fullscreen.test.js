import ready from '../../../modules/dom/ready';
import fullscreen from '../../../modules/dom/fullscreen';

if ( typeof document !== 'undefined' ) {
	ready( () => {
		const b     = document.createElement( 'button' );
		b.innerHTML = 'Fullscreen';
		b.addEventListener( 'click', () => {
			fullscreen( document.body );
		} );
		document.body.appendChild( b );
	} );
}
