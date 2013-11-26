//init web server
var express = require('express');
var Datagram = require('./clientDataGram.js'); //we send values to the beagleboard (quadcopter) over UDP
var Joystick = require('./joystick.js');
var joystick;
var datagram;
function WebServer(port) {
	var self = this;
	joystick = new Joystick();
	datagram = new Datagram(4145, '192.168.1.165');
	
	this._app = express();
	this._server = require('http').createServer(this._app);
	this._io = require('socket.io').listen(this._server);
	
	if ( typeof config == "undefined")
		this._server.listen(port);
	else
		this._server.listen(config.webPort);
	this._app.use(express.static(__dirname + '/public'));
	this._app.get('/', function(req, res) {
		res.sendfile('index.html');
	});
	this.values = {};
	
	this._io.sockets.on('connection', function(socket) {
		socket.emit('statusUpdate', {
			status : self.values.status
		});
		socket.emit('coordinateUpdate', {
			coordinates : self.values.coordinates
		});
		
		socket.on('joystick', function(data)
		{
			console.log(data);
			joystick.updateJoystick(data);
		});
	});
	joystick.on('data', function(data2)
	{
		datagram.sendValues(data2);
		//datagram.sendValues("test");
	});
	
	datagram.on('data', function(data)
	{
		console.log(data);
	});
	datagram.sendValues("test");
}

WebServer.prototype.sendStatus = function(status) {
	this.values.status = status;
	this._io.sockets.emit('statusUpdate', {
		status : status
	});
};

WebServer.prototype.sendCoordinates = function(coor) {
	this.values.coordinates = coor;
	this._io.sockets.emit('coordinateUpdate', coor);
};

module.exports = WebServer;
