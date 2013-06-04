var WebServer = require('./server.js');

var webServer = new WebServer();
var coordinate = {x:0, y:0, z:0};
setInterval(function()
{
	webServer.sendStatus('test');
	
	webServer.sendCoordinates({x: coordinate.x, y:coordinate.y, z:coordinate.z});
	coordinate.x++;
	coordinate.y++;
	coordinate.z++;
}, 200);
