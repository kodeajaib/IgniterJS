/**
 * Requires
 */
require(__dirname+'/router.js');
require(__dirname+'/server.js');
//require(__dirname+'/controller.js');
//require(__dirname+'/library.js');
//require(__dirname+'/model.js');
//require(__dirname+'/events.js');

//require(__dirname+'/../libraries/mustache.js');


// Inicializa el Server
server.start(serverConfig.host, serverConfig.port);
