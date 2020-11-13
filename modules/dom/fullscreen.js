/**
 * Enable fullscreen element
 *
 * @param element
 */
export const fullscreen = ( element ) => {
    if ( element.requestFullscreen ) {
        return element.requestFullscreen();
    }
    else if ( element.mozRequestFullScreen ) {
        return element.mozRequestFullScreen();
    }
    else if ( element.webkitRequestFullscreen ) {
        return element.webkitRequestFullscreen();
    }
    else if ( element.msRequestFullscreen ) {
        return element.msRequestFullscreen();
    }
    
    return false;
};

export default fullscreen;
