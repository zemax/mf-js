import observable from '../../modules/core/observable';

test( 'observable', function () {
    function C() {
    }
    
    Object.assign( C.prototype, observable );
    
    const a = new C();
    const b = new C();
    const c = new C();
    
    function f( e ) {
        count++;
    }
    
    a.on( 'pouet', function ( e ) {
        count++;
    } );
    b.on( 'pouet', f );
    c.on( 'pouet', f );
    
    let count = 0;
    
    a.trigger( 'pouet' );
    expect( count ).toEqual( 1 );
    
    b.trigger( { type: 'pouet' } );
    expect( count ).toEqual( 2 );
    
    c.trigger( 'pouet' );
    expect( count ).toEqual( 3 );
    
    b.off( 'pouet', f );
    
    a.trigger( 'pouet' );
    expect( count ).toEqual( 4 );
    
    b.trigger( { type: 'pouet' } );
    expect( count ).toEqual( 4 );
    
    c.trigger( 'pouet' );
    expect( count ).toEqual( 5 );
    
    c.trigger( 'pouet' );
    expect( count ).toEqual( 6 );
} );
