/**
 * TicketPage
 *
 * Manipulates the tickets page /w JQuery using data from
 * the TicketManager.
 */

class TicketPage extends DynamicPage {
	constructor() {
		super();

		this.currentlyShowing = null;
		this.currentTicket    = null;
	}

	showFilteredTickets(filterSlugs) {
		var filters = [],
			filteredTickets = [];

		if (filterSlugs.indexOf('assigned_to') > -1) {
			filteredTickets = makeItAll.ticketManager.getMyTickets();
		} else {
			filters         = makeItAll.ticketManager.getFilters(filterSlugs.split(','));
			filteredTickets = [].concat(...filters.map(filter => filter.tickets));
		}

		if (filters !== null) {
			this.clearTable();

			for (var i = 0; i < filteredTickets.length; i++) {
				var ticket = filteredTickets[i];

				this.appendTableRow({
					id: ticket.id,
					title: ticket.title,
					filter_name: '<span class="filter filter-' + ticket.filter.slug.split('_')[0] + '">' + ticket.filter.name + '</span>',
					created_at: ticket.created_at,
					updated_at: ticket.updated_at
				});
			}

			this.updateSplashScreen();

			this.currentlyShowing = filterSlugs;
		}

		this.hideTableRowDetails();
		this.currentTicket = null;
	}

	showTicketView(ticketId) {
		var ticket = makeItAll.ticketManager.getTicket(ticketId);

		if (ticket !== null) {
			this.currentTicket = ticket;

			this.updateSingleViewNavbar(ticket.title + '<span class="filter filter-' + ticket.filter.slug.split('_')[0] + '">' + ticket.filter.name + '</span>');

			$('#ticket-view #ticket-overview').text('#' + ticket.id + ' | ' + ticket.created_at);
			$('#ticket-view #ticket-description p').text(ticket.description);
			$('#ticket-view #ticket-operating-system').text(ticket.operating_system);

			var $ticketComments           = $('#ticket-comments'),
				$ticketHardwareSoftware   = $('#ticket-view #hardware-software-table'),
				$ticketNoHardwareSoftware = $('#ticket-view #no-hardware-software'),
				$ticketCallHistoryBody    = $('#ticket-view #call-history-table tbody'),
				affectedItems	          = ticket.devices.concat(ticket.programs),
				calls                     = ticket.calls;

			if (affectedItems.length === 0) {
				$ticketHardwareSoftware.hide();
				$ticketNoHardwareSoftware.show();
			} else {
				$ticketHardwareSoftware.show();
				$ticketNoHardwareSoftware.hide();
				
				var $ticketHardwareSoftwareBody = $ticketHardwareSoftware.find('tbody');

				$ticketHardwareSoftwareBody.html('');

				for (var i = 0; i < affectedItems.length; i++) {
					var affectedItem = affectedItems[i];

					$ticketHardwareSoftwareBody.append(
						'<tr data-rowid="' + affectedItem.id + '">' +
							'<td class="truncate">' + affectedItem.name + '</td>' +
							'<td class="truncate">' + (affectedItem.serial_number || '—') + '</td>' +
							'<td class="truncate">' + (affectedItem.hasOwnProperty('serial_number') ? 'Hardware' : 'Software') + '</td>' +
							'<td>' +
								'<i class="fa fa-eye"></i>' +
							'</td>' +
						'</tr>'
					); // TODO: href to show on hardware page
				}
			}

			$ticketCallHistoryBody.html('');

			for (var i = 0; i < calls.length; i++) {
				var call = calls[i];

				$ticketCallHistoryBody.append(
					'<tr data-rowid="' + call.id + '">' +
						'<td>' + call.id + '</td>' +
						'<td>' + call.caller.name + '</td>' +
						'<td>' + call.date_of_call + '</td>' +
						'<td>' +
							'<i class="fa fa-eye"></i>' +
						'</td>' +
					'</tr>'
				);
			}

			if (ticket.events.length === 0) {
				$ticketComments.text('No comments have been left yet!');
			} else {
				$ticketComments.text('');
			}

			for (var index in ticket.events) {
				var event = ticket.events[index];

				if (event.type === 'comment') {
					$ticketComments.append(
						'<li class="media">' +
							'<img class="d-flex mr-3" src="images/portraits/portrait-1.jpg" alt="Portrait 1">' +
							'<div class="media-body">' +
								'<h5 class="mt-0 mb-1">' +
									event.author.name + ' <span class="ticket-comment-date">' + event.created_at + '</span>' +
								'</h5>' +
								'<div class="breaker"></div>' +
								event.content +
							'</div>' +
						'</li>'
					);
				} else {
					$ticketComments.append(
						'<li class="ticket-event">' +
							'<i class="fa fa-ticket"></i>' +
							' Status Changed: ' +
							'<span class="ticket-event-details">' + event.content + '</span>' +
							'<span class="ticket-event-date">' + event.created_at + '</span>' +
						'</li>'
					);
				}
			}

			this.showTableRowDetails(ticket.id);
		}
	}

	showCallTicket(ticketId) {
		var ticket = makeItAll.ticketManager.getTicket(ticketId);

		$('#view-call-history-modal').modal('hide');

		this.refreshPage(ticket.filter.slug, ticketId);
	}

	appendAffectedItems($affectedItems, ticket, cardId) {
		for (var i = 0; i < ticket.devices.length; i++) {
			var device = ticket.devices[i];

			this.appendHardwareDevice($affectedItems, device.serial_number, cardId);
		}

		for (var i = 0; i < ticket.programs.length; i++) {
			var program = ticket.programs[i];

			this.appendSoftwareProgram($affectedItems, program.id, cardId);
		}
	}

	appendHardwareDevice($affectedItems, serialNumber, cardId) {
		var device = makeItAll.hardwareManager.getDevice(serialNumber);

		$affectedItems.append(
			' <li serial_number="' + device.serial_number + '"">' +
				'<input type="text" name="tickets[' + cardId + '].devices" value="' + device.id + '" hidden />' +
				'<h4>' + device.name + '</h4>' +
				'<p>(Hardware)</p>' +
				'<a class="btn btn-danger remove-affected-item" href="javascript: void(0);">' +
					'<i class="fa fa-laptop"></i> ' +
					'Remove' +
				'</a>' +
			'</li>'
		);
	}

	appendSoftwareProgram($affectedItems, programId, cardId) {
		var program = makeItAll.softwareManager.getProgram(programId);

		$affectedItems.append(
			' <li program-id="' + programId + '"">' +
				'<input type="text" name="tickets[' + cardId + '].programs" value="' + program.id + '" hidden />' +
				'<h4>' + program.name + '</h4>' +
				'<p>(Software)</p>' +
				'<a class="btn btn-danger remove-affected-item" href="javascript: void(0);">' +
					'<i class="fa fa-file-code-o"></i> ' +
					'Remove' +
				'</a>' +
			'</li>'
		);
	}

	showCallTicketsModal(callId) {
		var call             = makeItAll.ticketManager.getCall(callId),
			callTickets      = call.tickets,
			$callHistory     = $('#view-call-history-modal'),
			$callTicketTable = $callHistory.find('#call-tickets-table tbody');

		$callHistory.find('#call-id').text(call.id);
		$callHistory.find('#call-caller').text(call.caller.name);
		$callHistory.find('#call-date').text(call.date_of_call);

		$callTicketTable.html('');

		for (var i = 0; i < callTickets.length; i++) {
			var ticket = callTickets[i];

			$callTicketTable.append(
				'<tr data-rowid="' + ticket.id + '" ' + (ticket.id === this.currentTicket.id ? 'class="highlight"' : '') + '>' +
					'<td>' + ticket.id + '</td>' +
					'<td>' + ticket.title + '</td>' +
					'<td>' +
						'<span class="filter filter-' + ticket.filter.slug.split('_')[0] + '">' + ticket.filter.name + '</span>' +
					'</td>' +
					'<td>' + ticket.created_at + '</td>' +
					'<td>' +
						'<i class="fa fa-eye"></i>' +
					'</td>' +
				'</tr>'
			);
		}

		$callHistory.modal('show');
	}

	refreshPage(filterSlug, ticketId = null) {
		$('.side-nav-bar-nested ul li.active').removeClass('active');
		$('.side-nav-bar-nested ul li[data-slug="' + filterSlug + '"]').addClass('active');

		this.showFilteredTickets(filterSlug);
		this.showTicketView(ticketId);
	}

	populateTicketModal($modal, ticket, cardId = null) {
		for (var key in ticket) {
			var value = ticket[key];

			if (key === '_filter') {
				key   = 'filter';
				value = ticket.filter.name;
			} else if (key === '_assigned_to') {
				key   = 'assigned_to';
				value = ticket.assigned_to.name;
			} else if (key === '_problem_type') {
				key = 'problem_type';
				value = problemTypePage.getProblemTypeBreadcrum(ticket.problem_type);
			}
			
			$modal.find('input[name*="' + key + '"], textarea[name*="' + key + '"]').val(value);
		}

		this.appendAffectedItems($modal.find('.affected-items'), ticket, cardId);
	}

	appendNewComment($commentBox) {
		var event = makeItAll.ticketManager.createEvent(
				ticketPage.currentTicket.id,
				makeItAll.staffManager.currentUser(),
				'comment',
				$commentBox.val(),
				'Just Now'
			);

		$commentBox.val('');

		this.showTicketView(ticketPage.currentTicket.id); // refresh to get new comment
	}

	createCall(dateOfCall, caller, tickets, existingTicketIds = []) {
		makeItAll.ticketManager.createCall(dateOfCall, caller, tickets, existingTicketIds);

		this.refreshPage(this.currentTicket.filter.slug, this.currentTicket.id);
	}

	editTicket(id, filter, title, description, assigned_to, devices, problem_type) {
		makeItAll.ticketManager.editTicket(
			id,
			filter,
			title,
			description,
			assigned_to,
			devices,
			problem_type
		);

		ticketPage.refreshPage(filter, id);
	}

	addNewAccordionCard($accordion) {
		var cardId = Math.floor(Math.random() * (10000 + 1));

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
									'<select class="selectpicker" name="tickets[' + cardId + '].filter">' +
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
									'<select class="selectpicker staff-picker" data-live-search="true" data-live-search-placeholder="Search operators..." name="tickets[' + cardId + '].assigned_to"></select>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="form-group">' +
							'<label class="required">Ticket Title</label>' +
							'<input class="form-control" name="tickets[' + cardId + '].title" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label class="required">Ticket Description</label>' +
							'<textarea class="form-control" name="tickets[' + cardId + '].description"></textarea>' +
						'</div>' +
						'<div class="form-group">' +
							'<label>Serial Number of Hardware Affected</label>' +
							'<div class="input-group">' +
								'<input class="form-control" name="tickets[' + cardId + '].hardware.serial_number" />' +
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
							'<input name="tickets[' + cardId + '].problem_type" hidden>' +
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
	}

	addExistingAccordionCard($accordion, ticketId) {
		var ticket = makeItAll.ticketManager.getTicket(ticketId),
			cardId = Math.floor(Math.random() * (10000 + 1));

		$accordion.append(
			'<div class="card existing" data-cardid="' + cardId + '">' +
				'<input type="text" name="tickets[' + cardId + '].id" value="' + ticketId + '" hidden />' +
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

	showStaffInformation($staffInformation, employeeId) {
		var employee = makeItAll.staffManager.getEmployee(employeeId);

		$staffInformation.html(
			'<p>ID Number: <strong>' + employee.id + '</strong></p>' +
			'<p>Name: <strong>' + employee.name + '</strong></p>' +
			'<p>Job: <strong>' + employee.job + '</strong></p>' +
			'<p>Department: <strong>' + employee.department + '</strong></p>' +
			'<p>Phone: <strong>' + employee.phone + '</strong></p>' +
			'<p><strong></strong></p>'
		);

		staffPage.showPermissions($staffInformation.find('p:last-child strong').get(0), employee);
	}

	search(query) {
		if (query.length >= 2 || query == parseInt(query)) {
			var searchKeys = ['id', 'title'],
				tickets    = makeItAll.ticketManager.search(query, searchKeys);

			super.search(query, tickets, function(ticket) {
				return {
					id: ticket.id,
					title: ticket.title,
					filter_name: '<span class="filter filter-' + ticket.filter.slug.split('_')[0] + '">' + ticket.filter.name + '</span>',
					created_at: ticket.created_at,
					updated_at: ticket.updated_at
				}
			}, searchKeys);
		} else {
			this.showFilteredTickets($('.side-nav-bar-nested li.active').data('slug'));
		}
	}
}