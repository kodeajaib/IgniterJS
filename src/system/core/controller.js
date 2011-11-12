/**
 * Controller Core Object
 */

controller = {
	tempController: null,
	
	/**
	 * define
	 * Register new app controller
	 * @param {String} name
	 * @param {Object} methods
	 */
	define: function(name, actions) {
		actions.load = this.loader;
		
		this.tempController = {
			name: name,
			actions: actions
		};
		
		return this.tempController;
	},
	
	/**
	 * Loader
	 */
	loader: {
		
		/**
		 * view
		 * @param {String} view
		 * @param {Object} data
		 * @param {Function} _fnCallback
		 */
		view: function(view, data, _fnCallback) {
			var viewFile = serverConfig.appFolder +'/views/'+ view;
			var fs = require('fs');
			
			if (!_fnCallback) {
				return controller.process.view(fs.readFileSync(viewFile, "binary"), data);
				
			/* Experimental */
			//TODO: How to print async response?
			} else {
				fs.readFile(viewFile, "binary", function(err, data) {
					if(!err) _fnCallback(data);
					else _fnCallback(err);
				});
			}	
		},
		
		/**
		 * model
		 * @param {String} modelName
		 * @param {String} alias
		 */
		model: function(modelName, alias) {			
			var modelFile = serverConfig.appFolder +'/models/'+ modelName +'.js';
			var fs = require('fs');
			
			var modelData = fs.readFileSync(modelFile, "binary");
			var userModel = eval(modelData);
			
			var modelAlias = modelName;
			if(alias) modelAlias = alias;
			
			//TODO: Find another solution to controller.tempController 
			controller.tempController.actions[modelAlias] = userModel.actions;
		}
		
	},
	
	/**
	 * Process
	 */
	process: {
		view: function(viewData, data) {
			return viewData;
		}
	}
	
};