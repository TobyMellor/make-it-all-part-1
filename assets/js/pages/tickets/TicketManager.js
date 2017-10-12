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

		// TODO: Get staff from George's part
		var staff = {
			0: {
				first_name: 'Toby',
				last_name: 'Mellor',
				email: 'tobymulberry@hotmail.com',
				permission_level: 4, // super admin
			},
			1: {
				first_name: 'Example',
				last_name: 'User',
				email: 'example@domain.com',
				permission_level: 3 // analyst
			}
		};

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
							"B3253SFG",
							"GAGT666G"
						],
						operating_system: "macOS",
						software: "Terminal"

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
						software: null
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
						software: null
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
						software: null
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
						software: null
					}
				]
			}
		}; // Response from the AJAX request, contains filters which contain tickets

		for (var filterSlug in ticketsResponse) {
			var filterResponse = ticketsResponse[filterSlug], // A filter object from the AJAX request, e.g. ticketsResponse.new
				filter         = new Filter(filterResponse.id, filterSlug, filterResponse.name);

			for (var index in filterResponse.tickets) {
				var ticketResponse = filterResponse.tickets[index]; // A ticket object from the AJAX request, e.g. ticketsResponse.new.tickets[x]

				filter.addTicket(new Ticket(
					ticketResponse.id,
					ticketResponse.title,
					ticketResponse.date_of_call,
					ticketResponse.caller,
					ticketResponse.assigned_to,
					ticketResponse.serial_numbers,
					ticketResponse.operating_system,
					ticketResponse.software
				));
			}

			this.addFilter(filter);
		}
	}

	createTicket(filterSlug, title, description, dateOfCall, caller, assignedTo, serialNumbers, operatingSystem, software) {
		console.log(filterSlug, title, description, dateOfCall, caller, assignedTo, serialNumbers, operatingSystem, software);
		console.log(this.filters);
		var filter = this.getFilter(filterSlug);

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
				software
			);

		filter.addTicket(ticket);

		return ticket;
	}

	addFilter(filter) {
		this.filters[filter.slug] = filter;
	}

	getFilter(filterSlug) {
		return this.filters[filterSlug];
	}

	getTickets(filterSlug) {
		if (this.filters.hasOwnProperty(filterSlug)) {
			return this.filters[filterSlug];
		}
		
		return null;
	}
}