/**
 * TicketPage
 *
 * Manipulates the tickets page /w JQuery using data from
 * the TicketManager.
 */

class TicketPage extends DynamicPage {
	constructor() {
		super();

		this.currentlyShowing = null;
		this.currentTicketId  = null;
	}

	showFilteredTickets(filterSlug) {
		var filter = makeItAll.ticketManager.getFilter(filterSlug);

		if (filter !== null && filter.id !== this.currentlyShowing) {
			var filteredTickets = filter.tickets;

			this.updateTopNavBar(filteredTickets.length + ' \'' + filter.name + '\' ' + (filteredTickets.length === 1 ? 'ticket' : 'tickets'));
			this.clearTable();

			for (var i = 0; i < filteredTickets.length; i++) {
				var ticket = filteredTickets[i];

				this.appendTableRow({
					id: ticket.id,
					title: ticket.title,
					filter_slug: '<span class="filter">' + ticket.filter.name + '</span>',
					created_at: ticket.created_at,
					updated_at: ticket.updated_at
				});
			}

			this.updateSplashScreen();

			this.currentlyShowing = filter.id;
		}

		this.showListView();
	}

	showTicketView(ticketId) {
		var ticket = makeItAll.ticketManager.getTicket(ticketId);

		if (ticket !== null) {
			this.currentTicketId = ticketId;

			$('#ticket-view #ticket-number').text('#' + ticket.id);
			$('#ticket-view #ticket-title').text(ticket.title);
			$('#ticket-view .filter').text(ticket.filter.name);
			$('#ticket-view #ticket-description p').text(ticket.description);

			$('#ticket-view #ticket-software').text(ticket.software || 'N/A');
			$('#ticket-view #ticket-operating-system').text(ticket.operating_system || 'N/A');
			$('#ticket-view #ticket-created-at').text(ticket.created_at);
			$('#ticket-view #ticket-updated-at').text(ticket.updated_at);

			var $ticketComments      = $('#ticket-comments'),
				$ticketSerialNumbers = $('#ticket-serial-numbers');

			if (ticket.serial_numbers.length === 0) {
				$ticketSerialNumbers.text('N/A')
			} else {
				$ticketSerialNumbers.text('');

				for (var index in ticket.serial_numbers) {
					var serialNumber = ticket.serial_numbers[index];

					$ticketSerialNumbers.append(
						'<li>' + serialNumber + '</li>'
					);
				}
			}

			if (ticket.events.length === 0) {
				$ticketComments.text('No comments have been left yet!');
			} else {
				$ticketComments.text('');
			}

			for (var index in ticket.events) {
				var event = ticket.events[index];

				if (event.type === 'comment') {
					$ticketComments.append(
						'<li class="media">' +
							'<img class="d-flex mr-3" src="https://placehold.it/64x64" alt="Generic placeholder image">' +
							'<div class="media-body">' +
								'<h5 class="mt-0 mb-1">' +
									'Toby Mellor <span class="ticket-comment-date">' + event.created_at + '</span>' + // TODO: Replace 'Toby Mellor' with staff name
								'</h5>' +
								'<div class="breaker"></div>' +
								event.content +
							'</div>' +
						'</li>'
					);
				} else {
					$ticketComments.append(
						'<li class="ticket-event">' +
							'<i class="fa fa-ticket"></i>' +
							' Status Changed: ' +
							'<span class="ticket-event-details">' + event.content + '</span>' +
							'<span class="ticket-event-date">' + event.created_at + '</span>' +
						'</li>'
					);
				}
			}

			$('.top-nav.with-title').fadeOut(500, function() {
				$('.top-nav.with-content').fadeIn();
			});

			$('#table-section').fadeOut(500, function() {
				$('#ticket-view').fadeIn();
			});
		}
	}

	showListView() {
		$('.top-nav.with-content').fadeOut(500, function() {
			$('.top-nav.with-title').fadeIn();
		});

		$('#ticket-view').fadeOut(500, function() {
			$('#table-section').fadeIn();
		});
	}
}