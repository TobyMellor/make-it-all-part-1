let staffPage = new StaffPage();

$(() => {
	let isPage = document.getElementById(staffPage.sectionSelector.substring(1)).dataset.page === "staff";
	
	$("#new-staff-modal #create-new-staff").click(e => {
		e.preventDefault();

		var formData = $("#new-staff-modal form").serializeObject();

		// validate staff member here

		// if validation passes:
		//  - create staff member here /w AJAX
		//  - retrieve new database ID and replace Math.random function below
		//  - do following:
		var staffId = Math.floor(Math.random() * (10000 + 1));
		
		makeItAll.staffManager.createEmployee(formData.staff);

		addItemToPicker(
			$('.selectpicker.staff-picker[name="' + formData['event_target'] + '"]'),
			staffId,
			formData['staff[first_name]'] + ' ' + formData['staff[last_name]']
		); // formData and staffId to be retrieved by AJAX call
		
		if (isPage) {
			$(staffPage.navSelector).find("[data-slug=\"all\"]").addClass("active").siblings().removeClass("active");
			staffPage.hideTableRowDetails();
			staffPage.showStaff();
		}
		
		$('#new-staff-modal').modal('hide');
	});
	
	$("#new-staff-modal").on("shown.bs.modal", e => {
		// Focus name input
		$(e.target).find("input[name=\"staff.name\"]").focus();
	});

	$(".staff-permissions .custom-checkbox").click(e => {
		e.preventDefault();
		
		var input = e.currentTarget.children[0];
		input.checked = !input.checked;
		
		// Access logic
		if (input.checked) { // Any other access requires read access
			$("input[name=\"staff.access.read\"]").prop("checked", true);
			
			if (input.name === "staff.access.admin") { // Admin requires all other access
				$("input[name*=\"staff.access\"]").prop("checked", true);
			}
		} else { // Cannot have admin access if another access is revoked
			$("input[name=\"staff.access.admin\"]").prop("checked", false);
			
			if (input.name === "staff.access.read") { // No read access cannot have any other access
				$("input[name*=\"staff.access\"]").prop("checked", false);
			}
		}
	});

	$('.staff-picker').selectpicker({
		noneResultsText: 'Click to create {0}'
	});

	// Page-specific follows
	if (!isPage) return;
	
	staffPage.showStaff();
	$(staffPage.navSelector).find("[data-slug]").click(el => {
		$(el.delegateTarget).addClass("active").siblings().removeClass("active");
		
		let slug = el.delegateTarget.dataset.slug;
		let $table = $(staffPage.sectionSelector).find("table");
		let columnIndex = $table.find("thead th").filter((i, el) => el.dataset.slug === slug).first().index();
		
		$table.find("tbody tr").each((i, el) => {
			let $el = $(el);
			let $td = $el.children().eq(columnIndex);
			$el.toggleClass("row-hidden", $td.children().length === 0);
		});
		
		staffPage.updateSplashScreen();
	});
	
	$(staffPage.tableSelector).on("click", "tbody tr", e => {
		staffPage.showTableRowDetails(Number(e.currentTarget.dataset.rowid));
	});
	
});
