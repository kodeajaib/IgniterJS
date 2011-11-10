/**
 * Controller Core Object
 */

controller = {
	
	/**
	 * define
	 * Register new app controller
	 * @param {Object} name
	 * @param {Object} methods
	 */
	define: function(name, methods) {
		
		for(var i in methods) {
			if(typeof methods[i] === 'function') {
				
				//...
				
				methods[i](controller.res);	
			}
		}
		
	}
	
};
