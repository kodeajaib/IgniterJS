
controller.define('blog', {
	
	blog: function() { 		//constructor, also work: "construct"
		//load global model to use in all methods
		this.load.model('blog_model');
	},
	
	index: function(param1, param2) {		
		//use model
		var posts = this.blog_model.getPosts();
		
		//give data to view and print
		return this.load.view('a.html', {
			posts: posts
		});
	},
	
	test: function(p1, p2, p3) {
		console.log('1:'+p1+' 2:'+p2+' 3:'+p3);
		return "Call Test";
	},
	
	/*
	 * Get data from twitter using a library
	 */
	twitter: function() {
		this.load.library('twitter');
		this.twitter.getTweets(function(data) {
			
			//TODO: Change this call type
			controller.response(data);
		});
	}
	
});
