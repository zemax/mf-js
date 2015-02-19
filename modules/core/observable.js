// Provides on & off & trigger functions to build observables

// Use code from Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini

// http://dean.edwards.name/weblog/2005/10/add-event/

(function (root, factory) {
	if ( typeof exports === 'object' ) {
		module.exports = factory();
	} else {
		root.Observable = factory();
	}
}(this, function () {
	'use strict';

	var guid = 1

	function hide(obj, prop) {
		if ( Object.defineProperty ) {
			Object.defineProperty(obj, prop, {
				enumerable: false,
				writable:   true
			});
		}
	}

	function addEvent(type, handler) {
		// create a hash table of event types for the element
		if ( !this.__events__ ) {
			this.__events__ = {};
			hide(this, '__events__');
		}

		// assign each event handler a unique ID
		if ( !handler.__events__Guid ) {
			handler.__events__Guid = guid++;
			hide(handler, '__events__Guid');
		}

		// create a hash table of event handlers for each element/event pair
		var handlers = this.__events__[ type ];
		if ( !handlers ) {
			handlers = this.__events__[ type ] = {};
		}
		// store the event handler in the hash table
		handlers[ handler.__events__Guid ] = handler;
	};

	function removeEvent(type, handler) {
		// delete the event handler from the hash table
		if ( this.__events__ && this.__events__[ type ] && handler && handler.__events__Guid ) {
			delete this.__events__[ type ][ handler.__events__Guid ];
		}
	};

	function triggerEvent(event) {
		if ( typeof event === 'string' ) {
			event = new Event(event);
		}

		var returnValue = true;
		// grab the event object (IE uses a global event object)
		event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);

		// get a reference to the hash table of event handlers
		if ( this.__events__ && this.__events__[ event.type ] ) {
			var handlers = this.__events__[ event.type ];

			// execute each event handler
			for ( var i in handlers ) {
				var handler = handlers[ i ];
				if ( handler(event) === false ) {
					returnValue = false;
				}
			}
		}

		return returnValue;
	};

	function fixEvent(event) {
		// add W3C standard event methods
		event.preventDefault = fixEvent.preventDefault;
		event.stopPropagation = fixEvent.stopPropagation;
		return event;
	};
	fixEvent.preventDefault = function () {
		this.returnValue = false;
	};
	fixEvent.stopPropagation = function () {
		this.cancelBubble = true;
	};

	return {
		on:      addEvent,
		off:     removeEvent,
		trigger: triggerEvent
	}
}));
