var self = this;
var socket = io.connect();
socket.on('news', function(data) {
	console.log(data);
	socket.emit('my other event', {
		my : 'data'
	});
});
socket.on('statusUpdate', function(data) {
	//console.log(data.status);
});
socket.on('coordinateUpdate', function(data) {
	if (isGraphReady) {
		self.data.addRow([new Date(), data.accel.x, data.accel.y, data.accel.z, data.gyro.x, data.gyro.y, data.gyro.z]);
		drawChart();
	}
	//console.log(data);
});
socket.on('cpuUsage', function(data)
{
	console.log(data);
	$('#cpuPourcentage').html(data.cpu.toFixed(2));
	$('#memoryUsage').html(((data.memory / 1024) / 1024).toFixed(2));
});
gamepadSupport.init();
