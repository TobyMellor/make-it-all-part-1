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
		makeItAll.filters = {};

		// TODO: AJAX call for tickets here
		var ticketsResponse = {
			new: {
				id: 0,
				name: 'New',
				tickets: [
					{
						id: 0,
						title: 'Printer Queue not working',
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum metus dui. Vivamus laoreet et nulla sed lobortis. Cras varius posuere feugiat. Nunc ultricies eros a lorem viverra semper.',
						date_of_call: '21/04/2017 12:32',
						caller: 1,
						assigned_to: 0,
						serial_numbers: [
							'B3253SFG',
							'GAGT666G'
						],
						operating_system: 'macOS',
						software: 'Terminal',
						created_at: 'Yesterday',
						updated_at: '1 hour ago',
						events: [
							{
								id: 0,
								author: 0,
								type: 'comment',
								content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
								created_at: '1 hour ago'
							},
							{
								id: 1,
								author: 0,
								type: 'event',
								content: 'Pending - Awaiting Review',
								created_at: '1 hour ago'
							},
							{
								id: 2,
								author: 1,
								type: 'comment',
								content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
								created_at: 'Just now'
							}
						]
					},
					{
						id: 1,
						title: 'Coffee machine needs refilling',
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum metus dui. Vivamus laoreet et nulla sed lobortis. Cras varius posuere feugiat. Nunc ultricies eros a lorem viverra semper.',
						date_of_call: '21/04/2017 12:32',
						caller: 1,
						assigned_to: 1,
						serial_numbers: [],
						operating_system: null,
						software: null,
						created_at: '4 days ago',
						updated_at: '4 days ago',
						events: [
							{
								id: 3,
								author: 0,
								type: 'comment',
								content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
								created_at: '1 hour ago'
							}
						]
					},
					{
						id: 2,
						title: 'Squeeky chair',
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum metus dui. Vivamus laoreet et nulla sed lobortis. Cras varius posuere feugiat. Nunc ultricies eros a lorem viverra semper.',
						date_of_call: '21/04/2017 12:32',
						caller: 0,
						assigned_to: 0,
						serial_numbers: [],
						operating_system: null,
						software: null,
						created_at: '1 day ago',
						updated_at: 'Just now',
						events: []
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
						title: 'Spilt water on macbook',
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum metus dui. Vivamus laoreet et nulla sed lobortis. Cras varius posuere feugiat. Nunc ultricies eros a lorem viverra semper.',
						date_of_call: '21/04/2017 12:32',
						caller: 0,
						assigned_to: 1,
						serial_numbers: [],
						operating_system: null,
						software: null,
						created_at: '23 hours ago',
						updated_at: '3 minutes ago',
						events: []
					}
				]
			},
			resolved: {
				id: 3,
				name: 'Resolved',
				tickets: [
					{
						id: 4,
						title: 'Computer wont turn on',
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum metus dui. Vivamus laoreet et nulla sed lobortis. Cras varius posuere feugiat. Nunc ultricies eros a lorem viverra semper.',
						date_of_call: '21/04/2017 12:32',
						caller: 1,
						assigned_to: 0,
						serial_numbers: [],
						operating_system: null,
						software: null,
						created_at: '4 hours ago',
						updated_at: '4 hours ago',
						events: []
					}
				]
			}
		}; // Response from the AJAX request, contains filters which contain tickets

		for (var filterSlug in ticketsResponse) {
			var filterResponse = ticketsResponse[filterSlug], // A filter object from the AJAX request, e.g. ticketsResponse.new
				filter         = new Filter(filterResponse.id, filterSlug, filterResponse.name);

			for (var index in filterResponse.tickets) {
				var ticketResponse = filterResponse.tickets[index], // A ticket object from the AJAX request, e.g. ticketsResponse.new.tickets[x]
					eventIds       = [];

				for (var j in ticketResponse.events) {
					var eventResponse = ticketResponse.events[j],
						event         = new Event(
							eventResponse.id,
							eventResponse.author,
							eventResponse.type,
							eventResponse.content,
							eventResponse.created_at,
						);

					eventIds.push(event.id);
				}

				filter.addTicket(new Ticket(
					ticketResponse.id,
					filter.name,
					ticketResponse.title,
					ticketResponse.description,
					ticketResponse.date_of_call,
					ticketResponse.caller,
					ticketResponse.assigned_to,
					ticketResponse.serial_numbers,
					ticketResponse.operating_system,
					ticketResponse.software,
					ticketResponse.created_at,
					ticketResponse.updated_at
				));
			}

			this.addFilter(filter);
		}
	}

	createTicket(filterSlug, title, description, dateOfCall, caller, assignedTo, serialNumbers, operatingSystem, software) {
		var filter = makeItAll.getFilter(filterSlug);

		// AJAX call here, which returns a ticketId
		// validation here
		var ticketId = Math.floor(Math.random() * (10000 + 1)),
			ticket   = new Ticket(
				ticketId,
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
			);

		filter.addTicket(ticket);

		return ticket;
	}

	createEvent(author, type, content, createdAt) {
		// AJAX call here, which returns a eventId
		// validation here
		var eventId = Math.floor(Math.random() * (10000 + 1)),
			event   = new Event(
				eventId,
				author,
				type,
				content,
				createdAt
			);

		makeItAll[eventId] = event;

		return event;
	}

	addFilter(filter) {
		makeItAll.filters[filter.slug] = filter;
	}
}