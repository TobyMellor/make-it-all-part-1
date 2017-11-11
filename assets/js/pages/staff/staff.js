let staffPage            = new StaffPage(),
	staffProblemTypePage = new StaffProblemTypePage();

$(() => {
	let isPage = document.getElementById(staffPage.sectionSelector.substring(1)).dataset.page === "staff";
	
	$("#new-staff-modal #create-new-staff").click(e => {
		e.preventDefault();

		var formData = $("#new-staff-modal form").serializeObject();
		
		if (formData.isValid()) {
			for (let key in formData.staff) {
				if (formData.staff[key] === "") {
					delete formData.staff[key];
				}
			}
			formData.staff.access = formData.staff.access || {};
			for (let key of ["read", "operator", "analyst", "admin"]) {
				formData.staff.access[key] = formData.staff.access[key] !== undefined;
			}
			
			switch (e.currentTarget.dataset.action) {
				case "create":
					var employee = makeItAll.staffManager.createEmployee(formData.staff);

					employee._specialisms = staffProblemTypePage.currentSpecialisms;
					
					addItemToPicker(
						$('.selectpicker.staff-picker[name="' + formData.event_target + '"]'),
						employee.id,
						formData.staff.first_name + ' ' + formData.staff.last_name
					); // formData and staffId to be retrieved by AJAX call
					
					break;
					
				case "save":
					formData.staff.id = staffPage.employee.id;
					staffPage.employee._specialisms = staffProblemTypePage.currentSpecialisms;
					makeItAll.staffManager.updateEmployee(formData.staff);
			}
					
			if (isPage) {
				$(staffPage.navSelector).find("[data-slug=\"all\"]").addClass("active").siblings().removeClass("active");
				staffPage.hideTableRowDetails();
				staffPage.showStaff();
				staffPage.showTableRowDetails(staffPage.employee.id);
			}
			
			$('#new-staff-modal').modal('hide');
		}
	});
	
	$("#new-staff-modal").on("show.bs.modal", e => {
		let isEditing = e.relatedTarget && e.relatedTarget.dataset.action === "edit";
		$(e.target).find(".modal-title").text(isEditing ? "Edit Employee" : "Create a new Employee");
		$("#create-new-staff").text(isEditing ? "Save Changes" : "Create a new Employee")[0].dataset.action = isEditing ? "save" : "create";
		if (isEditing) {
			$(e.target).find("input").each((i, el) => {
				let key = el.name.replace("staff.", "");
				if (el.type === "checkbox") {
					el.checked = Object.resolve(key, staffPage.employee);
				} else if (el.type !== "file") {
					el.value = Object.resolve(key, staffPage.employee) || "";
				}
			});

			staffProblemTypePage.currentSpecialisms = staffPage.employee._specialisms;
		} else {
			staffProblemTypePage.currentSpecialisms = [];
		}

		staffProblemTypePage.loadSpecialistProblemTypes($(e.target).find('.type-columns'));
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

	// $('#new-staff-modal').on('show.bs.modal', function() {
	// 	var $typeColumns = $(this).find('.type-columns');

	// 	staffProblemTypePage.currentSpecialisms = []; // TODO: for the edit modal, set this to Employee._specialisms
	// 	staffProblemTypePage.loadSpecialistProblemTypes($typeColumns);
	// });

	$(document).on('click', '.type-column li', function() {
		if (!$(this).hasClass('no-children')) {
			staffProblemTypePage.loadSpecialistProblemTypes($(this).closest('.type-columns'), $(this), parseInt($(this).data('problemTypeId')));
		}
	});

	$(document).on('click', '.problem-type-picker:not(.readonly) .type-column li .specialism-checkbox', function() {
		staffProblemTypePage.toggleSpecialism($(this));
	});
	
	staffPage.showStaff();
	$(staffPage.navSelector).find("[data-slug]").click(el => {
		if ($('.search-field input').val() !== '') {
			$('.search-field input').val('').keyup();
		}
		
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

	$('.search-field input').on('keyup', function() {
		var query = $(this).val();

		staffPage.search(query);
	});
});
