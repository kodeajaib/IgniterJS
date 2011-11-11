
controller.define('blog', {
	
	blog: function() { 		//constructor, also work: "construct"
		
	},
	
	index: function(param1, param2) {
		//get model
		//print view
		
		return 'Index';
	},
	
	test: function(p1, p2, p3) {
		console.log('1:'+p1+' 2:'+p2+' 3:'+p3);
		return "Call Test";
	}
	
});
