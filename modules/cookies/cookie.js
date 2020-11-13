// Cookie management
// jQuery-simplified version of https://github.com/carhartl/jquery-cookies

export function cookieParse( s ) {
    const pluses = /\+/g;
    
    if ( s.indexOf( '"' ) === 0 ) {
        // This is a quoted cookies as according to RFC2068, unescape...
        s = s.slice( 1, -1 ).replace( /\\"/g, '"' ).replace( /\\\\/g, '\\' );
    }
    
    try {
        // Replace server-side written pluses with spaces.
        // If we can't decode the cookies, ignore it, it's unusable.
        // If we can't parse the cookies, ignore it, it's unusable.
        s = decodeURIComponent( s.replace( pluses, ' ' ) );
        return s;
    } catch ( e ) {
    }
}

/**
 * Read / Write cookie
 *
 * @param key
 * @param value
 * @param options
 * @returns {string|undefined}
 */
export function cookie( key, value, options = {} ) {
    // Write
    
    if ( arguments.length > 1 ) {
        if ( typeof options.expires === 'number' ) {
            const days = options.expires;
            const t    = options.expires = new Date();
            t.setTime( +t + days * 864e+5 );
        }
        
        return (document.cookie = [
            encodeURIComponent( key ), '=', encodeURIComponent( value ),
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join( '' ));
    }
    
    // Read
    
    let result = key ? undefined : {};
    
    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookies().
    const cookies = document.cookie ? document.cookie.split( '; ' ) : [];
    
    for ( let i = 0, l = cookies.length; i < l; i++ ) {
        const parts = cookies[ i ].split( '=' );
        const name  = decodeURIComponent( parts.shift() );
        let cookie  = parts.join( '=' );
        
        if ( key && key === name ) {
            result = cookieParse( cookie );
            break;
        }
        
        // Prevent storing a cookies that we couldn't decode.
        if ( !key && (cookie = cookieParse( cookie )) !== undefined ) {
            result[ name ] = cookie;
        }
    }
    
    return result;
}

export default cookie;
