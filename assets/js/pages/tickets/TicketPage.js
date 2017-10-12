$(function() {
	var ticketPage = new TicketPage();

	$('.side-nav-bar-nested ul li[slug]').on('click', function() {
		$('.side-nav-bar-nested ul li.active').removeClass('active');

		$(this).addClass('active');

		ticketPage.showFilteredTickets($(this).attr('slug'));
	});

	$('#new-ticket-modal').on('shown.bs.modal', function () {
		// $('#myInput').focus();
	});

	$('.selectpicker').selectpicker();

	ticketPage.showFilteredTickets('new');
});

	$('.selectpicker').selectpicker();
/**
 * TicketPage
 *
 * Manipulates the tickets page /w JQuery using data from
 * the TicketManager.
 */

class TicketPage extends DynamicPage {
	constructor() {
		super();

		this.ticketManager    = new TicketManager();
		this.currentlyShowing = null;
	}

	showFilteredTickets(filterSlug) {
		var filter = this.ticketManager.getTickets(filterSlug);

		if (filter !== null && filter.id !== this.currentlyShowing) {
			var filteredTickets = filter.tickets;

			this.updateTopNavBar(filteredTickets.length + ' \'' + filter.name + '\' ' + (filteredTickets.length === 1 ? 'ticket' : 'tickets'));
			this.updateTable(filteredTickets, true);

			this.currentlyShowing = filter.id;
		}
	}
}