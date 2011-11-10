/**
 * Requires
 */
require(__dirname+'/controller.js');

/**
 * HTTP Server
 */
var http = require('http');
http.createServer(function (req, res) {
	core.processRequest(req, res);
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
		var params = [];
		for(var i=2; i<urlRequest.length; i++) {
			params.push(urlRequest[i]);
		}
		this.findController(res, urlRequest[1], params);
	},
	
	/**
	 * findController
	 * @param {Object} res
	 * @param {String} controllerName
	 * @param {Array} params
	 */
	findController: function(res, controllerName, params) {
		var controllerFile = serverConfig.appFolder + '/controllers/' + controllerName + '.js';
		
		var fs = require('fs');
		fs.readFile(controllerFile, "binary", function(err, data) {
			if (!err) {
				controller.res = res;
				eval(data);
			}
		});	
	}
	
};
