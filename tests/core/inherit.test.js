import inherit from '../../modules/core/inherit';

test( 'inherit', function () {
    function A() {
    
    }
    
    A.prototype.whoami        = function () {
        return 'Je suis A';
    };
    A.prototype.whoismyfamily = function () {
        return 'Je suis une lettre';
    };
    
    function B() {
    
    }
    
    inherit( B, A );
    
    B.prototype.whoami = function () {
        return 'Je suis B';
    };
    
    var a = new A();
    var b = new B();
    
    expect( a.whoami() ).toEqual( 'Je suis A' );
    expect( a.whoismyfamily() ).toEqual( 'Je suis une lettre' );
    
    expect( b.whoami() ).toEqual( 'Je suis B' );
    expect( b.whoismyfamily() ).toEqual( 'Je suis une lettre' );
} );
