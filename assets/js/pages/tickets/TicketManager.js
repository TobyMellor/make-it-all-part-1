/**
 * TicketManager
 *
 * Responsible for parsing the AJAX request containing filters
 * and tickets and creating the corresponding classes. 
 * Contains all functions to return and search the data.
 *
 * TicketManager should never know about the DOM
 */

class TicketManager extends Manager {
	constructor(calls, filters, tickets, events) {
		super();

		this.calls   = [];
		this.filters = [];
		this.tickets = [];
		this.events  = [];

		for (var i = 0; i < calls.length; i++) {
			var call = calls[i];

			this.calls.push(new Call(
				call.id,
				call.date_of_call,
				call.caller,
				call.tickets
			));
		}

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
				ticket.calls,
				ticket.filter,
				ticket.title,
				ticket.description,
				ticket.assigned_to,
				ticket.devices,
				ticket.created_at,
				ticket.updated_at,
				ticket.events,
				ticket.problem_type
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

	getCalls(ticketId) {
		return this.findAllWhere(this.calls, call => call._tickets.indexOf(ticketId) > -1);
	}

	getCall(callId) {
		return this.findFirstWhere(this.calls, call => call.id === callId);
	}

	getFilter(filterSlug) {
		return this.findFirstWhere(this.filters, filter => filter.slug === filterSlug);
	}

	updateFilter(oldFilterSlug, newFilterSlug, ticketId) {
		for (var i in this.filters) {
			var filter         = this.filters[i],
				filterTickets  = filter._tickets,
				ticketsIndexOf = filterTickets.indexOf(ticketId);

			if (ticketsIndexOf > -1) {
				if (filter.slug === oldFilterSlug) {
					filterTickets.splice(ticketsIndexOf, 1);
				}
			} else if (filter.slug === newFilterSlug) {
				filterTickets.push(ticketId);
			}
		}
	}

	createCall(dateOfCall, caller, tickets, ticketIds = []) {
		var callId = Math.floor(Math.random() * (10000 + 1)),
			call   = new Call(
				callId,
				dateOfCall,
				caller,
				[]
			);

		for (var i = 0; i < ticketIds.length; i++) {
			var ticketId = ticketIds[i];

			this.getTicket(ticketId)._calls.push(callId);
		}

		for (var i in tickets) {
			var ticket = this.createTicket(
				callId,
				tickets[i].filter,
				tickets[i].title,
				tickets[i].description,
				tickets[i].assigned_to,
				tickets[i].devices,
				tickets[i].problem_type
			);

			ticketIds.push(ticket.id);
		}

		call.tickets = ticketIds;

		this.calls.push(call);

		return call;
	}

	createTicket(callId, filterSlug, title, description, assignedTo, devices, problemType) {
		// AJAX call here, which returns a ticketId
		// validation here
		var ticketId = Math.floor(Math.random() * (10000 + 1));

		this.tickets.push(new Ticket(
			ticketId,
			[callId],
			filterSlug,
			title,
			description,
			parseInt(assignedTo),
			devices,
			'Just now',
			'Just now',
			[],
			parseInt(problemType)
		));

		this.getFilter(filterSlug)._tickets.push(ticketId);

		return this.tickets[this.tickets.length - 1];
	}

	getTickets(filterSlug) {
		return this.findAllWhere(this.tickets, ticket => ticket.filter.slug === filterSlug);
	}

	getTicket(ticketId) {
		return this.findFirstWhere(this.tickets, ticket => ticket.id === ticketId);
	}

	getTicketsFromCall(callId) {
		return this.findAllWhere(this.tickets, ticket => ticket._calls.indexOf(callId) > -1);
	}

	editTicket(ticketId, filterSlug, title, description, assignedTo, devices, problemType) {
		var ticket = this.getTicket(ticketId);

		if (ticket.filter.slug !== filterSlug) {
			this.createEvent(
				ticketId,
				0, // TODO: Replace with logged in user
				'event',
				this.getFilter(filterSlug).name,
				'Just now'
			);

			this.updateFilter(ticket.filter.slug, filterSlug, ticketId);
		}

		if (ticket._assigned_to !== assignedTo) {
			this.createEvent(
				ticketId,
				0,
				'event',
				'Assigned to ' + makeItAll.staffManager.getStaffMember(assignedTo).name,
				'Just now'
			);
		}

		ticket.filter       = filterSlug;
		ticket.title        = title;
		ticket.description  = description;
		ticket.assigned_to  = assignedTo;
		ticket.devices      = devices;
		ticket.problem_type = problemType;

		return ticket;
	}

	createEvent(ticketId, author, type, content, createdAt) {
		var ticket = this.getTicket(ticketId);

		if (ticket !== null) {
			// AJAX call here, which returns a eventId
			// validation here
			var eventId = Math.floor(Math.random() * (10000 + 1));
			
			this.events.push(new Event(
				eventId,
				ticketId,
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
		return this.findAllWhere(this.events, event => event.ticket.id === ticketId);
	}

	getRelatedProblems(problemTypeId) {
		return this.findAllWhere(this.tickets, ticket => ticket._problem_type === problemTypeId);
	}

	search(query, properties) {
		return super.search(this.tickets, query, properties);
	}
}