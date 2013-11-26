var WebServer = require('./server.js');

var webServer = new WebServer(8081);
var coordinate = {
	x : 0,
	y : 0,
	z : 0
};
webServer.sendStatus('test');
setInterval(function() {
	

	webServer.sendCoordinates({
		accel : {
			x : 0,
			y : 0,
			z : 0
		},
		gyro : {
			x : coordinate.x,
			y : coordinate.y,
			z : coordinate.z
		}
	});
	coordinate.x++;
	coordinate.y++;
	coordinate.z++;
}, 200);
