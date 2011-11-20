/**
 * Requires
 */
require(__dirname+'/controller.js');
require(__dirname+'/library.js');
require(__dirname+'/model.js');
require(__dirname+'/events.js');

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
				controller.res = res;
				var userController = eval(data);
				that.router.processActions(res, userController, params);
				
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
			var output = null;
			
			//Register response/end output event
			EventEmitter.on('IJSasyncListener', function(data) {
				res.writeHead(200);
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
