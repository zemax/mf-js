"use strict";

import ready from '../../../modules/dom/ready';
import state from '../../../modules/dom/state';

if ( typeof document !== 'undefined' ) {
	ready( ()=> {
		state.on( 'change', () => {
			console.log( '%c ' + state.getState(), 'background: #222; color: #bada55' );
		} );
		console.log( '%c ' + state.getState(), 'background: #222; color: #bada55' );
	} );
}
