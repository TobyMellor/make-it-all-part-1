class DynamicPage {
	updateTopNavBar(text) {
		$('.top-nav .main-content-title').text(text);
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
					newRow  = $('<tr></tr>');

				tableHead.children('th').each(function() {
					newRow.append(
						'<td>' + element[$(this).attr('slug')] + '</td>'
					);
				});

				tableBody.append(newRow);
			}

			if (tableSection.is(':visible')) {
				tableSection.hide().fadeIn(500);
			} else {
				tableSection.fadeOut(500).delay(500).fadeIn(500);
			}
		}
	}
}