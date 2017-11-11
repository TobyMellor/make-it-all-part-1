let ticketPage      = new TicketPage();
try {
	var problemTypePage = new ProblemTypePage(true);
} catch (e) {
	console.warn("Missing problem types JS");
}

$(() => {
	
	let isPage = document.getElementById(ticketPage.sectionSelector.substring(1)).dataset.page === "tickets";
	if (isPage) ticketPage.showFilteredTickets('new,pending_awaiting_staff,pending_in_progress,resolved');
	
	if (!isPage) return;
	
	$('.side-nav-bar-nested ul li[data-slug]').on('click', function() {
		if (ticketPage.currentlyShowing !== this.dataset.slug) {
			ticketPage.refreshPage(this.dataset.slug);
		}
	});
	
	if (location.hash) ticketPage.showTicketView(parseInt(location.hash.substring(1)));

	$('.new-ticket').on('click', function() {
		$('#new-ticket-modal').find('input, textarea')
			.not('.no-clear-on-show')
			.val('');
	});

	$('#new-ticket-modal #create-new-ticket, #create-follow-up-call').on('click', function (e) {
		var $modal   = $(this).closest('.modal'),
			formData = $modal.find('form').serializeObject(true);

		if (formData.isValid()) {
			var tickets           = formData.tickets,
				existingTicketIds = []; // an new ticket won't have any of these
			
			for (var cardId in tickets) {
				var ticket = tickets[cardId];

				if (ticket.hasOwnProperty('id')) {
					existingTicketIds.push(Number(ticket.id));
					delete tickets[cardId];
				} else {
					ticket.assigned_to = ticket.assigned_to[ticket.assigned_to_type];
				}
			}

			ticketPage.createCall(formData.date_of_call, Number(formData.caller), tickets, existingTicketIds);

			$modal.modal('hide');
		}
	});

	$('#edit-ticket-modal #edit-existing-ticket').on('click', function () {
		var formData = $('#edit-ticket-modal form').serializeObject(true);

		if (formData.isValid()) {
			var ticket = formData.tickets.this;

			makeItAll.ticketManager.editTicket(
				Number(ticket.id),
				ticket.filter,
				ticket.title,
				ticket.description,
				Number(ticket.assigned_to[ticket.assigned_to_type]),
				ticket.devices,
				ticket.programs,
				ticket.operating_system,
				Number(ticket.problem_type)
			);

			ticketPage.refreshPage(ticket.filter, Number(ticket.id));

			$('#edit-ticket-modal').modal('hide');
		}
	});

	$('#create-new-event').on('click', function(e) {
		e.preventDefault();

		ticketPage.appendNewComment($(this).parent().find('textarea'));
	});

	$(document).on('click', '#table-section .table tr:not(.highlight)', function() {
		ticketPage.showTicketView(Number(this.dataset.rowid));
	});

	$('.ticket-close-button').on('click', function() {
		ticketPage.hideTableRowDetails();
	});

	$('.add-another-ticket').on('click', function() {
		ticketPage.addNewAccordionCard($(this).closest('.modal-body').find('#accordion'));
	});

	$('#add-existing-ticket').on('change', function() {
		if ($(this).val() !== "") { // not the default select option
			ticketPage.addExistingAccordionCard($('#follow-up-call-modal #accordion'), Number($(this).val()));
		}
	});

	$(document).on('keyup', '#accordion .card .collapse input[name*="title"]', function() {
		var $cardHeader = $(this).closest('.card').find('.card-header a'),
			headerText  = $(this).val().length <= 2 ? 'New Ticket' : 'New Ticket: ' + $(this).val();

		$cardHeader.text(headerText);
	});

	$(document).on('change', '.selectpicker.add-hardware-device', function() {
		if ($(this).val() !== "") { // not the default select option
			ticketPage.appendHardwareDevice($(this).closest('.row').next().find('.affected-items'), Number($(this).val()), $(this).closest('.card').data('cardid'));
			$(this).closest('.card-block').scrollTop(1E10);
		}
	});

	$(document).on('change', '.selectpicker.add-software-program', function() {
		if ($(this).val() !== "") { // not the default select option
			ticketPage.appendSoftwareProgram($(this).closest('.row').next().find('.affected-items'), Number($(this).val()), $(this).closest('.card').data('cardid'));
			$(this).closest('.card-block').scrollTop(1E10);
		}
	});

	$(document).on('click', '.remove-affected-item', function() {
		ticketPage.removeAffectedItem($(this));
	});

	$(document).on('click', '#ticket-view #call-history-table tbody tr', function() {
		ticketPage.showCallTicketsModal(Number(this.dataset.rowid));
	});

	$(document).on('click', '#view-call-history-modal #call-tickets-table tbody tr:not(.highlight)', function() {
		ticketPage.showCallTicket(Number(this.dataset.rowid));
	});

	$('#follow-up-call-modal').on('shown.bs.modal', function() {
		var $firstAccordionHeader = $(this).find('#accordion .card-header a'),
			$addExistingTicket    = $('#add-existing-ticket'),
			allTickets            = makeItAll.ticketManager.tickets;

		$firstAccordionHeader.text('This Ticket: ' + ticketPage.currentTicket.title);

		ticketPage.populateTicketModal($(this), ticketPage.currentTicket, 'this');

		$addExistingTicket.html('<option selected hidden>Select an Existing Ticket</option>');

		for (var i = 0; i < allTickets.length; i++) {
			var ticket = allTickets[i];

			if (ticket.id === ticketPage.currentTicket.id) {
				continue;
			}

			$addExistingTicket.append('<option value="' + ticket.id + '">' + '#' + ticket.id + ' ' + ticket.title.substring(0, 17) + '</option>');
		}

		$addExistingTicket.selectpicker('refresh');
	});

	$('#new-ticket-modal').on('show.bs.modal', function () {
		ticketPage.populateSelectField($(this).find('select[name="caller"]'), 'Choose a caller…', makeItAll.staffManager.staff);
	});

	$('#follow-up-call-modal').on('show.bs.modal', function() {
		var lastCallerId = ticketPage.currentTicket.calls[ticketPage.currentTicket.calls.length - 1].caller.id;

		ticketPage.populateSelectField($(this).find('select[name="caller"]'), 'Choose a caller…', makeItAll.staffManager.staff, lastCallerId);
	});

	$('#new-ticket-modal, #follow-up-call-modal').on('show.bs.modal', function() {
		ticketPage.populateSelectField($(this).find('select[name*=assigned_to]'), 'Choose an operator…', makeItAll.staffManager.getEmployeesWithPermission('operator', true));

		$(this).find('.staff-information').text('No staff member has been selected yet!');
		$(this).find('#accordion .card .type-columns').empty();
		$(this).find('input[name*="assigned_to.self"]').val(makeItAll.staffManager.currentUser());
		$(this).find('input[name*="assigned_to.self_showcase"]').val(makeItAll.staffManager.currentUser(true).name);
		$(this).find('input[name*="assigned_to.specialist"]').val('');
		$(this).find('input[name*="assigned_to.specialist_showcase"]').val('Problem Type not yet chosen');
		$(this).find('.form-check .form-check-input[value="self"]').click();

		problemTypePage.loadSubProblemTypes($(this).find('.type-columns'));
	});

	$('#new-ticket-modal, #follow-up-call-modal, #edit-ticket-modal').on('show.bs.modal', function() {
		ticketPage.populateSelectField($(this).find('.selectpicker.add-hardware-device'), 'Type a serial number…', makeItAll.hardwareManager.devices, null, 'serial_number');
		ticketPage.populateSelectField($(this).find('.selectpicker.add-software-program'), 'Choose a program…', makeItAll.softwareManager.programs);
	});

	$('#edit-ticket-modal').on('show.bs.modal', function() {
		var currentTicket = ticketPage.currentTicket;

		ticketPage.populateSelectField($(this).find('select[name*=assigned_to]'), 'Choose an operator…', makeItAll.staffManager.getEmployeesWithPermission('operator', true), (ticketPage.getAssignedToType(currentTicket) === 'operator' ? currentTicket._assigned_to : null));
		ticketPage.populateTicketModal($(this), currentTicket, 'this');
				
		$(this).find('.form-check .form-check-label input[value="' + ticketPage.getAssignedToType(currentTicket) + '"]').click();

		problemTypePage.loadProblemType($(this).find('.type-columns'), currentTicket._problem_type);
	});

	$('#new-ticket-modal, #follow-up-call-modal').on('show.bs.modal', function() {
		$(this).find('.staff-information').text('No staff member has been selected yet!');
	});

	$(document).on('click', '.problem-type-picker:not(.problem-type-checkboxes) .type-column li', function() {
		var problemTypeId = Number($(this).data('problemTypeId'));

		problemTypePage.loadSubProblemTypes($(this).closest('.type-columns'), $(this), problemTypeId);

		$(this).closest('.problem-type-picker').siblings('input[name*=problem_type]').val(problemTypeId);

		ticketPage.setSpecialist(problemTypeId, $(this).closest('.card').length > 0 ? $(this).closest('.card').find('.assigned-to-options') : $(this).closest('.modal').find('.assigned-to-options'));
	});

	$(document).on('click', '.problem-type-checkboxes .type-column li', function() {
		if (!$(this).hasClass('no-children')) {
			staffProblemTypePage.loadSpecialistProblemTypes($(this).closest('.type-columns'), $(this), Number($(this).data('problemTypeId')));
		}
	});

	$(document).on('click', '.problem-type-checkboxes:not(.readonly) .type-column li .specialism-checkbox', function() {
		staffProblemTypePage.toggleSpecialism($(this));
	});

	$('#new-ticket-modal select[name="caller"], #follow-up-call-modal select[name="caller"]').on('change', function() {
		ticketPage.showStaffInformation($(this).closest('.modal').find('.staff-information'), Number($(this).val()));
	});

	$('.search-field input').on('keyup', function() {
		ticketPage.search($(this).val());
	});

	$(document).on('click', '.create-problem-type', function() {
		var $parentProblemType  = $(this).closest('.type-column').prev().find('.active'),
			parentProblemTypeId = Number($parentProblemType.data('problemTypeId'));

		if ($parentProblemType.length === 0) {
			parentProblemTypeId = null;
		}

		problemTypePage.createProblemType($(this).parent().siblings('input').val(), parentProblemTypeId);
	});

	$(document).on('click', '.assigned-to-section .form-check input', function() {
		var $assignedToOptions = $(this).closest('.assigned-to-section').find('.assigned-to-options');

		$assignedToOptions.find('> *').hide();
		if ($(this).val() === 'self') {
			$assignedToOptions.find('> :first-child').show();
		} else if ($(this).val() === 'operator') {
			$assignedToOptions.find('> :nth-child(3)').show();
		} else {
			$assignedToOptions.find('> :last-child').show();
		}
	});

	$(document).on('click', '.card.existing .remove-accordion', function() {
		var $addExistingTicket = $(this).closest('.modal').find('#add-existing-ticket'),
			ticketId           = Number($(this).closest('.card-header').siblings('input[name*="id"]').val()),
			ticket             = makeItAll.ticketManager.getTicket(ticketId);

		$addExistingTicket.prepend('<option value="' + ticketId + '">' + '#' + ticketId + ' ' + ticket.title.substring(0, 17) + '</option>');
		$addExistingTicket.selectpicker('refresh');
	});
	
	$("#hardware-software-table").on("click", "tr[data-rowid]", e => {
		location.href = location.href.toString().split("#")[0].replace("tickets.html", e.currentTarget.dataset.rowtype + ".html#" + e.currentTarget.dataset.rowid);
	});
});