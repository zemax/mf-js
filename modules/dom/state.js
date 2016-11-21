"use strict";

/*
 Store state in CSS and grab it from JS

 cf https://adactio.com/journal/5429/

 <style>
 @media screen and (max-width: 767px) {
 body:before {
 content: 'small';
 display: none
 }
 }

 @media screen and (min-width: 768px) and (max-width: 1219px) {
 body:before {
 content: 'medium';
 display: none
 }
 }

 @media screen and (min-width: 1220px) {
 body:before {
 content: 'large';
 display: none
 }
 }
 </style>
 */

// import extend from '../core/extend';
import Observable from '../core/observable' ;
import ready from '../dom/ready' ;

let mq_state = 'large';

function setState() {
	let s = window.getComputedStyle( document.querySelector( 'body' ), ':before' ).getPropertyValue( 'content' ).replace( /\"/g, '' );

	if ( s != mq_state ) {
		mq_state = s;
		State.trigger( { type: 'change', state: mq_state } );
	}
}

ready( function () {
	window.addEventListener( 'resize', setState );
	setState();
} );

const State = {
	getState: function () {
		return mq_state;
	}
};

Object.assign( State, Observable );

export default State;

if ( typeof exports === 'object' ) {
	module.exports = State;
}
