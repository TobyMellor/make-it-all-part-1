/**
 * Ticket
 *
 * Holds information about a Ticket/Problem.
 * Contains the filter it belongs to, contains events it has
 */

class Ticket {
	constructor(
		id,
		filter,
		title,
		description,
		dateOfCall,
		caller,
		assignedTo,
		serialNumbers,
		operatingSystem,
		software,
		createdAt,
		updatedAt,
		events
	) {
		this.id               = id;
		this.filter           = filter; // slug of filter, get method returns instance of Filter
		this.title            = title;
		this.description      = description;
		this.date_of_call     = dateOfCall;
		this.caller           = caller;     // ID of caller, get method returns instance of Staff
		this.assigned_to      = assignedTo; // ID of caller, get method returns instance of Staff
		this.serial_numbers   = serialNumbers;
		this.operating_system = operatingSystem;
		this.software         = software;
		this.created_at       = createdAt;
		this.updated_at       = updatedAt;
		this.events           = events; // ID of events, get method returns instances of Event's
	}

	get filter() {
		return makeItAll.ticketManager.getFilter(this._filter);
	}

	set filter(filter) {
		this._filter = filter;
	}

	get caller() {
		return makeItAll.staffManager.getStaff(this._caller); // TODO: return name of caller instead from George's part
	}

	set caller(caller) {
		this._caller = caller;
	}

	get assigned_to() {
		return makeItAll.staffManager.getStaff(this._assigned_to); // TODO: return name of assigned person instead from George's part
	}

	set assigned_to(assignedTo) {
		this._assigned_to = assignedTo;
	}

	get events() {
		return makeItAll.ticketManager.getEvents(this.id);
	}

	set events(events) {
		this._events = events;
	}
}