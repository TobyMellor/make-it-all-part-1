let ticketPage      = new TicketPage(),
	problemTypePage = new ProblemTypePage(true);

$(() => {
	$('.side-nav-bar-nested ul li[data-slug]').on('click', function() {
		if (ticketPage.currentlyShowing !== this.dataset.slug) {
			ticketPage.refreshPage(this.dataset.slug);
		}
	});

	ticketPage.showFilteredTickets('new,pending_awaiting_staff,pending_in_progress,resolved');

	$('.new-ticket').on('click', function() {
		$('#new-ticket-modal').find('input, textarea')
			   .not('.no-clear-on-show')
			   .val('');
	});

	$('#new-ticket-modal #create-new-ticket').on('click', function (e) {
		var formData = $('#new-ticket-modal form').serializeObject();

		ticketPage.createCall(formData.date_of_call, formData.caller, formData.tickets);

		$('#new-ticket-modal').modal('hide');
	});

	$('#edit-ticket-modal #edit-existing-ticket').on('click', function () {
		var formData = $('#edit-ticket-modal form').serializeObject();

		ticketPage.editTicket(
			Number(formData.id),
			formData.filter,
			formData.title,
			formData.description,
			Number(formData.assigned_to),
			formData.devices,
			Number(formData.problem_type)
		);

		$('#edit-ticket-modal').modal('hide');
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

	$('.ticket-edit-button').on('click', function() {
		ticketPage.populateTicketModal($('#edit-ticket-modal'), ticketPage.currentTicket);
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

	$(document).on('click', '.add-hardware-device', function() {
		var $inputField       = $(this).closest('.form-group').find('input'),
			successfullyAdded = ticketPage.appendHardwareDevice($(this).closest('.form-group').find('.hardware-list'), $inputField.val(), $(this).closest('card').data('cardid'));

		if (successfullyAdded) {
			$inputField.val('');
		} else {
			alert('Already exists or can\'t find device in system with serial number');
		}
	});

	$(document).on('click', '.remove-hardware-device', function() {
		$(this).closest('li').fadeOut(200, function() {
			$(this).remove();
		});
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

			$addExistingTicket.append('<option value="' + ticket.id + '">' + '#' + ticket.id + ' ' + ticket.title.substring(0, 17) + '...</option>');
		}

		$addExistingTicket.selectpicker('refresh');
	});

	$('#create-follow-up-call').on('click', function() {
		var formData 		  = $('#follow-up-call-modal form').serializeObject(),
			formDataTickets   = formData.tickets,
			existingTicketIds = [];

		for (var cardId in formDataTickets) {
			var card = formDataTickets[cardId];

			if (card.hasOwnProperty('id')) {
				existingTicketIds.push(Number(card.id));
				delete formDataTickets[cardId];
			}
		}

		ticketPage.createCall(formData.date_of_call, formData.caller, formDataTickets, existingTicketIds);

		$('#follow-up-call-modal').modal('hide');
	});

	$('#new-staff-modal, #new-ticket-modal, #follow-up-call-modal').on('show.bs.modal', function () {
		ticketPage.populateSelectField($(this).find('select[name="caller"]'), 'Choose a caller...', makeItAll.staffManager.staff);
	});

	$('#new-ticket-modal, #follow-up-call-modal').on('show.bs.modal', function() {
		ticketPage.populateSelectField($(this).find('select[name*=assigned_to]'), 'Choose an operator...', makeItAll.staffManager.getEmployeesWithPermission('operator', true));

		$(this).find('.staff-information').text('No staff member has been selected yet!');
		$(this).find('#accordion .card .type-columns').empty();

		problemTypePage.loadSubProblemTypes($(this).find('.type-columns'));
	});

	$('#single-view [data-action="edit"]').on('click', function() {
		var $editTicketModal = $('#edit-ticket-modal');

		ticketPage.populateTicketModal($editTicketModal, ticketPage.currentTicket);
		ticketPage.populateSelectField($editTicketModal.find('select[name*=assigned_to]'), 'Choose an operator...', makeItAll.staffManager.getEmployeesWithPermission('operator', true), ticketPage.currentTicket._assigned_to);

		problemTypePage.loadProblemType($editTicketModal.find('.type-columns'), ticketPage.currentTicket._problem_type);
	});

	$('#new-ticket-modal, #follow-up-call-modal').on('show.bs.modal', function() {
		$(this).find('.staff-information').text('No staff member has been selected yet!');
	});

	$(document).on('click', '.type-column li', function() {
		var problemTypeId = Number($(this).data('problemTypeId'));

		problemTypePage.loadSubProblemTypes($(this).closest('.type-columns'), $(this), problemTypeId);

		$(this).closest('.problem-type-picker').siblings('input[name*=problem_type]').val(problemTypeId);
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
});