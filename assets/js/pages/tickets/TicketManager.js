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
				id: 0,
				name: 'New',
				tickets: [
					{
						id: 0,
						title: 'Printer Queue not working'
					},
					{
						id: 1,
						title: 'Coffee machine needs refilling'
					},
					{
						id: 2,
						title: 'Squeeky chair'
					}
				]
			},
			pending_awaiting_staff: {
				id: 1,
				name: 'Pending - Awaiting Staff',
				tickets: []
			},
			pending_in_progress: {
				id: 2,
				name: 'Pending - In Progress',
				tickets: [
					{
						id: 3,
						title: 'Spilt water on macbook'
					}
				]
			},
			resolved: {
				id: 3,
				name: 'Resolved',
				tickets: [
					{
						id: 4,
						title: 'Computer wont turn on'
					}
				]
			}
		}; // Response from the AJAX request, contains filters which contain tickets

		for (var filterSlug in ticketsResponse) {
			var filterResponse = ticketsResponse[filterSlug], // A filter object from the AJAX request, e.g. ticketsResponse.new
				filter         = new Filter(filterResponse.id, filterSlug, filterResponse.name);

			for (var index in filterResponse.tickets) {
				var ticketResponse = filterResponse.tickets[index]; // A ticket object from the AJAX request, e.g. ticketsResponse.new.tickets[x]

				filter.addTicket(new Ticket(ticketResponse.id, ticketResponse.title));
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