$(function () {
	$('[data-toggle="tooltip"]').tooltip();

	$('.timepicker').datetimepicker();

	// Create new employee when searching for non-existent assignee
	$(document).on('click', 'li.no-results', function(e) {
		var newValue = $(this).closest(".dropdown-menu.open").children(".bs-searchbox").children("input").val(),
		    $modal   = $('#new-staff-modal');

		$modal.find('input[name="staff.name"]').val(newValue);
		$modal.find('input[name="event_target"]').val($(this).closest('.bootstrap-select').find('select').attr('name')); // when the staff member is created, this is the input field it'll update

		$modal.modal('show');
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

	$(document).on('hide.bs.collapse show.bs.collapse', '#accordion .collapse', function(e) {
		let isShow = e.type.split(".")[0] === "show";
		$(this).siblings('.card-header').find('.view-accordion').toggleClass('fa-chevron-up', !isShow).toggleClass('fa-chevron-down', isShow);
	});

	$('.search-field input').val('');
});

function addItemToPicker(pickerElement, value, name) {
	$(pickerElement).append(new Option(name, value)).selectpicker('refresh').selectpicker('val', name);
}

var validationTimeout = null;

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

		if (shouldValidate) {
			$('.invalid-feedback').remove();
			$('.is-valid, .is-invalid, .card-header.red-highlight, .card-header.green-highlight').removeClass('is-valid is-invalid red-highlight green-highlight');
		
			clearTimeout(validationTimeout);
			validationTimeout = setTimeout(function() {
				$('.is-valid, .is-invalid, .card-header.red-highlight, .card-header.green-highlight').removeClass('is-valid is-invalid red-highlight green-highlight');
				$('.invalid-feedback').fadeOut(250, function() {
					$(this).remove();
				});
			}, 15000);
		}

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
			$(this).find('.card:not(.existing) .is-valid').closest('.card').find('.card-header').addClass('green-highlight'); // highlight all cards green first
			$(this).find('.card:not(.existing) .is-invalid').closest('.card').find('.card-header').removeClass('green-highlight').addClass('red-highlight'); // highlight any cards with errors in them
			
			// open accordion with error
			if ($(this).find('.view-accordion.fa-chevron-down').first().closest('.card-header.green-highlight').length === 1) {
				$(this).find('.card-header.red-highlight .view-accordion').click();
			}
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
					if (value === null || value === '') {
						validationRules = []; // break out of for
					}

					break;
				case "required":
					if (value === null || value === '') {
						failedRules.push('This field is required.'); validationRules = []; // break out of for
					}

					break;
				case "integer":
					if (value.length > 0 && (isNaN(parseInt(value)) || !isFinite(value))) {
						failedRules.push('This field must be an whole number.');
					}

					break;
				case (rule.match(/max:/) || {}).input:
					if (value.length > 0 && value.length > Number(rule.split(':')[1])) {
						failedRules.push('This field must have less than ' + (Number(rule.split(':')[1]) + 1) + ' characters.');
					}

					break;
				case (rule.match(/min:/) || {}).input:
					if (value.length < Number(rule.split(':')[1])) {
						failedRules.push('This field must have at least ' + rule.split(':')[1] + ' characters.');
					}

					break;
				case (rule.match(/in:/) || {}).input:
					if (value.length > 0 && (rule.split(':')[1].split(',').indexOf(value) === -1)) {
						failedRules.push('This field must contain one of the following: ' + rule.split(':')[1].split(',') + '.');
					}

					break;
				case (rule.match(/not:/) || {}).input:
					if (value === rule.split(':')[1].split(/'/)[1]) {
						failedRules.push('This field has an invalid value.');
					}

					break;
				case (rule.match(/requires:/) || {}).input:
					if ($this.closest('form').find('input[name="' + rule.split(':')[1] + '"]').val() === '') {
						failedRules.push('This field is required.');
					}

					break;
				case "email":
					if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
						failedRules.push('This field must be an email.');
					}

					break;
				case "phone":
					if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value.replace(' ', ''))) {
						failedRules.push('This field must be a phone number.');
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

		if (failedRules.length > 0) {
			$this.addClass('is-invalid');

			if (!$this.parent().is('.assigned-to-options')) {
				var $invalidFeedback = $('<div class="invalid-feedback">');

				for (var i = 0; i < failedRules.length; i++) {
					$invalidFeedback.append(failedRules[i] + (i >= 1 ? '<br />' : ''));
				}

				$this.closest('.form-group').append($invalidFeedback);
			}

			return false;
		}
		
		$this.addClass('is-valid');

		return true;
	};
})(jQuery);

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
		this.ticketManager      = null;
		this.staffManager       = null;
		this.problemTypeManager = null;
		this.hardwareManager    = null;
		this.softwareManager    = null;
	}
}
