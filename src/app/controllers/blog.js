
controller.define('blog', {
	
	index: function(res) {
		//get model
		//print view
		
		res.writeHead(200, {'Content-Type': 'text/plain'});
 		res.end('Hello World Blog\n');
	},
	
	test: function() {
		
		return "Call Test";
	}
	
});
