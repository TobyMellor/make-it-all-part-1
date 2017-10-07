/**
 * TicketManager
 *
 * Responsible for parsing the AJAX request containing filters
 * and tickets and creating the corresponding classes. 
 * Contains all functions to return and search the data.
 *
 * TicketManager should never know about the DOM
 */

class TicketManager {
	constructor() {
		this.filters = {};

		// TODO: AJAX call for tickets here
		var ticketsResponse = {
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
		}; // Response from the AJAX request, contains filters which contain tickets

		for (var filterSlug in ticketsResponse) {
			var filterResponse = ticketsResponse[filterSlug], // A filter object from the AJAX request, e.g. ticketsResponse.new
				filter         = new Filter(filterSlug, filterResponse.name);

			for (var index in filterResponse.tickets) {
				var ticketResponse = filterResponse.tickets[index]; // A ticket object from the AJAX request, e.g. ticketsResponse.new.tickets[x]

				filter.addTicket(new Ticket(ticketResponse.title));
			}

			this.addTicket(filter);
		}
	}

	addTicket(filter) {
		this.filters[filter.slug] = filter;
	}

	getTickets(filterSlug) {
		if (this.filters.hasOwnProperty(filterSlug)) {
			return this.filters[filterSlug];
		}
		
		return null;
	}
}