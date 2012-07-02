/**
 * HTTP Server
 */
server = {
	
	/**
	 * Inicializa un servidor en el puerto indicado.
	 * @param {String} host
	 * @param {String} port
	 */
	start: function(host, port) {
		var http = require('http');
		http.createServer(function (req, res) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			router.processRequest(req, res)
		}).listen(port, host);
		console.log('Server running at http://'+serverConfig.host+':'+serverConfig.port+'/');	
	}
}