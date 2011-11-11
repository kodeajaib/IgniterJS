/**
 * Requires
 */
require(__dirname+'/controller.js');

/**
 * HTTP Server
 */
var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	core.processRequest(req, res)
}).listen(serverConfig.port, serverConfig.host);
console.log('Server running at http://'+serverConfig.host+':'+serverConfig.port+'/');

/**
 * Core Base Object
 */
var core = {
	
	/**
	 * processRequest
	 * @param {Object} req
	 * @param {Object} res
	 */
	processRequest: function(req, res) {
		var urlRequest = req.url.split('/');
		var params = urlRequest.slice(2);
		this.findController(res, urlRequest[1], params);
	},
	
	/**
	 * findController
	 * @param {Object} res
	 * @param {String} controllerName
	 * @param {Array} params
	 */
	findController: function(res, controllerName, params) {
		var that = this;
		var controllerFile = serverConfig.appFolder + '/controllers/' + controllerName + '.js';
		
		require('fs').readFile(controllerFile, "binary", function(err, data) {
			if (!err) {
				var userController = eval(data);
				that.router.processActions(res, userController, params);
				res.end();
				
			} else {
				res.end('File '+controllerFile+' not found')
			}
		});
	},
	
	/**
	 * Router
	 */
	router: {
		
		/**
		 * processMethods
		 * @param {Object} res
		 * @param {Object} c
		 * @param {Array} params
		 */
		processActions: function(res, userControl, params) {
			var outReturn = null;
			
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
					outReturn = userControl.actions[action](params.slice(1));
					
				} else {
					//Error
					outReturn = 'Method /'+userControl.name+'/'+action+' not found.';
				}
				
			} else {
				//Execute index function
				if(this.findAction(userControl.actions,'index')) {
					outReturn = userControl.actions['index'](params);
					
				} else {
					//Error
					outReturn = 'Index method has not been found.';
				}
			}
			
			if(outReturn) 
				res.write(outReturn);
		},
		
		/**
		 * findMethod
		 * Helper function
		 * @param {Object} object
		 * @param {String} method
		 */
		findAction: function(object, action) {
			if(typeof object !== 'object') return false;
				
			for(var i in object) {
				if(i == action) {
					return true;
				}
			}
			return false;
		}
	}
	
};
