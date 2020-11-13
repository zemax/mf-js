/**
 * Manage Prototype inheritance
 *
 * @param Child
 * @param Parent
 */
export const inherit = ( Child, Parent ) => {
    const Synth                 = function () {
    };
    Synth.prototype             = Parent.prototype;
    Child.prototype             = new Synth();
    Child.prototype.constructor = Child;
};

export default inherit;
