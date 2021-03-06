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
	constructor() {
		super();
		
		var calls = [
			{
				id: 0,
				date_of_call: '21/04/2017 12:32',
				caller: 0,
				tickets: [0, 1]
			},
			{
				id: 1,
				date_of_call: '21/04/2017 12:32',
				caller: 0,
				tickets: [2]
			},
			{
				id: 2,
				date_of_call: '21/04/2017 12:32',
				caller: 1,
				tickets: [3]
			},
			{
				id: 3,
				date_of_call: '21/04/2017 12:32',
				caller: 3,
				tickets: [4]
			},
			{
				id: 4,
				date_of_call: '21/04/2017 12:32',
				caller: 5,
				tickets: [4]
			},
		];

		var filters = [
			{
				id: 0,
				slug: 'new',
				name: 'New',
				tickets: [0, 1, 2]
			},
			{
				id: 1,
				slug: 'pending_awaiting_staff',
				name: 'Pending - Awaiting Staff',
				tickets: []
			},
			{
				id: 2,
				slug: 'pending_in_progress',
				name: 'Pending - In Progress',
				tickets: [3]
			},
			{
				id: 3,
				slug: 'resolved',
				name: 'Resolved',
				tickets: [4]
			}
		];

		var tickets = [
			{
				id: 0,
				calls: [0],
				filter: 'new',
				title: 'Printer Queue not working',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum metus dui. Vivamus laoreet et nulla sed lobortis. Cras varius posuere feugiat. Nunc ultricies eros a lorem viverra semper.',
				assigned_to: 0,
				devices: [1, 2],
				programs: [0],
				operating_system: 'macOS 12.4',
				created_at: 'Yesterday',
				updated_at: '1 hour ago',
				events: [0, 1, 2],
				problem_type: 5
			},
			{
				id: 1,
				calls: [0],
				filter: 'new',
				title: 'Coffee machine needs refilling',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum metus dui. Vivamus laoreet et nulla sed lobortis. Cras varius posuere feugiat. Nunc ultricies eros a lorem viverra semper.',
				assigned_to: 1,
				devices: [4, 2],
				programs: [],
				operating_system: 'macOS 12.4',
				created_at: '4 days ago',
				updated_at: '4 days ago',
				events: [3],
				problem_type: 1
			},
			{
				id: 2,
				calls: [1],
				filter: 'new',
				title: 'Squeeky chair',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum metus dui. Vivamus laoreet et nulla sed lobortis. Cras varius posuere feugiat. Nunc ultricies eros a lorem viverra semper.',
				assigned_to: 3,
				devices: [1],
				programs: [2],
				operating_system: 'macOS 12.4',
				created_at: '1 day ago',
				updated_at: 'Just now',
				events: [],
				problem_type: 3
			},
			{
				id: 3,
				calls: [2],
				filter: 'pending_in_progress',
				title: 'Spilt water on macbook',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum metus dui. Vivamus laoreet et nulla sed lobortis. Cras varius posuere feugiat. Nunc ultricies eros a lorem viverra semper.',
				assigned_to: 1,
				devices: [3, 4],
				programs: [2],
				operating_system: 'macOS 12.4',
				created_at: '23 hours ago',
				updated_at: '3 minutes ago',
				events: [],
				problem_type: 5
			},
			{
				id: 4,
				calls: [3, 4],
				filter: 'resolved',
				title: 'Computer wont turn on',
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum metus dui. Vivamus laoreet et nulla sed lobortis. Cras varius posuere feugiat. Nunc ultricies eros a lorem viverra semper.',
				assigned_to: 5,
				devices: [1],
				programs: [],
				operating_system: 'macOS 12.4',
				created_at: '4 hours ago',
				updated_at: '4 hours ago',
				events: [],
				problem_type: 4
			}
		];

		var events = [
			{
				id: 0,
				ticket_id: 0,
				author: 5,
				type: 'comment',
				content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
				created_at: '1 hour ago'
			},
			{
				id: 1,
				ticket_id: 0,
				author: 4,
				type: 'event',
				content: 'Pending - Awaiting Staff',
				created_at: '1 hour ago'
			},
			{
				id: 2,
				ticket_id: 0,
				author: 3,
				type: 'comment',
				content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
				created_at: 'Just now'
			},
			{
				id: 3,
				ticket_id: 1,
				author: 3,
				type: 'comment',
				content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
				created_at: '1 hour ago'
			}
		];
		
		this.calls   = [];
		this.filters = [];
		this.tickets = [];
		this.events  = [];

		for (let i = 0; i < calls.length; i++) {
			var call = calls[i];

			this.calls.push(new Call(
				call.id,
				call.date_of_call,
				call.caller,
				call.tickets
			));
		}

		for (let i = 0; i < filters.length; i++) {
			var filter = filters[i];

			this.filters.push(new Filter(
				filter.id,
				filter.slug,
				filter.name,
				filter.tickets
			));
		}

		for (let i = 0; i < tickets.length; i++) {
			var ticket = tickets[i];

			this.tickets.push(new Ticket(
				ticket.id,
				ticket.calls,
				ticket.filter,
				ticket.title,
				ticket.description,
				ticket.assigned_to,
				ticket.devices,
				ticket.programs,
				ticket.operating_system,
				ticket.created_at,
				ticket.updated_at,
				ticket.events,
				ticket.problem_type
			));
		}

		for (let i = 0; i < events.length; i++) {
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
		return this.calls.filter(call => call._tickets.indexOf(ticketId) > -1);
	}

	getCall(callId) {
		return this.calls.find(call => call.id === callId);
	}

	getFilter(filterSlug) {
		return this.filters.find(filter => filter.slug === filterSlug);
	}

	getFilters(filterSlugs) {
		var filters = [];

		for (let i = 0; i < filterSlugs.length; i++) {
			filters.push(this.getFilter(filterSlugs[i]));
		}

		return filters;
	}

	getTicketsAssignedTo(id) {
		return this.tickets.filter(ticket => ticket._assigned_to === id);
	}

	getMyTickets() {
		return this.getTicketsAssignedTo(makeItAll.staffManager.currentUser());
	}

	updateFilter(oldFilterSlug, newFilterSlug, ticketId) {
		for (let i in this.filters) {
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

		for (let i = 0; i < ticketIds.length; i++) {
			var ticketId = ticketIds[i];

			this.getTicket(ticketId)._calls.push(callId);
		}

		for (let i in tickets) {
			var ticket = this.createTicket(
				callId,
				tickets[i].filter,
				tickets[i].title,
				tickets[i].description,
				tickets[i].assigned_to,
				tickets[i].devices,
				tickets[i].programs,
				tickets[i].operating_system,
				tickets[i].problem_type
			);

			ticketIds.push(ticket.id);
		}

		call.tickets = ticketIds;

		this.calls.push(call);

		return call;
	}

	createTicket(callId, filterSlug, title, description, assignedTo, devices, programs = [], operatingSystem, problemType) {
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
			programs,
			operatingSystem,
			'Just now',
			'Just now',
			[],
			parseInt(problemType)
		));

		this.getFilter(filterSlug)._tickets.push(ticketId);

		return this.tickets[this.tickets.length - 1];
	}

	getTickets(filterSlug) {
		return this.tickets.filter(ticket => ticket.filter.slug === filterSlug);
	}

	getTicket(ticketId) {
		return this.tickets.find(ticket => ticket.id === ticketId);
	}

	getTicketsFromCall(callId) {
		return this.tickets.filter(ticket => ticket._calls.indexOf(callId) > -1);
	}

	editTicket(ticketId, filterSlug, title, description, assignedTo, devices, programs = [], operatingSystem, problemType) {
		var ticket = this.getTicket(ticketId);

		if (ticket.filter.slug !== filterSlug) {
			this.createEvent(
				ticketId,
				makeItAll.staffManager.currentUser(),
				'event',
				this.getFilter(filterSlug).name,
				'Just now'
			);

			this.updateFilter(ticket.filter.slug, filterSlug, ticketId);
		}
		
		if (ticket._assigned_to !== assignedTo) {
			this.createEvent(
				ticketId,
				makeItAll.staffManager.currentUser(),
				'event',
				'Assigned to ' + makeItAll.staffManager.getEmployee(assignedTo).name,
				'Just now'
			);
		}

		ticket.filter           = filterSlug;
		ticket.title            = title;
		ticket.description      = description;
		ticket.assigned_to      = assignedTo;
		ticket.devices          = devices;
		ticket.programs         = programs;
		ticket.operating_system = operatingSystem;
		ticket.problem_type     = problemType;

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
		return this.events.filter(event => event.ticket.id === ticketId);
	}

	getRelatedProblems(problemTypeId) {
		return this.tickets.filter(ticket => ticket._problem_type === problemTypeId);
	}

	search(query, properties) {
		return super.search(this.tickets, query, properties);
	}
}