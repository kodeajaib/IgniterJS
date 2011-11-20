/**
 * Library Core Object
 */
library = {
	
	/**
	 * define
	 * Register new library in user controller
	 * @param {String} name
	 * @param {Object} actions
	 */
	define: function(name, actions) {		
		return {
			name: name,
			actions: actions
		};
	}
	
};
