var dgram = require('dgram');
var server = dgram.createSocket("udp4");
var util = require("util");
var events = require("events");

function Datagram(port, clientIp) {
	var self = this;
	this._port = port;
	this._clientIP = clientIp;
	events.EventEmitter.call(this);

	server.on("error", function(err) {
		self.emit('error', err);
		console.log("server error:\n" + err.stack);
		server.close();
	});

	server.on("message", function(msg, rinfo) {
		self.emit('data', JSON.parse(msg));
		console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
	});

	server.on("listening", function() {
		var address = server.address();
		console.log("server listening " + address.address + ":" + address.port);
	});

	server.bind(this._port);

	Datagram.prototype.sendValues = function(data) {
		var message = new Buffer(JSON.stringify(data));
		var client = dgram.createSocket("udp4");
		client.send(message, 0, message.length, (self._port - 1), self._clientIP, function(err, bytes) {
			client.close();
		});
	};
}

util.inherits(Datagram, events.EventEmitter);

module.exports = Datagram;
