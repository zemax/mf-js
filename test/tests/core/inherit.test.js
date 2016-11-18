import test from 'tape';
import inherit from '../../../modules/core/inherit' ;

test( 'inherit', function ( t ) {
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

	t.equal( a.whoami(), 'Je suis A' );
	t.equal( a.whoismyfamily(), 'Je suis une lettre' );

	t.equal( b.whoami(), 'Je suis B' );
	t.equal( b.whoismyfamily(), 'Je suis une lettre' );
	t.end();
} );
