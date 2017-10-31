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

		addItemToPicker(
			$('.selectpicker.staff-picker[name="' + formData['event_target'] + '"]'),
			staffId,
			formData['staff[first_name]'] + ' ' + formData['staff[last_name]']
		); // formData and staffId to be retrieved by AJAX call

		$('#new-staff-modal').modal('hide');
	});

	// Page-specific follows
	if (!isPage) return;

	let staffProblemTypePage = new StaffProblemTypePage();

	$('#new-staff-modal').on('show.bs.modal', function() {
		var $typeColumns = $(this).find('.type-columns');

		staffProblemTypePage.loadSpecialistProblemTypes(makeItAll.staffManager.currentUser(true), $typeColumns);
	});

	$(document).on('click', '.type-column li', function() {
		staffProblemTypePage.loadSpecialistProblemTypes(makeItAll.staffManager.currentUser(true), $(this).closest('.type-columns'), $(this), parseInt($(this).data('problemTypeId')));
	});
	
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
