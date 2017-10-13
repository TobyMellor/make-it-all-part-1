class Ticket {
	constructor(
		id,
		filterName,
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
		this.filter_name      = filterName;
		this.title            = title;
		this.description      = description;
		this.date_of_call     = dateOfCall;
		this._caller          = caller;
		this._assigned_to     = assignedTo;
		this.serial_numbers   = serialNumbers;
		this.operating_system = operatingSystem;
		this.software         = software;
		this.created_at       = createdAt;
		this.updated_at       = updatedAt;
		this._events          = events;
	}

	get caller() {
		return makeItAll.getStaff(this._caller); // TODO: return name of caller instead from George's part
	}

	set caller(caller) {
		this._caller = caller;
	}

	get assigned_to() {
		return makeItAll.getStaff(this._assigned_to); // TODO: return name of assigned person instead from George's part
	}

	set assigned_to(assignedTo) {
		this._assigned_to = assignedTo;
	}

	get events() {
		var events = [];

		for (var index in this._events) {
			var eventId = this._events[index];

			events.push(makeItAll.getEvent(eventId));
		}

		return events;
	}

	set events(events) {
		this._events = events;
	}
}