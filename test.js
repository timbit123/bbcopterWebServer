var WebServer = require('./server.js');

var webServer = new WebServer();

setInterval(function()
{
	webServer.sendStatus('test');
	webServer.sendCoordinates({x: 32, y:3, z:7});
}, 1000);
