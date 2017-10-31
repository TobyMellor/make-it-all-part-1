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
	
	currentUser(asEmployee = false) {
		let id = 1;
		
		if (asEmployee) {
			return this.getEmployee(id);
		}
		return id;
	}
	
	// Deprecated
	get staffMembers() {
		console.warn("Use of StaffManager property staffMembers is deprecated, use staff");
		return this.staff;
	}
	getStaffMember(id) {
		console.warn("Use of StaffManager method getStaffMember(id) is deprecated, use getEmployee(id)");
		return this.getEmployee(id);
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
		specialismss: [1]
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
