$(function() {
	var ticketPage = new TicketPage();

	$('.side-nav-bar-nested ul li[slug]').on('click', function() {
		ticketPage.showFilteredTickets($(this).attr('slug'));
	});

	ticketPage.showFilteredTickets('new');
});

/**
 * TicketPage
 *
 * Manipulates the tickets page /w JQuery using data from
 * the TicketManager.
 */

class TicketPage {
	constructor() {
		this.ticketManager = new TicketManager();
	}

	showFilteredTickets(filterSlug) {
		var filter = this.ticketManager.getTickets(filterSlug);

		if (filter !== null) {
			var filteredTickets = filter.tickets,
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
}