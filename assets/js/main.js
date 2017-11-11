$(function () {
	$('[data-toggle="tooltip"]').tooltip();

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

		var currentTime = new Date();

		$(this).find('.timepicker').val(('0' + (currentTime.getMonth() + 1)).slice(-2) + '/' + ('0' + currentTime.getDate()).slice(-2) + '/' + currentTime.getFullYear() + ' ' + ('0' + currentTime.getHours()).slice(-2) + ':' + ('0' + currentTime.getMinutes()).slice(-2));
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
		$(this).siblings('.card-header').find('.view-accordion').removeClass('fa-chevron-down').addClass('fa-chevron-up');
	});

	$(document).on('show.bs.collapse', '#accordion .collapse', function () {
		$(this).siblings('.card-header').find('.view-accordion').removeClass('fa-chevron-up').addClass('fa-chevron-down');
	});

	$('.search-field input').val('');
});

// https://stackoverflow.com/a/8407771/2957677
// Modified by /1549818 to support dot notation
(function($){
    $.fn.serializeObject = function(shouldValidate = false) {
        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:[\[\.](?:\d*|[a-zA-Z0-9_]+)[\]]?)*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            },
            isValid = true,
            $fields = $(this).find('input, select, textarea');

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

        $fields.not(':disabled').map(function() {
            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name,
                validation_rules = this.attributes.hasOwnProperty('validation') ? this.attributes.validation.value : null;

            if (shouldValidate && validation_rules !== null) {
            	var response = $(this).validate();

            	if (isValid) {
            		isValid = response;
            	}
            }

            while((k = keys.pop()) !== undefined){

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if(k.match(patterns.push)){
                    merge = self.build({}, self.push_counter(reverse_key), merge);
                }

                // fixed or named
                else if(k.match(patterns.fixed) || k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        json.isValid = function() {
        	return isValid;
        };

        if (shouldValidate) {
	    	setTimeout(function() {
	    		$fields.siblings().addBack().removeClass('is-valid is-invalid');
	    		$fields.siblings('.invalid-feedback').fadeOut(500, function() {
	    			$(this).remove();
	    		});
	    	}, 15000);
        }

        return json;
    };

    $.fn.validate = function() {
    	var $this           = $(this),
    		value           = $this.val(),
    		validationRules = $this.attr('validation').split('|'),
    		failedRules     = [];

    	for (let i = 0; i < validationRules.length; i++) {
    		var rule = validationRules[i];

    		switch (rule) {
    			case "nullable":
    				console.log("NULLABLE: " + !(value === null || value === ''));
    				if (value === null || value === '') {
    					validationRules = []; // break out of for
    				}

    				break;
    			case "required":
    				console.log("REQUIRED: " + !(value === null || value === ''));
    				if (value === null || value === '') {
    					failedRules.push('This field is required.'); validationRules = []; // break out of for
    				}

    				break;
    			case "integer":
    				console.log("INTEGER: " + !(isNaN(parseInt(value)) || !isFinite(value)));
    				if (value.length > 0 && (isNaN(parseInt(value)) || !isFinite(value))) {
    					failedRules.push('This field must be an whole number.');
    				}

    				break;
    			case (rule.match(/max:/) || {}).input:
    				console.log("MAX: " + !(value.length > Number(rule.split(':')[1])));
    				if (value.length > 0 && value.length > Number(rule.split(':')[1])) {
    					failedRules.push('This field must have less than ' + (Number(rule.split(':')[1]) + 1) + ' characters.');
    				}

    				break;
    			case (rule.match(/min:/) || {}).input:
    				console.log("MIN: " + !(value.length < Number(rule.split(':')[1])));
    				if (value.length < Number(rule.split(':')[1])) {
    					failedRules.push('This field must have at least ' + rule.split(':')[1] + ' characters.');
    				}

    				break;
    			case (rule.match(/in:/) || {}).input:
    				console.log("IN: " + !(rule.split(':')[1].split(',').indexOf(value) === -1));
    				if (value.length > 0 && (rule.split(':')[1].split(',').indexOf(value) === -1)) {
    					failedRules.push('This field must contain one of the following: ' + rule.split(':')[1].split(',') + '.');
    				}

    				break;
    			case (rule.match(/not:/) || {}).input:
    				console.log("NOT: " + (!(value === rule.split(':')[0].split(/'/)[1])));
    				if (value === rule.split(':')[1].split(/'/)[1]) {
    					failedRules.push('This field has an invalid value.');
    				}

    				break;
    		}
    	}

		if ($this.is('select')) { // style support for bootstrap-select
			if ($this.hasClass('add-hardware-device')) {
				if ($this.closest('.affected-items-section').find('.affected-items').find('li[data-type="hardware"]').length === 0) {
					failedRules.push('Add at least one hardware device.');
				}
			}

			$this = $this.siblings('button.dropdown-toggle');
		}

		$this.siblings('.invalid-feedback').remove();

    	if (failedRules.length > 0) {
    		$this.removeClass('is-valid').addClass('is-invalid');

    		if (!$(this).parent().is('.assigned-to-options')) {
	    		var $invalidFeedback = $('<div class="invalid-feedback">');

	    		for (var i = 0; i < failedRules.length; i++) {
	    			$invalidFeedback.append(failedRules[i] + (i >= 1 ? '<br />' : ''));
	    		}

	    		$invalidFeedback.insertAfter($this);
	    	}

    		return false;
    	}
    	
    	$this.removeClass('is-invalid').addClass('is-valid');

    	return true;
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
		return prev ? prev[curr] : undefined;
	}, obj || self);
};

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