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
		e.preventDefault();

		var formData = $('#new-ticket-modal form').serializeObject(),
			call     = makeItAll.ticketManager.createCall(formData.date_of_call, formData.caller, formData.tickets);

		ticketPage.refreshPage(call.tickets[0].filter.slug);

		$('#new-ticket-modal').modal('hide');
	});

	$('#edit-ticket-modal #edit-existing-ticket').on('click', function () {
		var formData = $('#edit-ticket-modal form').serializeObject();

		makeItAll.ticketManager.editTicket(
			parseInt(formData.id),
			formData.filter,
			formData.title,
			formData.description,
			parseInt(formData.assigned_to),
			formData.devices,
			parseInt(formData.problem_type)
		);

		ticketPage.refreshPage(formData.filter, parseInt(formData.id));

		$('#edit-ticket-modal').modal('hide');
	});

	$('#create-new-event').on('click', function(e) {
		e.preventDefault();

		ticketPage.appendNewComment($(this).parent().find('textarea'));
	});

	$(document).on('click', '#table-section .table tr:not(.highlight)', function() {
		ticketPage.showTicketView(parseInt(this.dataset.rowid));
	});

	$('.ticket-close-button').on('click', function() {
		ticketPage.hideTableRowDetails();
	});

	$('.ticket-edit-button').on('click', function() {
		ticketPage.populateTicketModal($('#edit-ticket-modal'), ticketPage.currentTicket);
	});

	$('.add-another-ticket').on('click', function() {
		var $accordion = $(this).closest('.modal-body').find('#accordion'),
			cardId     = Math.floor(Math.random() * (10000 + 1));

		$card = $(
			'<div class="card" data-cardid="' + cardId + '">' +
				'<div class="card-header" role="tab" id="heading-' + cardId + '">' +
					'<h5 class="mb-0">' +
						'<a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse-' + cardId + '">' +
							'New Ticket' +
						'</a>' +
						'<i class="fa fa-chevron-up view-accordion"></i>' +
						'<i class="fa fa-trash-o remove-accordion"></i>' +
					'</h5>' +
				'</div>' +
				'<div id="collapse-' + cardId + '" class="collapse" role="tabpanel">' +
					'<div class="card-block">' +
						'<div class="row">' +
							'<div class="col-md-6">' +
								'<div class="form-group">' +
									'<label class="required">Status</label>' +
									'<br />' +
									'<select class="selectpicker" name="tickets[' + cardId + '][filter]">' +
										'<option value="new">New</option>' +
										'<option value="pending_awaiting_staff">Pending - Awaiting Staff</option>' +
										'<option value="pending_in_progress">Pending - In Progress</option>' +
										'<option value="resolved">Resolved</option>' +
									'</select>' +
								'</div>' +
							'</div>' +
							'<div class="col-md-6">' +
								'<div class="form-group">' +
									'<label class="required">Assigned To</label>' +
									'<br />' +
									'<select class="selectpicker staff-picker" data-live-search="true" data-live-search-placeholder="Search operators..." name="tickets[' + cardId + '][assigned_to]"></select>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="form-group">' +
							'<label class="required">Ticket Title</label>' +
							'<input class="form-control" name="tickets[' + cardId + '][title]" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label class="required">Ticket Description</label>' +
							'<textarea class="form-control" name="tickets[' + cardId + '][description]"></textarea>' +
						'</div>' +
						'<div class="form-group">' +
							'<label>Serial Number of Hardware Affected</label>' +
							'<div class="input-group">' +
								'<input class="form-control" name="tickets[' + cardId + '][hardware][serial_number]" />' +
								'<span class="input-group-btn">' +
									'<button class="btn btn-success add-hardware-device" type="button">' +
										'<i class="fa fa-plus"></i> ' +
										'Add' +
									'</button>' +
								'</span>' +
							'</div>' +
							'<div class="row">' +
								'<div class="col-md-12">' +
									'<ul class="hardware-list"></ul>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="form-group">' +
							'<label class="required">Problem Type</label>' +
							'<input name="tickets[' + cardId + '][problem_type]" hidden>' +
							'<span class="subtle pull-right"></span>' +
							'<div class="problem-type-picker">' +
								'<div class="type-columns"></div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>'
		);

		$accordion.append($card);

		problemTypePage.loadSubProblemTypes($card.find('.type-columns'));

		ticketPage.populateSelectField($card.find('select[name*="assigned_to"]'), 'Choose an operator...', makeItAll.staffManager.getEmployeesWithPermission('operator', true));

		$card.find('.view-accordion').click();
		$('.selectpicker').selectpicker('refresh');
	});

	$('#add-existing-ticket').on('change', function() {
		if ($(this).val() !== "") {
			var $accordion = $('#follow-up-call-modal #accordion'),
				cardId     = Math.floor(Math.random() * (10000 + 1)),
				ticketId   = parseInt($(this).val()),
				ticket     = makeItAll.ticketManager.getTicket(ticketId);

			$accordion.append(
				'<div class="card existing" data-cardid="' + cardId + '">' +
					'<input type="text" name="tickets[' + cardId + '][id]" value="' + ticketId + '" hidden />' +
					'<div class="card-header" role="tab" id="heading-' + cardId + '">' +
						'<h5 class="mb-0">' +
							'<a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse-' + cardId + '">' +
								'Existing Ticket: ' + ticket.title +
							'</a>' +
							'<i class="fa fa-chevron-up view-accordion"></i>' +
							'<i class="fa fa-trash-o remove-accordion"></i>' +
						'</h5>' +
					'</div>' +
					'<div id="collapse-' + cardId + '" class="collapse" role="tabpanel">' +
						'<div class="card-block">' +
							'<div class="row">' +
								'<div class="col-md-6">' +
									'<div class="form-group">' +
										'<label>Status</label>' +
										'<br />' +
										'<input class="form-control" value="' + ticket.filter.name + '" disabled>' +
									'</div>' +
								'</div>' +
								'<div class="col-md-6">' +
									'<div class="form-group">' +
										'<label>Assigned To</label>' +
										'<br />' +
										'<input class="form-control" value="' + ticket.assigned_to.name + '" disabled>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="form-group">' +
								'<label>Ticket Title</label>' +
								'<input class="form-control" value="' + ticket.title + '" disabled>' +
							'</div>' +
							'<div class="form-group">' +
								'<label>Ticket Description</label>' +
								'<textarea class="form-control" disabled>' + ticket.description + '</textarea>' +
							'</div>' +
							'<div class="form-group">' +
								'<label>Serial Numbers of Hardware Affected</label>' +
								'<div class="row">' +
									'<div class="col-md-12">' +
										'<ul class="hardware-list"></ul>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="form-group">' +
								'<label>Problem Type</label>' + 
								'<input class="form-control" value="' + problemTypePage.getProblemTypeBreadcrum(ticket.problem_type) + '" disabled>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			);

			ticketPage.appendHardwareDevices($accordion.find('.card[data-cardid="' + cardId + '"] .hardware-list'), ticket, cardId);

			$(this).find('option[value="' + ticketId + '"]').remove();
			$(this).selectpicker('refresh');
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
		var callId = parseInt(this.dataset.rowid);
		
		ticketPage.showCallTicketsModal(callId);
	});

	$(document).on('click', '#view-call-history-modal #call-tickets-table tbody tr:not(.highlight)', function() {
		var ticketId = parseInt(this.dataset.rowid),
			ticket   = makeItAll.ticketManager.getTicket(ticketId);

		$('#view-call-history-modal').modal('hide');

		ticketPage.refreshPage(ticket.filter.slug, ticketId);
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
				existingTicketIds.push(parseInt(card.id));
				delete formDataTickets[cardId];
			}
		}

		makeItAll.ticketManager.createCall(formData.date_of_call, formData.caller, formDataTickets, existingTicketIds);

		ticketPage.refreshPage(ticketPage.currentTicket.filter.slug, ticketPage.currentTicket.id);

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
		var problemTypeId = parseInt($(this).data('problemTypeId'));

		problemTypePage.loadSubProblemTypes($(this).closest('.type-columns'), $(this), problemTypeId);

		$(this).closest('.problem-type-picker').siblings('input[name*=problem_type]').val(problemTypeId);
	});

	$('#new-ticket-modal select[name="caller"], #follow-up-call-modal select[name="caller"]').on('change', function() {
		var $staffInformation = $(this).closest('.modal').find('.staff-information'),
			employee          = makeItAll.staffManager.getEmployee(parseInt($(this).val()));

		$staffInformation.html(
			'<p>ID Number: <strong>' + employee.id + '</strong></p>' +
			'<p>Name: <strong>' + employee.name + '</strong></p>' +
			'<p>Job: <strong>' + employee.job + '</strong></p>' +
			'<p>Department: <strong>' + employee.department + '</strong></p>' +
			'<p>Phone: <strong>' + employee.phone + '</strong></p>' +
			'<p><strong>' + employee.phone + '</strong></p>'
		);

		staffPage.showPermissions($staffInformation.find('p:last-child strong').get(0), employee);
	});

	$('.search-field input').on('keyup', function() {
		var query = $(this).val();

		ticketPage.search(query);
	});


	$(document).on('click', '.create-problem-type', function() {
		var $parentProblemType  = $(this).closest('.type-column').prev().find('.active'),
			parentProblemTypeId = parseInt($parentProblemType.data('problemTypeId'));

		if ($parentProblemType.length === 0) {
			parentProblemTypeId = null;
		}

		problemTypePage.createProblemType($(this).parent().siblings('input').val(), parentProblemTypeId);
	});
});