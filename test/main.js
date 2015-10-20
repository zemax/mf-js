// CORE
require('./tests/core/bind.test');
require('./tests/core/inherit.test');
require('./tests/core/extend.test');
require('./tests/core/observable.test');

// DATE
require('./tests/date/now.test');

// Following tests require a browser
if (typeof window !== 'undefined') {
    // DOM
    require('./tests/dom/ready.test');

    // BROWSER
    require('./tests/dom/viewport.test');
    require('./tests/cookies/cookie.test');
    require('./tests/animation/requestAnimationFrame.test');
}
