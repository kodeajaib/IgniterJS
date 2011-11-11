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
				that.router.processMethods(res, userController, params);
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
		processMethods: function(res, userControl, params) {
			var outReturn = null;
			
			//Execute constructors
			if(this.findMethod(userControl.methods, userControl.name)) {
				userControl.methods[userControl.name]();
			}
			if(this.findMethod(userControl.methods, 'construct')) {
				userControl.methods['construct']();
			}
			
			//Execute selected method
			if(params.length > 0 && params[0] != "") {
				var method = params[0];
				if(this.findMethod(userControl.methods, method)) {
					outReturn = userControl.methods[method](params.slice(1));
					
				} else {
					//Error
					outReturn = 'Method /'+userControl.name+'/'+method+' not found.';
				}
				
			} else {
				//Execute index function
				if(this.findMethod(userControl.methods,'index')) {
					outReturn = userControl.methods['index'](params);
					
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
		findMethod: function(object, method) {
			if(typeof object !== 'object') return false;
				
			for(var i in object) {
				if(i == method) {
					return true;
				}
			}
			return false;
		}
	}
	
};
