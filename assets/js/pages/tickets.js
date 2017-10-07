$(function() {
	$('.side-nav-bar-nested ul li[slug]').on('click', function() {
		showFilteredTickets($(this).attr('slug'));
	});

	showFilteredTickets('new');
});

function getTickets() {
	return tickets = {
		new: {
			name: 'New',
			tickets: [
				{
					title: 'Printer Queue not working'
				},
				{
					title: 'Coffee machine needs refilling'
				},
				{
					title: 'Squeeky chair'
				}
			]
		},
		pending_awaiting_staff: {
			name: 'Pending - Awaiting Staff',
			tickets: []
		},
		pending_in_progress: {
			name: 'Pending - In Progress',
			tickets: [
				{
					title: 'Spilt water on macbook'
				}
			]
		},
		resolved: {
			name: 'Resolved',
			tickets: [
				{
					title: 'Computer wont turn on'
				}
			]
		}
	};
}

function showFilteredTickets(filterSlug) {
	var tickets = getTickets();

	if (tickets.hasOwnProperty(filterSlug)) {
		var filter 			= tickets[filterSlug],
			filteredTickets = filter.tickets,
			ticketCount     = filteredTickets.length;

		$('.top-nav .main-content-title').text(ticketCount + ' \'' + filter.name + '\' ' + (ticketCount === 1 ? 'ticket' : 'tickets'));

		if (ticketCount > 0) {
			var ticketsTableBody = $('#tickets tbody');

			ticketsTableBody.html('');

			for (var index in filteredTickets) {
				var filteredTicket = filteredTickets[index];

				ticketsTableBody.append(
					'<tr>' +
						'<th scope="row">' + index + '</th>' +
						'<td>' + filteredTicket.title + '</td>' +
					'</tr>'
				);
			}

			$('#tickets-splash-screen').fadeOut(500, function() {
				$('#tickets').fadeIn();
			});
		} else {
			$('#tickets').fadeOut(500, function() {
				$('#tickets-splash-screen').fadeIn();
			});
		}
	}
}