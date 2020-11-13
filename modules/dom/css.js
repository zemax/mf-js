/**
 * Check if element has class
 *
 * @param element
 * @param className
 * @returns {boolean}
 */
export function hasClass( element, className ) {
    if ( element.classList ) {
        return element.classList.contains( className );
    }
    else {
        return new RegExp( '(^| )' + className + '( |$)', 'gi' ).test( element.className );
    }
}

/**
 * Add class to element
 *
 * @param element
 * @param className
 */
export function addClass( element, className ) {
    if ( !css.hasClass( element, className ) ) {
        if ( element.classList ) {
            element.classList.add( className );
        }
        else {
            element.className += ' ' + className;
        }
    }
}

/**
 * remove class to element
 *
 * @param element
 * @param className
 */
export function removeClass( element, className ) {
    if ( css.hasClass( element, className ) ) {
        if ( element.classList ) {
            element.classList.remove( className );
        }
        else {
            element.className = element.className.replace( new RegExp( '(^|\\b)' + className.split( ' ' ).join( '|' ) + '(\\b|$)', 'gi' ), ' ' );
        }
    }
}

export const css = {
    hasClass,
    addClass,
    removeClass
};

export default css;
