/**
 * Filter
 *
 * Holds information about a Filter.
 * Contains Tickets that fit into the filter
 */

class Filter {
	constructor(id, slug, name, tickets) {
		this.id      = id;
		this.slug    = slug; // slug_example
		this.name    = name; // Name Example!
		this.tickets = tickets;   // ID of tickets, get method returns Ticket instances
	}

	get tickets() {
		return makeItAll.ticketManager.getTickets(this.slug);
	}

	set tickets(tickets) {
		this._tickets = tickets;
	}
}