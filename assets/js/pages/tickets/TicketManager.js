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
	constructor(filters, tickets, events) {
		this.filters = [];
		this.tickets = [];
		this.events  = [];

		for (var i = 0; i < filters.length; i++) {
			var filter = filters[i];

			this.filters.push(new Filter(
				filter.id,
				filter.slug,
				filter.name,
				filter.tickets
			));
		}

		for (var i = 0; i < tickets.length; i++) {
			var ticket = tickets[i];

			this.tickets.push(new Ticket(
				ticket.id,
				ticket.filter,
				ticket.title,
				ticket.description,
				ticket.date_of_call,
				ticket.caller,
				ticket.assigned_to,
				ticket.serial_numbers,
				ticket.operating_system,
				ticket.software,
				ticket.created_at,
				ticket.updated_at,
				ticket.events
			));
		}

		for (var i = 0; i < events.length; i++) {
			var event = events[i];

			this.events.push(new Event(
				event.id,
				event.ticket_id,
				event.author,
				event.type,
				event.content,
				event.created_at
			));
		}
	}

	getFilter(filterSlug) {
		for (var i = 0; i < this.filters.length; i++) {
			var filter = this.filters[i];

			if (filter.slug === filterSlug) {
				return filter;
			}
		}

		return null;
	}

	createTicket(filterSlug, title, description, dateOfCall, caller, assignedTo, serialNumbers, operatingSystem, software) {
		var filter = makeItAll.getFilter(filterSlug);

		// AJAX call here, which returns a ticketId
		// validation here
		var ticketId = Math.floor(Math.random() * (10000 + 1));

		this.tickets.push(new Ticket(
			ticketId,
			filterSlug,
			title,
			description,
			dateOfCall,
			caller,
			assignedTo,
			serialNumbers,
			operatingSystem,
			software,
			'Just now',
			'Just now',
			[]
		));

		this.filters.push(ticketId);

		return this.tickets[this.tickets.length - 1];
	}

	getTickets(filterSlug) {
		var tickets = [];

		for (var i = 0; i < this.tickets.length; i++) {
			var ticket = this.tickets[i];

			if (ticket.filter.slug === filterSlug) {
				tickets.push(ticket);
			}
		}

		return tickets;
	}

	getTicket(ticketId) {
		for (var i = 0; i < this.tickets.length; i++) {
			var ticket = this.tickets[i];

			if (ticket.id === ticketId) {
				return ticket;
			}
		}

		return null;
	}

	createEvent(ticketId, author, type, content, createdAt) {
		var ticket = this.getTicket(ticketId);

		if (ticket !== null) {
			// AJAX call here, which returns a eventId
			// validation here
			var eventId = Math.floor(Math.random() * (10000 + 1));
			
			this.events.push(new Event(
				eventId,
				author,
				type,
				content,
				createdAt
			));

			ticket.events.push(eventId);

			return this.events[this.events.length - 1];
		}

		return null;
	}

	getEvents(ticketId) {
		var events = [];

		for (var i = 0; i < this.events.length; i++) {
			var event = this.events[i];

			if (event.ticket.id === ticketId) {
				events.push(event);
			}
		}

		return events;
	}
}