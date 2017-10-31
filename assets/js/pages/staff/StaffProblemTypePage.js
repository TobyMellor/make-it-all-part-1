/**
 * StaffProblemTypePage
 *
 * Includes specialist allocations ontop of ProblemTypePage
 */

class StaffProblemTypePage {
	constructor() {
		//super();
	}

	loadSpecialistProblemTypes(specialist, $typeColumns, $li = null, problemTypeId = null) {
		if ($li) {
			var problemType = makeItAll.problemTypeManager.getProblemType(problemTypeId);

			$li.parent().nextAll().remove();
			$li.parent().find('li.active').removeClass('active');
			$li.parent().parent().find('li.last-active').removeClass('last-active');
			$li.addClass('active last-active');

			if ($li.hasClass('no-children')) {
				return;
			}
		}

		var children    = [],
			$typeColumn = $('<div class="type-column"></div>');

		if (problemTypeId === null) {
			children = makeItAll.problemTypeManager.getRootProblemTypes();
		} else {
			children = makeItAll.problemTypeManager.getProblemTypes(problemType._children);
		}

		for (var i = 0; i < children.length; i++) {
			var child = children[i];

			$typeColumn.append(
				'<li ' + (child._children.length === 0 ? 'class="no-children"' : '') + ' data-problem-type-id="' + child.id + '">' +
					children[i].name +
					'<div class="specialism-checkbox pull-right">' +
						(specialist._specialisms.indexOf(child.id) > -1 ? '<i class="fa fa-check"></i>' : '') +
					'</div>' +
				'</li>'
			);
		}

		$typeColumns.append($typeColumn);
		$typeColumns.scrollLeft($typeColumns.width());
	}
}