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
		updatedAt
	) {
		this.id               = id;
		this.filter_name      = filterName;
		this.title            = title;
		this.description      = description;
		this.date_of_call     = dateOfCall;
		this.caller           = caller;
		this.assigned_to      = assignedTo;
		this.serial_numbers   = serialNumbers;
		this.operating_system = operatingSystem;
		this.software         = software;
		this.created_at       = createdAt;
		this.updated_at       = updatedAt;
	}
}