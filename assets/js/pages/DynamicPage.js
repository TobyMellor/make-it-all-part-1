/**
 * DynamicPage
 *
 * Extended by every page, e.g. TicketPage.
 * Contains functions that are repeated often among
 * pages, such as updating tables or updating the
 * navbar
 */

class DynamicPage {
	constructor({
		sectionSelector = "#table-section",
		navSelector = "#table-section .top-nav",
		detailSelector = "#single-view"
	} = {}) {
		this.sectionSelector = sectionSelector;
		// Set navigation selector to first component of section selector with ‘-nav’ appended, otherwise default CSS selector
		this.navSelector = navSelector ? navSelector : (sectionSelector !== "#table-section" ? sectionSelector.split(" ")[0] + "-nav" : ".side-nav-bar-nested");
		this.detailSelector = detailSelector ? detailSelector : (sectionSelector !== "#table-section" ? sectionSelector.split(" ")[0] + "-detail" : null);
	}
	
	updateListViewNavbar(html) {
		$(this.sectionSelector).find('.top-nav.with-title .main-content-title').html(html);
	}

	updateSingleViewNavbar(html) {
		$(this.detailSelector).find('.top-nav .main-content-title').html(html);
	}

	/**
	 * Hides the "Loading..." splash screen if it's shown
	 * Determins whether the "No Results..." splash screen
	 * should be shown or not.
	 *
	 * You should call this function using "appendTable"
	 */
	updateSplashScreen() {
		if ($('.loading-splash-screen').is(':visible')) {
			$('.loading-splash-screen').fadeOut(200);

			var scope = this; // unable to access 'this' in closure

			setTimeout(function() {
				scope.updateSplashScreen();
			}, 201);
		} else {
			var resultsCount = $(this.sectionSelector).find('tbody tr').length,
				splashScreen = $('.splash-screen').not('.loading-splash-screen'),
				tableSection = $(this.sectionSelector);

			if (resultsCount > 0) {
				splashScreen.fadeOut(200, function() {
					tableSection.fadeIn(200);
				});
			} else {
				tableSection.fadeOut(200, function() {
					splashScreen.css('display', 'flex')
					   			.hide()
					   			.fadeIn(200); // fadeIn/Out doesn't support display: flex; so set it immediately
				});
			}
		}
	}

	/**
	 * Adds a row in the table body within #table-section
	 * using data from "object".
	 *
	 * The property names should correspond with the "slug"
	 * attribute in table header.
	 *
	 * NOTE: This assumes the object has an ID attribute. Include it
	 * even if you don't wish to show it.
	 *
	 * @param object - The data to append to the end of the table
	 * @param shouldDisplaySplashScreen - true you want the "loading"
	 * splashscreen on your page
	 */
	appendTableRow(object) {
		var tableSection = $(this.sectionSelector),
		    tableHead    = tableSection.find('table thead tr'),
		    tableBody    = tableSection.find('table tbody'),
		    newRow       = $('<tr row-id="' + object.id + '"></tr>');

		tableHead.children('th').each(function() {
			var slug = $(this).attr('slug');

			if (slug === 'eye') { // the on-hover eye invisible row
				newRow.append(
					'<td>' +
						'<i class="fa fa-eye"></i>' +
					'</td>'
				);
			} else {
				newRow.append('<td>' + object[$(this).attr('slug')] + '</td>');
			}
		});

		tableBody.append(newRow);
	}

	/**
	 * Clears the data in the table body within #table-section
	 */
	clearTable() {
		$(this.sectionSelector).find('tbody').html('');
	}

	showTableRowDetails(id = null) {
		if (id !== null) {
			$(this.sectionSelector).find('tbody tr').removeClass('highlight');
			$(this.sectionSelector).find('tbody tr[row-id="' + id + '"]').addClass('highlight');
		}

		$('#list-view').css('flex-grow', 'initial');
		$(this.detailSelector).css({'flex-grow': 1, 'display': 'block'});
		$(this.detailSelector).children('div').hide().fadeIn();
	}

	hideTableRowDetails() {
		$(this.sectionSelector).find('tbody tr').removeClass('highlight');

		$(this.detailSelector).css({'flex-grow': 'initial', 'display': 'none'});
		$('#list-view').css('flex-grow', 1);
	}

	populateSelectField($select, defaultText, elements, defaultOptionId = null) {
		$select.html('<option selected disabled hidden>' + defaultText + '</option>');

		for (var i = 0; i < elements.length; i++) {
			if (defaultOptionId !== null && elements[i].id === defaultOptionId) {
				$select.append('<option selected value="' + elements[i].id + '">' + elements[i].name + '</option>');
				
				continue;
			}

			$select.append('<option value="' + elements[i].id + '">' + elements[i].name + '</option>');
		}

		$select.selectpicker('refresh');
	}
}