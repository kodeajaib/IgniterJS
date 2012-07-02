
controller.define('form', {
	
	index: function() {
		return this.load.view('form.html');
	},
	
	process: function() {
		var post = this.input.post.campoNombre;
		return this.load.view('form.response.html', {
			response: post
		});
	}
	
});

