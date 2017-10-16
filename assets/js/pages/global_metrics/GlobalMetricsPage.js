$(function() {
	var globalMetricsPage = new GlobalMetricsPage();
});

class GlobalMetricsPage extends DynamicPage {
	constructor() {
		super();
		this.createLineGraph();
		this.createPieChart();
	}

	updateTopNavBar() {
		this.updateTopNavBar('Global Metrics of Staff');
	}

	createLineGraph() {
		var ctx = document.getElementById("operatorStatistics").getContext('2d');
		var opStatChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: ["May", "June", "July", "August", "September", "October"],
				datasets: [{
					label: '# Tickets Solved',
					data: [6, 9, 3, 5, 2, 3],
					borderColor: [
						'rgba(255,99,132,1)'
					]
				}]
			},
			options: {
				responsive:true,
				maintainAspectRatio: false,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
	}

	createPieChart() {
		var ctx = document.getElementById("problemTypeSolved").getContext('2d');
		var probTypeChart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				datasets: [{
					data: [1,2,3,4,5],
					backgroundColor: [
						'rgba(255,99,132,1)',
						'rgba(99,255,99,1)',
						'rgba(99,99,255,1)',
						'rgba(255,99,255,1)',
						'rgba(99,255,255,1)'
					]
				}],
				labels: [
					"User Error",
					"Network",
					"Printers",
					"Software Bug",
					"Other"
				]
			},
			options: {
				legend: {
					position:'right'
				}
			}
		});
	}
}