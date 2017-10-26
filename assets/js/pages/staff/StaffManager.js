/**
 * StaffManager
 *
 * Responsible for parsing the AJAX request containing staff
 * creating the corresponding classes. 
 * Contains all functions to return and search the data.
 *
 * StaffManager should never know about the DOM
 */

class StaffManager extends Manager {
	constructor(staff) {
		super();
		this.staff = staff ? staff.map(e => new Employee(e)) : [];
	}

	createEmployee(data = {}) {
		data.id = Math.floor(Math.random() * 10000 + 1);
		
		let employee = new Employee(data);
		
		this.staff.push(employee);
		
		return employee;
	}

	getEmployee(id) {
		return this.staff.find(e => e.id === id);
	}
	
	currentUser(asEmployee = false) {
		let id = 1;
		
		if (asEmployee) {
			return this.getEmployee(id);
		}
		return id;
	}
}
