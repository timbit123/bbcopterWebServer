//init web server
var express = require('express');
var usage = require('usage');

function WebServer() {
	this._app = express();
	this._server = require('http').createServer(this._app);
	this._io = require('socket.io').listen(this._server);
	if ( typeof config == "undefined")
		this._server.listen(8888);
	else
		this._server.listen(config.webPort);
	this._app.use(express.static(__dirname + '/public'));
	this._app.get('/', function(req, res) {
		res.sendfile('index.html');
	});
	this.values = {};
	var self = this;
	this._io.sockets.on('connection', function(socket) {
		socket.emit('statusUpdate', {
			status : self.values.status
		});
		socket.emit('coordinateUpdate', {
			coordinates : self.values.coordinates
		});
	});

	var pid = process.pid;
	// you can use any valid PID instead
	console.log(pid);
	setInterval(function() {
		usage.lookup(pid, function(err, result) {
			console.log(result);
			console.log(err);
			if (!err) {
				self._io.sockets.emit('cpuUsage', result);
			}
		});
	}, 1000);
}

WebServer.prototype.sendStatus = function(status) {
	this.values.status = status;
	this._io.sockets.emit('statusUpdate', {
		status : status
	});
}

WebServer.prototype.sendCoordinates = function(coor) {
	this.values.coordinates = coor;
	this._io.sockets.emit('coordinateUpdate', {
		coordinates : coor
	});
}

module.exports = WebServer;
