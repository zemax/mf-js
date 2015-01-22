// Viewport functions
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Viewport = factory();
    }
}(this, function () {
    'use strict';

    var Viewport = {
        /**
         * Determine if an element is in the visible viewport
         *
         * @param element
         * @returns {boolean}
         */
        isInViewport: function (element) {
            var rect = element.getBoundingClientRect();
            var html = document.documentElement;
            return ((rect.top >= 0)
            && (rect.left >= 0)
            && (rect.bottom <= (window.innerHeight || html.clientHeight))
            && (rect.right <= (window.innerWidth || html.clientWidth))
            );
        },

        /**
         * Return Viewport size
         *
         * @returns {{width: (Number|number), height: (Number|number)}}
         */
        getViewportSize: function () {
            return {
                width: window.innerWidth || document.documentElement.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight
            };
        },

        /**
         * Return Scroll top left position
         *
         * @returns {{x: Number, y: Number}}
         */
        getScrollPosition: function () {
            return {
                x: (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
                y: (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
            };
        }
    }

    return Viewport;
}));
