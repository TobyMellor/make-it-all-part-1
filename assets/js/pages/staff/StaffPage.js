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
			el.textContent = String(Object.resolve(el.dataset.slug, employee)) || "—";
		});
		
		$(this.detailSelector).find("[data-customslug]").each((i, el) => {
			switch (el.dataset.customslug) {
			
				case "access":
					el.innerHTML = "";
					let icons = {read: "eye", operator: "user-secret", analyst: "line-chart", admin: "shield"};
					
					for (let permission of ["read", "operator", "analyst", "admin"]) {
						
						if (employee.access[permission]) {
							
							let elIcon = document.createElement("i");
							elIcon.classList.add("fa", "fa-" + icons[permission]);
							
							let elText = document.createElement("span");
							elText.textContent = permission.charAt(0).toUpperCase() + permission.slice(1);
							
							let elPermission = document.createElement("span");
							elPermission.appendChild(elIcon);
							elPermission.appendChild(elText);
							
							el.appendChild(elPermission);
						}
						
					}
					
					break;
				default:
					el.textContent = "—";
			}
		});
		
		super.showTableRowDetails(id);
	}
}
