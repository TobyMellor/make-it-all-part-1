/**
 * DynamicPage
 *
 * Extended by every page, e.g. TicketPage.
 * Contains functions that are repeated often among
 * pages, such as updating tables or updating the
 * navbar
 */

class DynamicPage {
	updateTopNavBar(text) {
		$('.top-nav.with-title .main-content-title').text(text);
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
			var resultsCount = $('#table-section tbody tr').length,
				splashScreen = $('.splash-screen').not('.loading-splash-screen'),
				tableSection = $('#table-section');

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
		var mainContent  = $('.main-content'),
			tableSection = mainContent.find('#table-section'),
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
		$('#table-section tbody').html('');
	}
}