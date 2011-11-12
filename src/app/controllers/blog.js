
controller.define('blog', {
	
	blog: function() { 		//constructor, also work: "construct"
		//load global model to use in all methods
		this.load.model('blog_model');
	},
	
	index: function(param1, param2) {		
		//use model
		var posts = this.blog_model.getPosts();
		
		//pass data to view and print
		return this.load.view('a.html', {
			posts: posts
		});
	},
	
	test: function(p1, p2, p3) {
		console.log('1:'+p1+' 2:'+p2+' 3:'+p3);
		return "Call Test";
	}
	
});
