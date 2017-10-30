/**
 * ProblemTypePage
 *
 * Manipulates the problems page /w JQuery using data from
 * the ProblemManager.
 */

class ProblemTypePage extends DynamicPage {
	constructor() {
		super();

		this.loadSubProblemTypes(); // there will only be one at the start
	}

	loadSubProblemTypes($li = null, problemTypeId = null) {
		if ($li) {
			$li.parent().nextAll().remove();
			$li.parent().find('li').removeClass('active');
			$li.addClass('active');

			if ($li.hasClass('no-children')) {
				return;
			}
		}

		var children    = [],
			$typeColumn = $('<div class="type-column"></div>');

		if (problemTypeId === null) {
			children = makeItAll.problemTypeManager.getRootProblemTypes();
		} else {
			var problemType = makeItAll.problemTypeManager.getProblemType(problemTypeId);

			children = makeItAll.problemTypeManager.getProblemTypes(problemType._children);
		}

		for (var i = 0; i < children.length; i++) {
			var specialistCount = Math.floor(Math.random() * 5), // TODO: Replace with actual specialist count
				child           = children[i];

			$typeColumn.append(
				'<li ' + (child._children.length === 0 ? 'class="no-children"' : '') + ' data-problem-type-id="' + child.id + '">' +
					children[i].name +
					'<div class="specialist-counter">' +
						(specialistCount > 0 ? specialistCount + ' <i class="fa fa-user"></i>' : '<i class="fa fa-user-times"></i>') +
					'</div>' +
					'<i class="fa fa-caret-right"></i>' +
				'</li>'
			);
		}

		$('.type-columns').append($typeColumn);
	}
}