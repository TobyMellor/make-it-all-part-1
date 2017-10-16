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

	updateTable(object, shouldDisplaySplashScreen = false) {
		var mainContent  = $('.main-content'),
			tableSection = mainContent.find('#table-section');

		if (shouldDisplaySplashScreen && object.length === 0) {
			tableSection.fadeOut(500);

			mainContent.find('.splash-screen')
					   .not('.loading-splash-screen')
					   .css('display', 'flex')
					   .hide()
					   .delay(500)
					   .fadeIn();
		} else {
			mainContent.find('.splash-screen').fadeOut(500);

			var tableHead = tableSection.find('table thead tr'),
				tableBody = tableSection.find('table tbody');

			tableBody.html('');

			for (var index in object) {
				var element = object[index],
					newRow  = $('<tr row-id="' + element.id + '"></tr>');

				tableHead.children('th').each(function() {
					if ($(this).attr('slug') === 'filter_name') {
						newRow.append(
							'<td>' +
								'<span class="filter">' +
									element[$(this).attr('slug')] +
								'</span>' +
							'</td>'
						);
					} else {
						newRow.append(
							'<td>' + element[$(this).attr('slug')] + '</td>'
						);
					}
				});

				newRow.append(
					'<td>' +
						'<i class="fa fa-eye"></i>' +
					'</td>'
				);

				tableBody.append(newRow);
			}

			tableHead.append('<th></th>');

			if (tableSection.is(':visible')) {
				tableSection.hide().fadeIn(500);
			} else {
				tableSection.fadeOut(500).delay(500).fadeIn(500);
			}
		}
	}
}