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
	define: function(name, actions) {
		actions.load = this.loader;

		return {
			name: name,
			actions: actions
		};
	},
	
	loader: {
		view: function(view, _fnCallback) {
			var viewFile = serverConfig.appFolder +'/views/'+ view;
			var fs = require('fs');
			
			if (!_fnCallback) {
				return fs.readFileSync(viewFile, "binary");
				
			} else {
				fs.readFile(viewFile, "binary", function(err, data) {
					if(!err) _fnCallback(data);
					else _fnCallback(err);
				});
			}	
		}
		
	}
	
};