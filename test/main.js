// POLYFILLS

require( 'core-js/fn/object/assign' );
require( 'core-js/fn/object/values' );
require( 'core-js/fn/array/from' );
require( 'core-js/fn/array/for-each' );
require( 'core-js/fn/promise' );

// TESTS

require( './tests/animation/requestAnimationFrame.test' );

require( './tests/cookies/cookie.test' );

// CORE
require( './tests/core/extend.test' );
require( './tests/core/inherit.test' );
require( './tests/core/observable.test' );

require( './tests/dom/css.test' );
require( './tests/dom/ready.test' );
require( './tests/dom/scroll.test' );
require( './tests/dom/viewport.test' );
require( './tests/dom/visibility.test' );
require( './tests/dom/state.test' );
require( './tests/dom/fullscreen.test' );

require( './tests/easing/easing.test' );

require( './tests/geo/distance.test' );

require( './tests/geom/vector2d.test' );
