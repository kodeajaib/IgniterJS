/**
 * Router
 */
router = {
	
	/**
	 * processRequest
	 * Identifica el tipo de solicitud.
	 * @param {Object} req
	 * @param {Object} res
	 */
	processRequest: function(req, res) {
		//POST
		if(req.method === "POST") {
		    var data = "";
		    req.on("data", function(chunk) {
		        data += chunk;
		    });
		
		    req.on("end", function() {
				var qs = require('querystring');
		        var jsonPostData = qs.parse(data);
				router.parseRoutes(req, res, jsonPostData);
		    });
		}		

		//GET
		if(req.method === "GET") {
			this.parseRoutes(req, res);
		}
	},
	
	/*execRequest: function(req, res, postParams) {	
		var urlRequest = this.router.trimArray(req.url.split('/'));
		this.parseRoutes(req, res, urlRequest, postParams);
	},*/
	
	parseRoutes: function(req, res, postParams) {
		var flagFinded = false;
		var routesConfig = require(serverConfig.appFolder+'/config/routes.js');
		
		// Busca rutas predefinidas por el usuario
		for(var property in routesConfig.routes) {
			if(property == req.url) {
				this.findController(res, routesConfig.routes[property], postParams);
				flagFinded = true;
				break;
			}
		}
		
		// 
		if(!flagFinded) {
			if(req.url == "/") {
				var defaultController = routesConfig.routes['defaultController'];
				this.findController(res, defaultController, postParams);
			} else {
				this.findController(res, req.url, postParams);
			}
		}
	},
	
	/**
	 * findController
	 * @param {Object} res
	 * @param {String} controllerName
	 * @param {Array} params
	 */
	findController: function(res, params, postParams) {
		var urlRequest = this.helper.trimArray(params.split('/'));
		
		var that = this;
		var controllerFile = serverConfig.appFolder + '/controllers/' + urlRequest[0] + '.js';
		
		require('fs').readFile(controllerFile, "binary", function(err, data) {
			if (!err) {
				/*controller.res = res;
				var userController = eval(data);
				
				//Add POST params to input.post object
				if(postParams) {
					userController.actions.input = { 
						post: postParams 
					};
				}
				
				that.router.processActions(res, userController, params);
				*/
				res.end('Exec '+controllerFile);
				
			} else {
				res.end('File '+controllerFile+' not found')
			}
		});
	},
	
	/**
	 * processMethods
	 * @param {Object} res
	 * @param {Object} c
	 * @param {Array} params
	 */
	processActions: function(res, userControl, params) {	
		var output = null;
		
		//Register response/end output event
		EventEmitter.on('IJSasyncListener', function(data) {
			if(data) res.write(data);
			res.end();
		});
		
		//Execute constructors
		if(this.findAction(userControl.actions, userControl.name)) {
			userControl.actions[userControl.name]();
		}
		if(this.findAction(userControl.actions, 'construct')) {
			userControl.actions['construct']();
		}
		
		//Execute selected method
		if(params.length > 0 && params[0] != "") {
			var action = params[0];
			if(this.findAction(userControl.actions, action)) {
				var innerParams = this.trimArray(params.slice(1));
				output = userControl.actions[action].apply(userControl.actions, innerParams);
				
			} else {
				//Error
				output = 'Method /'+userControl.name+'/'+action+' not found.';
			}
			
		} else {
			//Execute index function
			if(this.findAction(userControl.actions,'index')) {
				output = userControl.actions['index'](params);
				
			} else {
				//Error
				output = 'Index method has not been found.';
			}
		}
		
		if (output) {
			EventEmitter.emit('IJSasyncListener', output);	
		}
	},
	
	/**
	 * findMethod
	 * Helper function
	 * @param {Object} object
	 * @param {String} action
	 */
	findAction: function(object, action) {
		if(typeof object !== 'object') return false;
			
		for(var i in object) {
			if(i == action) {
				return true;
			}
		}
		return false;
	},
	
	helper: {
		/**
		 * trimArray
		 * Helper function
		 * @param {Array} arr
		 */
		trimArray: function(arr) {
			var arr1 = [];
			for (i = 0; i < arr.length; i++) {
				if (arr[i] != "")
					arr1[arr1.length] = arr[i];
			}
			arr.length = arr1.length;
			for(i=0; i<arr1.length; i++)
				arr[i] = arr1[i];
			return arr;
		}
	}
	
};