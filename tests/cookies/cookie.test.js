import cookie from '../../modules/cookies/cookie';

if ( typeof document !== 'undefined' ) {
    const document = {
        cookies: '',
        
        get cookie() {
            return this.cookies;
        },
        
        set cookie( cookieValue ) {
            const cookies          = this.cookies.split( ' ' );
            const cookieName       = cookieValue.split( '=' ).shift();
            const cookieNameLength = cookieName.length;
            let cookieIndex        = -1;
            cookies.forEach( ( value, index ) => {
                if ( `${value.substr( 0, cookieNameLength )}=` === `${cookieName}=` ) {
                    cookieIndex = index;
                }
            } );
            if ( cookieIndex > -1 ) {
                cookies[ cookieIndex ] = `${cookieValue};`;
            }
            else {
                cookies.push( `${cookieValue};` );
            }
            this.cookies = cookies.join( ' ' ).trim();
        },
    };
}

test( 'cookie', function () {
    var cookie_set = 'Hello World ' + Date.now();
    cookie( 'test', cookie_set );
    
    var cookie_get = cookie( 'test' );
    
    expect( cookie_set ).toEqual( cookie_get );
} );
