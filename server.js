//init web server
var express = require('express');

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
	this._io.sockets.on('connection', function(socket) {
	socket.emit('statusUpdate', {
		status : 'world'
	});
});
}

WebServer.prototype.sendStatus = function(status)
{
	this._io.sockets.emit('statusUpdate', { status: status});
}

WebServer.prototype.sendCoordinates = function(coor)
{
	this._io.sockets.emit('coordinateUpdate', { coordinates: coor});
}

module.exports = WebServer;