var self = this;
var socket = io.connect('http://localhost');
socket.on('news', function(data) {
	console.log(data);
	socket.emit('my other event', {
		my : 'data'
	});
});
socket.on('statusUpdate', function(data) {
	console.log(data.status);
});
socket.on('coordinateUpdate', function(data) {
	if (isGraphReady) {
		self.data.addRow([new Date(), data.coordinates.x, data.coordinates.y, data.coordinates.z, 10, 10, 10]);
		drawChart();
	}
	console.log(data.coordinates);
});
socket.on('cpuUsage', function(data)
{
	$('#cpuPourcentage').val(data.cpu);
	$('#memoryUsage').val((data.memory / 8) / 8);
});
