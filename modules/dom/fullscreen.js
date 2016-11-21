const fullscreen = ( element ) => {
	if ( element.requestFullscreen ) {
		element.requestFullscreen();
	}
	else if ( element.mozRequestFullScreen ) {
		element.mozRequestFullScreen();
	}
	else if ( element.webkitRequestFullscreen ) {
		element.webkitRequestFullscreen();
	}
	else if ( element.msRequestFullscreen ) {
		element.msRequestFullscreen();
	}
};

export default fullscreen;

if ( typeof exports === 'object' ) {
	module.exports = fullscreen;
}
