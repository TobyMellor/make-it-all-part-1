/**
 * Employee
 *
 * An employee of the company
 */
class Employee {
	constructor({
		id,
		name,
		job,
		department,
		phone,
		isOperator: operator = false,
		isAnalyst: analyst = false,
		isAdmin: admin = false
	}) {
		this.id = id;
		this.name = name;
		this.job = job;
		this.department = department;
		this.phone = phone;
		this.access = {operator, analyst, admin};
	}
	
	get isOperator() {
		return this.access.operator
	}
	get isAnalyst() {
		return this.access.analyst
	}
	get isAdmin() {
		return this.access.admin
	}
}
