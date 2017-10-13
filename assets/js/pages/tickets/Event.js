class Event {
	constructor(
		id,
		author,
		type,
		content,
		createdAt
	) {
		this.id         = id;
		this._author    = author;
		this.type       = type;
		this.content    = content;
		this.created_at = createdAt;
	}

	get author() {
		return this._author; // TODO: return name of author instead from George's part
	}

	set author(author) {
		this._author = author;
	}
}