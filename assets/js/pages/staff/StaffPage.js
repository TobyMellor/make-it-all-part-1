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
			var textContent = String(Object.resolve(el.dataset.slug, employee) || "—");

			if ($(el).is('input')) {
				el.value = textContent;
			} else {
				el.textContent = textContent;
			}
		});

		staffProblemTypePage.currentSpecialisms = employee._specialisms;
		staffProblemTypePage.loadSpecialistProblemTypes($('.type-columns'));
		
		super.showTableRowDetails(id);
	}
}
