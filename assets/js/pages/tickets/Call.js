/**
 * Call
 *
 * Every time the Helpdesk is called, this is created.
 * A call may have multiple tickets, a ticket may have
 * multiple calls.
 */

class Call {
	constructor(
		id,
		dateOfCall,
		caller,
		tickets
	) {
		this.id               = id;
		this.date_of_call     = dateOfCall;
		this.caller           = caller; // ID of caller, get method returns instance of Staff
		this.tickets          = tickets; // ID of tickets, get method returns instances of Ticket's
	}

	get caller() {
		return makeItAll.staffManager.getStaff(this._caller);
	}

	set caller(caller) {
		this._caller = caller;
	}

	get tickets() {
		return makeItAll.ticketManager.getTickets(this.id);
	}

	set tickets(tickets) {
		this._tickets = tickets;
	}
}