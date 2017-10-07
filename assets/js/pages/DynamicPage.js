class DynamicPage {
	updateTopNavBar(text) {
		$('.top-nav .main-content-title').text(text);
	}

	updateTable(object, shouldDisplaySplashScreen = false) {
		var mainContent  = $('.main-content'),
			tableSection = mainContent.find('#table-section');

		if (shouldDisplaySplashScreen && object.length === 0) {
			tableSection.fadeOut(500, function() {
				mainContent.find('.splash-screen').not('.loading-splash-screen').fadeIn();
			});
		} else {
			$('#table-section').hide(); // Why you can't use a multi-selector here is beyond me $('#table-section, .splash-screen') ?
			$('.splash-screen').fadeOut(500, function() {
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

				tableSection.fadeIn();
			});
		}
	}
}