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

		var input     = $(this).find('input'),
			fieldName = input.attr('name'),
			isChecked = input.prop('checked');

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
});