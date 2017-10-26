class StaffPage extends DynamicPage {
	constructor() {
		super();
	}
	
	showStaff() {
		for (let employee of makeItAll.staffManager.staff) {
			this.appendTableRow(employee);
		}
		staffPage.updateSplashScreen();
	}
	
	showTableRowDetails(id) {
		// Get employee with ID
		let employee = makeItAll.staffManager.getEmployee(id);
		if (!employee) {
			this.hideTableRowDetails();
			alert("No employee with ID " + id);
			return;
		}
		
		this.detailTitle = employee.name;
		
		super.showTableRowDetails(id);
	}
}
