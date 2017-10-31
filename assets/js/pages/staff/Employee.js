/**
 * Employee
 *
 * An employee of the company
 */
class Employee {
	constructor({
		id,
		name,
		email,
		job,
		department,
		phone,
		specialisms,
		isRead: read = false,
		isOperator: operator = false,
		isAnalyst: analyst = false,
		isAdmin: admin = false
	}) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.job = job;
		this.department = department;
		this.phone = phone;
		this.specialisms = specialisms;
		this.access = {read, operator, analyst, admin};
		
		// If user is any other permission then read is granted
		this.access.read = this.access.operator || this.access.analyst || this.access.admin || this.access.readonly;
	}
	
	get isRead() {
		return this.access.read;
	}

	get isOperator() {
		return this.access.operator;
	}

	get isAnalyst() {
		return this.access.analyst;
	}

	get isAdmin() {
		return this.access.admin;
	}

	get specialisms() {
		return makeItAll.problemTypeManager.getProblemTypes(this._specialisms);
	}

	set specialisms(specialisms) {
		this._specialisms = specialisms;
	}
}
