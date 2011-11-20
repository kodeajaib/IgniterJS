var events = require('events');
EventEmitter = (function(){
	var eventEmitter = new events.EventEmitter();
	return eventEmitter;
})();