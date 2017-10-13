$(function () {
	$('[data-toggle="tooltip"]').tooltip();

	$('[data-toggle="tooltip"] > .nested-list').hover(function() {
		$(this).parent().tooltip('disable');
	}, function() {
		$(this).parent().tooltip('enable');
	});

	// TODO: Move to assets/js/pages/staff/x.js (george)
	$('#new-staff-modal').on('shown.bs.modal', function () {
		// When the staff modal is shown
		// focus input field, clear input fields etc...
	});

	// TODO: Move to assets/js/pages/staff/x.js (george)
	$('.staff-permissions .custom-checkbox').on('click', function(e) {
		e.preventDefault();

		var $input    = $(this).find('input'),
			fieldName = $input.attr('name'),
			isChecked = $input.prop('checked');

		if (isChecked) {
			switch (fieldName) {
				case 'ticket[staff][permissions][ticket_read_only]':
					$("input[name*=ticket_read_only]").prop('checked', false);
				case 'ticket[staff][permissions][helpdesk_operator]':
					$("input[name*=helpdesk_operator]").prop('checked', false);
				case 'ticket[staff][permissions][analyst]':
					$("input[name*=analyst]").prop('checked', false);
				case 'ticket[staff][permissions][super_admin]':
					$("input[name*=super_admin]").prop('checked', false);
			}
		} else {
			switch (fieldName) {
				case 'ticket[staff][permissions][super_admin]':
					$("input[name*=super_admin]").prop('checked', true);
				case 'ticket[staff][permissions][analyst]':
					$("input[name*=analyst]").prop('checked', true);
				case 'ticket[staff][permissions][helpdesk_operator]':
					$("input[name*=helpdesk_operator]").prop('checked', true);
				case 'ticket[staff][permissions][ticket_read_only]':
					$("input[name*=ticket_read_only]").prop('checked', true);
			}
		}
	});

	$('.selectpicker').selectpicker({
		noneResultsText: 'Click to create {0}'
	});

	$('.timepicker').datetimepicker();

	$(document).on('click', 'li.no-results', function() {
		var $newStaffName  = $('.bs-searchbox input').val(),
			firstName      = $newStaffName.split(" ")[0],
			lastName       = $newStaffName.split(firstName + " ")[1],
			$newStaffModal = $('#new-staff-modal');

		$newStaffModal.find('input[name="ticket[staff][first_name]"]').val(firstName);
		$newStaffModal.find('input[name="ticket[staff][last_name]"]').val(lastName);

		$newStaffModal.find('input[name="event_target"]').val($(this).closest('.bootstrap-select').find('select').attr('name')); // when the staff member is created, this is the input field it'll update

		$newStaffModal.modal('show');
	});

	$('#new-staff-modal #create-new-staff').on('click', function(e) {
		e.preventDefault();

		var formData = parseFormData($('#new-staff-modal form'));

		// validate staff member here

		// if validation passes:
		//  - create staff member here /w AJAX
		//  - retrieve new database ID and replace Math.random function below
		//  - do following:
		var staffId = Math.floor(Math.random() * (10000 + 1));

		addItemToPicker(
			$('.selectpicker.staff-picker[name="' + formData['event_target'] + '"]'),
			staffId,
			formData['ticket[staff][first_name]'] + ' ' + formData['ticket[staff][last_name]']
		); // formData and staffId to be retrieved by AJAX call

		$('#new-staff-modal').modal('hide');
	});

	$('#new-staff-modal, #new-ticket-modal').on('show.bs.modal', function (e) {
		$(this).find('input, textarea')
			   .not('.no-clear-on-show')
			   .val('');

		var flooredCurrentTime = new Date();

	    flooredCurrentTime.setMilliseconds(Math.round(flooredCurrentTime.getMilliseconds() / 1000) * 1000);
	    flooredCurrentTime.setSeconds(Math.round(flooredCurrentTime.getSeconds() / 60) * 60);
	    flooredCurrentTime.setMinutes(Math.floor(flooredCurrentTime.getMinutes() / 15) * 15);

		$(this).find('.timepicker').val((flooredCurrentTime.getMonth() + 1) + '/' + flooredCurrentTime.getDate() + '/' + flooredCurrentTime.getFullYear() + ' ' + flooredCurrentTime.getHours() + ':' + flooredCurrentTime.getMinutes()); // set time to last 15 minute interval e.g. 10:34 -> 10:30, 10:55 -> 10:45
	});
});

function parseFormData(form) {
	return form.serializeArray().reduce(function(obj, item) {
		obj[item.name] = item.value;

		return obj;
	}, {});
}

function addItemToPicker(pickerElement, itemValue, itemName) {
	$('.selectpicker.staff-picker').append('<option val="' + itemValue + '">' + itemName + '</option>');
	$('.selectpicker.staff-picker').selectpicker('refresh'); 

	if (pickerElement.length !== 0) {
		pickerElement.selectpicker('val', itemName);
	}
}

class MakeItAll {
	constructor() {
		this.filters = {};
		this.events = {};

		// TODO: Get staff from George's part
		this.staff = {
			0: {
				first_name: 'Toby',
				last_name: 'Mellor',
				email: 'tobymulberry@hotmail.com',
				permission_level: 4, // super admin
			},
			1: {
				first_name: 'Example',
				last_name: 'User',
				email: 'example@domain.com',
				permission_level: 3 // analyst
			}
		};
	}

	getStaff(staffId) {
		return this.staff[staffId];
	}

	getEvent(eventId) {
		return this.events[eventId];
	}

	getFilter(filterSlug) {
		return this.filters[filterSlug];
	}

	getTickets(filterSlug) {
		if (this.filters.hasOwnProperty(filterSlug)) {
			return this.filters[filterSlug];
		}
		
		return null;
	}

	getTicket(ticketId) {
		for (var filterSlug in this.filters) {
			var filteredTickets = this.filters[filterSlug].tickets;

			for (var index in filteredTickets) {
				var ticket = filteredTickets[index];

				if (ticket.id === ticketId) {
					return ticket;
				}
			}
		}

		return null;
	}
}

var makeItAll = new MakeItAll;