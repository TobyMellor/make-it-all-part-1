$(function () {
	$('[data-toggle="tooltip"]').tooltip();

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
				case 'staff[permissions][ticket_read_only]':
					$("input[name*=ticket_read_only]").prop('checked', false);
				case 'staff[permissions][helpdesk_operator]':
					$("input[name*=helpdesk_operator]").prop('checked', false);
				case 'staff[permissions][analyst]':
					$("input[name*=analyst]").prop('checked', false);
				case 'staff[permissions][super_admin]':
					$("input[name*=super_admin]").prop('checked', false);
			}
		} else {
			switch (fieldName) {
				case 'staff[permissions][super_admin]':
					$("input[name*=super_admin]").prop('checked', true);
				case 'staff[permissions][analyst]':
					$("input[name*=analyst]").prop('checked', true);
				case 'staff[permissions][helpdesk_operator]':
					$("input[name*=helpdesk_operator]").prop('checked', true);
				case 'staff[permissions][ticket_read_only]':
					$("input[name*=ticket_read_only]").prop('checked', true);
			}
		}
	});

	$('.staff-picker').selectpicker({
		noneResultsText: 'Click to create {0}'
	});

	$('.selectpicker').not('.staff-picker').selectpicker();

	$('.timepicker').datetimepicker();

	$(document).on('click', 'li.no-results', function() {
		var $newStaffName  = $('.bs-searchbox input').val(),
			firstName      = $newStaffName.split(" ")[0],
			lastName       = $newStaffName.split(firstName + " ")[1],
			$newStaffModal = $('#new-staff-modal');

		$newStaffModal.find('input[name="staff[first_name]"]').val(firstName);
		$newStaffModal.find('input[name="staff[last_name]"]').val(lastName);

		$newStaffModal.find('input[name="event_target"]').val($(this).closest('.bootstrap-select').find('select').attr('name')); // when the staff member is created, this is the input field it'll update

		$newStaffModal.modal('show');
	});

	$('#new-staff-modal, #new-ticket-modal, #follow-up-call-modal').on('show.bs.modal', function () {
		$(this).find('input, textarea')
			   .not('.no-clear-on-show')
			   .val('');

		$(this).find('#accordion .card:not(:first-child)').remove();

		var flooredCurrentTime = new Date();

		flooredCurrentTime.setMilliseconds(Math.round(flooredCurrentTime.getMilliseconds() / 1000) * 1000);
		flooredCurrentTime.setSeconds(Math.round(flooredCurrentTime.getSeconds() / 60) * 60);
		flooredCurrentTime.setMinutes(Math.floor(flooredCurrentTime.getMinutes() / 15) * 15);

		$(this).find('.timepicker').val((flooredCurrentTime.getMonth() + 1) + '/' + flooredCurrentTime.getDate() + '/' + flooredCurrentTime.getFullYear() + ' ' + flooredCurrentTime.getHours() + ':' + flooredCurrentTime.getMinutes()); // set time to last 15 minute interval e.g. 10:34 -> 10:30, 10:55 -> 10:45
	});

	$(document).on('click', '#accordion .card .card-header .view-accordion', function() {
		$(this).siblings('a[data-toggle="collapse"]').click();
	});

	$(document).on('click', '#accordion .card .card-header .remove-accordion', function() {
		$(this).closest('.card').fadeOut(200, function() {
			$(this).remove();
		});
	});

	$(document).on('hide.bs.collapse', '#accordion .collapse', function () {
		$(this).siblings('.card-header').find('.view-accordion').removeClass('fa-eye-slash').addClass('fa-eye');
	});

	$(document).on('show.bs.collapse', '#accordion .collapse', function () {
		$(this).siblings('.card-header').find('.view-accordion').removeClass('fa-eye').addClass('fa-eye-slash');
	});
});

// https://stackoverflow.com/a/8407771/2957677
// Modified by /1549818 to support dot notation
(function($){
    $.fn.serializeObject = function(){
        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:[\[\.](?:\d*|[a-zA-Z0-9_]+)[\]]?)*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };

        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){
            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if(k.match(patterns.push)){
                    merge = self.build({}, self.push_counter(reverse_key), merge);
                }

                // fixed
                else if(k.match(patterns.fixed)){
                    merge = self.build({}, k, merge);
                }

                // named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);

function addItemToPicker(pickerElement, itemValue, itemName) {
	$('.selectpicker.staff-picker').append('<option val="' + itemValue + '">' + itemName + '</option>');
	$('.selectpicker.staff-picker').selectpicker('refresh'); 

	if (pickerElement.length !== 0) {
		pickerElement.selectpicker('val', itemName);
	}
}

/**
 * Resolve a dot notation path string through an object
 * From https://stackoverflow.com/a/22129960/1549818
 */
Object.resolve = function(path, obj) {
	return path.split('.').reduce(function(prev, curr) {
		return prev ? prev[curr] : undefined
	}, obj || self)
}

/**
 * MakeItAll
 *
 * Responsible for managing the managers.
 * Managers hold the important data, and this links
 * all of the important data to one place. Accessible everywhere.
 *
 * If you wish to use data from one part of the application,
 * instantiate a new manager
 * e.g. makeItAll.ticketManager = new TicketManager()
 */
class MakeItAll {
	constructor() {
		this.ticketManager   = null;
		this.staffManager    = null;
		this.hardwareManager = null;
		this.softwareManager = null;
	}
}