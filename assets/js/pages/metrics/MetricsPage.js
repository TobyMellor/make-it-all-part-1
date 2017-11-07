$(function() {
	var metricsPage = new MetricsPage();
	$('.selectpicker').selectpicker({
		noneResultsText: 'No results match {0}'
	});
});

$('#StaffNameSearch').change(function(){ 
	var index = $(this)[0].selectedIndex;
	if (index > 0) {
		$(".collapsible").css("display","block");
		$("#name").val("Joe Bloggs");
		$("#phone").val("01234567890");
		$("#role").val("Staff");
		$("#customers-served").val("32");
		$("#no-of-tickets").val("12");
		$("#avg-replies-per-ticket").val("5");
	} else {
		$(".collapsible").css("display","none");
		$("#name").val("");
		$("#phone").val("");
		$("#role").val("");
		$("#customers-served").val("");
		$("#no-of-tickets").val("");
		$("#avg-replies-per-ticket").val("");

	}
});

class MetricsPage extends DynamicPage {
	constructor() {
		super();
		this.createLineGraph();
		this.createPieChart();
	}

	updateTopNavBar() {
		this.updateTopNavBar('Metrics of Staff');
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