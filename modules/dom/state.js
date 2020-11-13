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

import Observable from '../core/observable';
import ready from '../dom/ready';

let mediaqueryState = 'large';

function setState() {
    let s = window.getComputedStyle( document.querySelector( 'body' ), ':before' ).getPropertyValue( 'content' ).replace( /"/g, '' );
    
    if ( s !== mediaqueryState ) {
        mediaqueryState = s;
        State.trigger( { type: 'change', state: mediaqueryState } );
    }
}

ready( function () {
    window.addEventListener( 'resize', setState );
    setState();
} );

const State = {
    getState: function () {
        return mediaqueryState;
    }
};

Object.assign( State, Observable );

export default State;
