let ready   = false;
const stack = [];

function completed() {
    if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
        if ( document.addEventListener ) {
            document.removeEventListener( 'DOMContentLoaded', completed, false );
            window.removeEventListener( 'load', completed, false );
        }
        else {
            document.detachEvent( "onreadystatechange", completed );
            window.detachEvent( "onload", completed );
        }
        
        let f;
        while ( f = stack.shift() ) {
            setTimeout( f, 0 );
        }
        
        ready = true;
    }
}

export function domready( f ) {
    if ( (typeof f != 'function') || (typeof document == 'undefined') ) {
        return;
    }
    
    if ( ready || (document.readyState === 'complete') ) {
        setTimeout( f, 0 );
        return;
    }
    
    if ( stack.length <= 0 ) {
        if ( document.addEventListener ) {
            document.addEventListener( 'DOMContentLoaded', completed, false );
            window.addEventListener( 'load', completed, false );
        }
        else {
            document.attachEvent( "onreadystatechange", completed );
            window.attachEvent( "onload", completed );
        }
    }
    
    stack.push( f );
}

export default domready;
