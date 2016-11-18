import test from 'tape';
import extend from '../../../modules/core/extend' ;

test( 'extend', function ( t ) {
	var a = {
		name: 'Bob',
		age:  36,
	};

	var b = {
		name:    'Alfred',
		car:     '307 SW',
		numbers: [ 1, 2, 3 ]
	};

	var c = {
		name:    'Alfred',
		age:     36,
		car:     '307 SW',
		numbers: [ 1, 2, 3 ]
	}

	extend( a, b );

	t.deepEqual( a, c );
	t.end();
} );
