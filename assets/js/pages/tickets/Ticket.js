class Ticket {
	constructor(
		id,
		title,
		description,
		dateOfCall,
		caller,
		assignedTo,
		serialNumbers,
		operatingSystem,
		software
	) {
		this.id              = id;
		this.title           = title;
		this.description     = description;
		this.dateOfCall      = dateOfCall;
		this.caller          = caller;
		this.assignedTo      = assignedTo;
		this.serialNumbers   = serialNumbers;
		this.operatingSystem = operatingSystem;
		this.software        = software;
	}
}