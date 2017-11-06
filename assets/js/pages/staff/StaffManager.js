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

	getEmployeesWithPermission(permission, value) {
		return this.findAllWhere(this.staff, employee => employee.access[permission] === value);
	}

	getEmployees(ids) {
		return this.findAllWhere(this.staff, employee => ids.indexOf(employee.id) > -1);
	}
	
	updateEmployee(employee) {
		let oldEmployee = this.staff.find(e => e.id === employee.id);
		
		Object.assign(oldEmployee.access, employee.access);
		Object.assign(oldEmployee, employee);
	}
	
	currentUser(asEmployee = false) {
		let id = 1;
		
		if (asEmployee) {
			return this.getEmployee(id);
		}
		return id;
	}

	getSpecialists(problemTypeId) {
		return this.findAllWhere(this.staff, employee => employee._specialisms.indexOf(problemTypeId) > -1);
	}

	search(query, properties) {
		return super.search(this.staff, query, properties);
	}
}

var staffData = [
	{
		id: 0,
		name: "Bex Howell",
		job: "Designer",
		phone: "01555516794",
		department: "Team 5",
		isAnalyst: true,
		specialisms: [1]
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
		specialisms: [2]
	},
	{
		id: 2,
		name: "Mike Higson",
		job: "Developer",
		phone: "01555138339",
		department: "Team 5",
		isOperator: true,
		specialisms: [3]
	},
	{
		id: 3,
		name: "Ryan Sharp",
		job: "Designer",
		phone: "01555736169",
		department: "Team 5",
		isAnalyst: true,
		specialisms: [4]
	},
	{
		id: 4,
		name: "Toby Beasley",
		job: "Designer",
		phone: "01555574667",
		department: "Team 5",
		isAnalyst: true,
		specialisms: [5]
	},
	{
		id: 5,
		name: "Toby Mellor",
		job: "Developer",
		department: "Team 5",
		phone: "01555181056",
		isOperator: true,
		isAdmin: true,
		specialisms: [1, 2, 6, 8]
	}
];
