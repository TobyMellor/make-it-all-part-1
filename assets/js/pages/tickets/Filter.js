/**
 * Filter
 *
 * Holds information about a Filter.
 * Contains Tickets that fit into the filter
 */

class Filter {
	constructor(slug, name) {
		this.slug    = slug; // slug_example
		this.name    = name; // Name Example!
		this.tickets = [];
	}

	addTicket(ticket) {
		this.tickets.push(ticket);
	}

	getTickets() {
		return this.tickets;
	}
}