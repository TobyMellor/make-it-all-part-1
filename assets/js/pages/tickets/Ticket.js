/**
 * Ticket
 *
 * Holds information about a Ticket/Problem.
 * Contains the filter it belongs to, contains events it has
 */

class Ticket {
	constructor(
		id,
		calls,
		filter,
		title,
		description,
		assignedTo,
		devices,
		createdAt,
		updatedAt,
		events,
		problemType
	) {
		this.id           = id;
		this.calls        = calls;  // ID of calls, get method returns instances of Call's
		this.filter       = filter; // slug of filter, get method returns instance of Filter
		this.title        = title;
		this.description  = description;
		this.assigned_to  = assignedTo; // ID of caller, get method returns instance of Staff
		this.devices      = devices;
		this.created_at   = createdAt;
		this.updated_at   = updatedAt;
		this.events       = events; // ID of events, get method returns instances of Event's
		this.problem_type = problemType; // ID of problem type, get method returns instance of ProblemType
	}

	get calls() {
		return makeItAll.ticketManager.getCalls(this.id);
	}

	set calls(calls) {
		this._calls = calls;
	}
	
	get filter() {
		return makeItAll.ticketManager.getFilter(this._filter);
	}

	set filter(filter) {
		this._filter = filter;
	}

	get caller() {
		return makeItAll.staffManager.getStaffMember(this._caller);
	}

	set caller(caller) {
		this._caller = caller;
	}

	get assigned_to() {
		return makeItAll.staffManager.getStaffMember(this._assigned_to);
	}

	set assigned_to(assignedTo) {
		this._assigned_to = assignedTo;
	}

	get devices() {
		return makeItAll.hardwareManager.getDevices(this._devices);
	}

	set devices(devices) {
		this._devices = devices;
	}

	get events() {
		return makeItAll.ticketManager.getEvents(this.id);
	}

	set events(events) {
		this._events = events;
	}

	get problem_type() {
		return makeItAll.problemTypeManager.getProblemType(this._problem_type);
	}

	set problem_type(problemType) {
		this._problem_type = problemType;
	}
}