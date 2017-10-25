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
		navSelector,
		detailSelector
	} = {}) {
		this.sectionSelector = sectionSelector;
		// Set navigation selector to first component of section selector with ‘-nav’ appended, otherwise default CSS selector
		this.navSelector = navSelector ? navSelector : (sectionSelector !== "#table-section" ? sectionSelector.split(" ")[0] + "-nav" : ".side-nav-bar-nested");
		this.detailSelector = detailSelector ? detailSelector : (sectionSelector !== "#table-section" ? sectionSelector.split(" ")[0] + "-detail" : "#single-view");
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
		
		// Set navbar text as number of items in table then append currently selected filter
		var navText = resultsCount + " " + $(this.navSelector).find("li.active").first().text().replace("All ", "");
		// If unable to obtain rows count, show "Loading…"
		$(this.sectionSelector).closest("section").find(".main-content-title").text(resultsCount !== undefined ? navText : "Loading…");
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
		var $tableSection = $(this.sectionSelector),
		    $tableHead     = $tableSection.find('table thead tr'),
		    $tableBody     = $tableSection.find('table tbody'),
		    $newRow       = $(document.createElement("tr"));

		// Set ID on row to reference later
		$newRow[0].dataset.rowid = object.id;

		$tableHead.children('th').each(function() {
			var slug = this.dataset.slug, td = document.createElement("td");

			if (slug === 'eye') { // the on-hover eye invisible row
				td.innerHTML = '<i class="fa fa-eye"></i>';
			} else if (slug ? slug.includes("access") : false) {
				// Boolean value support
				td.textContent = Object.resolve(slug, object) ? "Yes" : "No";
			} else {
				td.innerHTML = object[slug];
			}
			
			$newRow.append(td);
		});
		
		$tableBody.append($newRow);
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
			$(this.sectionSelector).find('tbody tr[data-rowid="' + id + '"]').addClass('highlight');
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