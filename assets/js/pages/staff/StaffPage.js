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
		
		//this.detailTitle = employee.name;
		this.updateSingleViewNavbar(employee.name);
		
		// Content
		$(this.detailSelector).find("[data-slug]").each((i, el) => {
			el.textContent = Object.resolve(el.dataset.slug, employee);
		});
		
		super.showTableRowDetails(id);
	}
}
