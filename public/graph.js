google.load("visualization", "1", {
	packages : ["corechart"]
});
google.setOnLoadCallback(init);
var data;
var option;
var chart;
function init() {
	data = new google.visualization.DataTable();
	data.addColumn('date', 'Time');
	data.addColumn('number', 'X Accel');
	data.addColumn('number', 'Y Accel');
	data.addColumn('number', 'Z Accel');
	data.addColumn('number', 'X Gyro');
	data.addColumn('number', 'Y Gyro');
	data.addColumn('number', 'Z Gyro');
	options = {
		title : 'Accelerometer and Gyrometer values',
		animation : {
			duration : 100,
			easing : 'out',
		},
		'chartArea':{width:"60%"}
	};
	chart = new google.visualization.LineChart(document.getElementById('graph'));

	drawChart();
}

var isGraphReady = false;
function drawChart() {

	google.visualization.events.addListener(chart, 'ready', function() {
		isGraphReady = true;
	});
	chart.draw(data, options);
}