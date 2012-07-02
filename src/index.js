/**
 * Server Config
 */
serverConfig = {
	host: 'localhost',
	port: 2000,
	
	systemFolder: __dirname+'/system',
	appFolder: __dirname+'/app'
};

/**
 * Init
 */
require(__dirname+'/system/core/core.js');
