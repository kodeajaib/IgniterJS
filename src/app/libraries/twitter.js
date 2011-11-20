
library.define('twitter', {
	
	getTweets: function(_fnCallback) {
		
		//Based on Fusioncube script
		//URL: http://www.fusioncube.net/index.php/node-js-basics-and-twitter-search
		//Script: http://www.fusioncube.net/code/TwitterSearch.js
		var req = require('http').request({
			host: "api.twitter.com",
			port: 80,
			method: "GET",
			path: "/1/statuses/user_timeline.json?screen_name=fayerwayer&count=3"
		});
		req.on('response', function(res) {
			var body = "";
			
			res.on('data', function(data) {
				body += data;
				
				try {
					/*
					 * Since the Twitter Search API is streaming, we can't listen to 
					 * the end() method, so I've got some logic where we try to parse
					 * the data we have so far. If it can't be parsed, then the 
					 * response isn't complete yet.
					 */
					var tweets = JSON.parse(body);
					
					/*
					 * The data was successfully parsed, so we can safely assume we 
					 * have a valid structure.
					 */
					if (tweets.length > 0) {
						if(_fnCallback)
							_fnCallback(JSON.stringify(tweets));
					}
				} 
				catch (ex) {
					console.log("Waiting for more data chunks...");
				}
			});
		});
		req.end();
	}
	
});
