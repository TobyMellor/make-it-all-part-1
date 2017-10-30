/**
 * ProblemTypePage
 *
 * Manipulates the problems page /w JQuery using data from
 * the ProblemManager.
 */

class ProblemTypePage {
	constructor(allowProblemTypeCreation = false) {
		this.allowProblemTypeCreation = allowProblemTypeCreation;
	}

	loadSubProblemTypes($typeColumns, $li = null, problemTypeId = null) {
		if ($li) {
			var problemType = makeItAll.problemTypeManager.getProblemType(problemTypeId);
			this.loadProblemTypeInfo(problemType);

			$li.closest('.form-group').find('span.subtle').text(this.getProblemTypeBreadcrum(problemType));
			$li.parent().nextAll().remove();
			$li.parent().find('li.active').removeClass('active');
			$li.parent().parent().find('li.last-active').removeClass('last-active');
			$li.addClass('active last-active');

			if (this.allowProblemTypeCreation) {
				$typeColumns.find('.type-column:not(:first-child)').find('.input-group').remove();
			} else if ($li.hasClass('no-children')) {
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

		if (this.allowProblemTypeCreation) {
			$typeColumn.append(
				'<div class="input-group">' +
					'<input type="text" class="form-control" placeholder="Problem type name...">' +
						'<span class="input-group-btn">' +
						'<button class="btn btn-success btn-sm" type="button">' +
							'<i class="fa fa-plus"></i>' +
						'</button>' +
					'</span>' +
				'</div>'
			);
		}

		$typeColumns.append($typeColumn);
		$typeColumns.scrollLeft($typeColumns.width());
	}

	loadProblemType($typeColumns, problemTypeId) {
		var ptm              = makeItAll.problemTypeManager,
			problemTypeChain = ptm.getProblemTypeChain(ptm.getProblemType(problemTypeId));

		$typeColumns.html('');

		this.loadSubProblemTypes($typeColumns);

		for (var i = problemTypeChain.length - 2; i >= -1; i--) {
			this.loadSubProblemTypes($typeColumns, $typeColumns.find('.type-column li[data-problem-type-id="' + problemTypeChain[i + 1].id + '"]'), problemTypeChain[i + 1].id);
		}
	}

	loadProblemTypeInfo(problemType) {
		var $singleView 	  = $('#single-view'),
			$navBar           = $singleView.find('.top-nav h4'),
			$splashScreen     = $singleView.find('.splash-screen'),
			$problemTypeView  = $singleView.find('#problem-type-view'),
			$problemTypeTable = $singleView.find('#problem-types-table tbody');

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