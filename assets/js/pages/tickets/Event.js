/**
 * Event
 *
 * Holds information about a Event.
 * An event is a comment or an action that has been
 * made that requires an update to the ticket. e.g. status change
 * 
 * Contains the Ticket that it belongs to
 */

class Event {
	constructor(
		id,
		ticket,
		author,
		type,
		content,
		createdAt
	) {
		this.id         = id;
		this.ticket     = ticket; // ID of ticket, get method returns instance of Ticket
		this.author     = author; // ID of author, get method returns instance of Staff
		this.type       = type;
		this.content    = content;
		this.created_at = createdAt;
	}

	get ticket() {
		return makeItAll.ticketManager.getTicket(this._ticket);
	}

	set ticket(ticket) {
		this._ticket = ticket;
	}

	get author() {
		return makeItAll.staffManager.getStaff(this._author);
	}

	set author(author) {
		this._author = author;
	}
}