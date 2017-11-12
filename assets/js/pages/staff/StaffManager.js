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
		staff = staffData; // initial prototype data
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

	getEmployees(ids) {
		return this.staff.filter(employee => ids.indexOf(employee.id) > -1);
	}

	getEmployeesWithPermission(permission, value) {
		return this.staff.filter(employee => employee.access[permission] === value);
	}

	updateEmployee(employee) {
		let oldEmployee = this.getEmployee(employee.id);
		
		Object.assign(oldEmployee.access, employee.access);
		Object.assign(oldEmployee, employee);
	}
	
	/**
	 * Get the currently logged in user
	 *
	 * @param asEmployee Method returns ID by default or Employee if truthy
	 */
	currentUser(asEmployee = false) {
		let id = 1;
		// Get Employee with ID
		if (asEmployee) {
			return this.getEmployee(id);
		}
		return id;
	}

	getSpecialists(problemTypeId) {
		return this.staff.filter(employee => employee._specialisms.indexOf(problemTypeId) > -1);
	}

	hasSpecialism(employee, problemTypeId) {
		return employee._specialisms.indexOf(problemTypeId) > -1;
	}

	search(query, properties) {
		return super.search(this.staff, query, properties);
	}
}

var staffData = [
	{
		id: 0,
		name: "Bex Howell",
		email: "domain@example.com",
		job: "Designer",
		phone: "01555516794",
		department: "Team 5",
		isAnalyst: true,
		isOperator: true,
		specialisms: [1, 2]
	},
	{
		id: 1,
		name: "George Garside",
		email: "george@example.com",
		job: "Developer",
		department: "Team 5",
		phone: "01555864722",
		isOperator: true,
		isAdmin: true,
		specialisms: [2, 3, 4]
	},
	{
		id: 2,
		name: "Mike Higson",
		email: "domain@example.com",
		job: "Developer",
		phone: "01555138339",
		department: "Team 5",
		isOperator: true,
		specialisms: [3]
	},
	{
		id: 3,
		name: "Ryan Sharp",
		email: "domain@example.com",
		job: "Designer",
		phone: "01555736169",
		department: "Team 5",
		isAnalyst: true,
		specialisms: [4]
	},
	{
		id: 4,
		name: "Toby Beasley",
		email: "domain@example.com",
		job: "Designer",
		phone: "01555574667",
		department: "Team 5",
		isAnalyst: true,
		specialisms: [5, 8]
	},
	{
		id: 5,
		name: "Toby Mellor",
		email: "me@tobymellor.co.uk",
		job: "Developer",
		department: "Team 5",
		phone: "01555181056",
		isOperator: true,
		isAdmin: true,
		specialisms: [1, 2, 8]
	}
];
