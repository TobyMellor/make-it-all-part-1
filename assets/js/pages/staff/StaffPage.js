class StaffPage extends DynamicPage {
	constructor() {
		super();
		this.employee = null;
	}
	
	showStaff() {
		$(this.tableSelector).find("tbody").empty();
		for (let employee of makeItAll.staffManager.staff) {
			this.appendTableRow(employee);
		}
		staffPage.updateSplashScreen();
	}
	
	showTableRowDetails(id) {
		// Get employee with IDå
		this.employee = makeItAll.staffManager.getEmployee(id);
		if (!this.employee) {
			this.hideTableRowDetails();
			alert("No employee with ID " + id);

			return;
		}
		
		//this.detailTitle = employee.name;
		this.updateSingleViewNavbar(this.employee.name);
		
		// Content
		$(this.detailSelector).find("[data-slug]").each((i, el) => {
			let value = Object.resolve(el.dataset.slug, this.employee);
			el.textContent = typeof value !== "undefined" ? value : "—";
		});
		
		$(this.detailSelector).find("[data-customslug]").each((i, el) => {
			switch (el.dataset.customslug) {
			
				case "access":
					this.showPermissions(el, this.employee);
					
					break;
				default:
					el.textContent = "—";
			}
		});

		staffProblemTypePage.currentSpecialisms = this.employee._specialisms;
		staffProblemTypePage.loadSpecialistProblemTypes($('.type-columns'));
		
		super.showTableRowDetails(id);
	}

	showPermissions(el, employee) {
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
	}

	search(query) {
		if (query.length >= 2 || query == parseInt(query)) {
			var properties = ["id", "name", "job", "department", "phone"];
			super.search(query, makeItAll.staffManager.search(query, properties), obj => Object.assign({}, obj), properties);
		} else {
			this.showStaff();
		}
	}
}
