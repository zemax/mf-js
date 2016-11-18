'use strict';

const inherit = function ( Child, Parent ) {
	const Synth                 = function () {
	};
	Synth.prototype             = Parent.prototype;
	Child.prototype             = new Synth();
	Child.prototype.constructor = Child;
};

export default inherit;

if ( typeof exports === 'object' ) {
	module.exports = inherit;
}
