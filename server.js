//init web server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(80);
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendfile('index.html');
});

io.sockets.on('connection', function(socket) {
	socket.emit('news', {
		hello : 'world'
	});
	socket.on('my other event', function(data) {
		console.log(data);
	});
});
