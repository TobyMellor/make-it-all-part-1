$(function() {
	var ticketPage = new TicketPage();

	$('.side-nav-bar-nested ul li[slug]').on('click', function() {
		$('.side-nav-bar-nested ul li.active').removeClass('active');

		$(this).addClass('active');

		ticketPage.showFilteredTickets($(this).attr('slug'));
	});

	ticketPage.showFilteredTickets('new');

	$('#new-ticket-modal #create-new-ticket').on('click', function (e) {
		e.preventDefault();

		var formData = parseFormData($('#new-ticket-modal form')),
			ticket   = ticketPage.ticketManager.createTicket(
				formData['ticket[filter]'],
				formData['ticket[title]'],
				formData['ticket[description]'],
				formData['ticket[date_of_call]'],
				formData['ticket[caller]'],
				formData['ticket[assigned_to]'],
				formData['ticket[hardware][serial_numbers]'],
				formData['ticket[software][opearting_system]'],
				formData['ticket[software][software]']
			);

		ticketPage.showFilteredTickets(formData['ticket[filter]']);

		$('#new-ticket-modal').modal('hide');
	});
});

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