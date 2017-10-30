/**
 * ProblemTypePage
 *
 * Manipulates the problems page /w JQuery using data from
 * the ProblemManager.
 */

class ProblemTypePage {
	constructor() {
		this.loadSubProblemTypes(); // there will only be one at the start
	}

	loadSubProblemTypes($li = null, problemTypeId = null) {
		if ($li) {
			var problemType = makeItAll.problemTypeManager.getProblemType(problemTypeId);
			this.loadProblemTypeInfo(problemType);

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

	loadProblemTypeInfo(problemType) {
		var $singleView 	  = $('#single-view'),
			$navBar           = $singleView.find('.top-nav h4'),
			$splashScreen     = $singleView.find('.splash-screen'),
			$problemTypeView  = $singleView.find('#problem-type-view'),
			$problemTypeTable = $problemTypeView.find('#problem-types-table tbody');

		$splashScreen.hide();
		$problemTypeView.fadeIn();

		$navBar.text(this.getProblemTypeBreadcrum(problemType));
		
		var problemTypeChain = makeItAll.problemTypeManager.getProblemTypeChain(problemType);

		$problemTypeTable.html('');

		for (var i = 0; i < problemTypeChain.length; i++) {
			var problemType = problemTypeChain[i];

			$problemTypeTable.prepend(
				'<tr ' + (i === 0 ? 'class="highlight"' : '') + ' data-rowid="' + problemType.id + '">' +
					'<td>' + problemType.id + '</td>' +
					'<td>' + problemType.name + '</td>' +
					'<td>' + (problemType._parent !== null ? problemTypeChain[i + 1].name : 'N/A') + '</td>' +
					'<td>' +
						'<i class="fa fa-eye"></i>' +
					'</td>' +
				'</tr>'
			);
		}
	}

	getProblemTypeBreadcrum(problemType) {
		var problemTypeParent = problemType,
			breadcrum         = '';

		while (problemTypeParent !== null) {
			breadcrum = problemTypeParent.name + breadcrum;

			problemTypeParent = problemTypeParent.parent;

			if (problemTypeParent !== null) {
				breadcrum = ' / ' + breadcrum;
			}
		}

		return breadcrum;
	}
}