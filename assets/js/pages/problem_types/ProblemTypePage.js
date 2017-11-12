/**
 * ProblemTypePage
 *
 * Manipulates the problems page /w JQuery using data from
 * the ProblemManager.
 */

class ProblemTypePage extends DynamicPage {
	constructor(allowProblemTypeCreation = false, isPage = false) {
		super();

		this.allowProblemTypeCreation = allowProblemTypeCreation;
		this.isPage                   = isPage;
	}

	loadSubProblemTypes($typeColumns, $li = null, problemTypeId = null) {
		var problemType = null;

		if ($li) {
			problemType = makeItAll.problemTypeManager.getProblemType(problemTypeId);
			this.loadProblemTypeInfo(problemType);

			$li.closest('.form-group').find('span.subtle').text(this.getProblemTypeBreadcrum(problemType));
			$li.parent().nextAll().remove();
			$li.parent().find('li.active').removeClass('active');
			$li.parent().parent().find('li.last-active').removeClass('last-active');
			$li.addClass('active last-active');

			if (this.allowProblemTypeCreation) {
				$typeColumns.find('.type-column').find('.input-group').remove();
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

		for (let i = 0; i < children.length; i++) {
			var child           = children[i],
				specialistCount = makeItAll.staffManager.getSpecialists(child.id).length;

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
			var input = 
				'<div class="input-group">' +
					'<input type="text" class="form-control" placeholder="Problem type name...">' +
						'<span class="input-group-btn">' +
						'<button class="btn btn-success btn-sm create-problem-type" type="button">' +
							'<i class="fa fa-plus"></i>' +
						'</button>' +
					'</span>' +
				'</div>';

			if ($li) {
				$li.parent().append(input);

				if ($li.hasClass('no-children')) {
					$typeColumn.append(input);
				}
			} else {
				$typeColumn.append(input);
			}
		}

		$typeColumns.append($typeColumn);
		$typeColumns.scrollLeft($typeColumns.width());
	}

	loadProblemType($typeColumns, problemTypeId) {
		var ptm              = makeItAll.problemTypeManager,
			problemTypeChain = ptm.getProblemTypeChain(ptm.getProblemType(problemTypeId));

		$typeColumns.empty();

		this.loadSubProblemTypes($typeColumns);

		for (let i = problemTypeChain.length - 2; i >= -1; i--) {
			this.loadSubProblemTypes($typeColumns, $typeColumns.find('.type-column li[data-problem-type-id="' + problemTypeChain[i + 1].id + '"]'), problemTypeChain[i + 1].id);
		}
	}

	loadProblemTypeInfo(problemType) {
		var $singleView 	   = $('#single-view'),
			$navBar            = $singleView.find('.top-nav h4'),
			$splashScreen      = $singleView.find('.splash-screen'),
			$problemTypeView   = $singleView.find('#problem-type-view'),
			$problemTypeTable  = $singleView.find('#problem-types-table tbody'),
			$specialistsTable  = $singleView.find('#specialists-table tbody'),
			$ticketsTable      = $singleView.find('#tickets-table tbody'),
			$noSpecialistsData = $singleView.find('#no-specialists-data'),
			$noTicketsData     = $singleView.find('#no-tickets-data');

		$splashScreen.addClass('block-hidden');
		$problemTypeView.removeClass('block-hidden');

		if (this.isPage) {
			$navBar.text(this.getProblemTypeBreadcrum(problemType));
		}
		
		var problemTypeChain = makeItAll.problemTypeManager.getProblemTypeChain(problemType),
			specialists      = makeItAll.staffManager.getSpecialists(problemType.id),
			tickets          = makeItAll.ticketManager.getRelatedProblems(problemType.id);

		$problemTypeTable.empty();
		$specialistsTable.empty();
		$ticketsTable.empty();

		// Should probably move these to DynamicPage
		for (let i = 0; i < problemTypeChain.length; i++) {
			let problemType = problemTypeChain[i];

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

		if (specialists.length > 0) {
			$specialistsTable.parent().show();
			$noSpecialistsData.hide();

			for (let i = 0; i < specialists.length; i++) {
				var specialist = specialists[i];

				$specialistsTable.append(
					'<tr ' + (specialist.id === makeItAll.staffManager.currentUser() ? 'class="highlight"' : '') + ' data-rowid="' + specialist.id + '">' +
						'<td>' + specialist.id + '</td>' +
						'<td>' + specialist.name + '</td>' +
						'<td>' + specialist.job + '</td>' +
						'<td>' + specialist.phone + '</td>' +
						'<td>' +
							'<i class="fa fa-eye"></i>' +
						'</td>' +
					'</tr>'
				);
			}
		} else {
			$specialistsTable.parent().hide();
			$noSpecialistsData.show();
		}

		if (tickets.length > 0) {
			$ticketsTable.parent().show();
			$noTicketsData.hide();

			for (let i = 0; i < tickets.length; i++) {
				var ticket = tickets[i];

				$ticketsTable.append(
					'<tr data-rowid="' + ticket.id + '">' +
						'<td>' + ticket.id + '</td>' +
						'<td class="truncate">' + ticket.title + '</td>' +
						'<td>' +
							'<span class="filter">' + ticket.filter.name + '</span>' +
						'</td>' +
						'<td class="truncate">' + ticket.created_at + '</td>' +
						'<td>' +
							'<i class="fa fa-eye"></i>' +
						'</td>' +
					'</tr>'
				);
			}
		} else {
			$ticketsTable.parent().hide();
			$noTicketsData.show();
		}
	}

	getProblemTypeBreadcrum(problemType) {
		var problemTypeParent = problemType,
			breadcrum         = '';

		while (problemTypeParent != null) {
			breadcrum = problemTypeParent.name + breadcrum;

			problemTypeParent = problemTypeParent.parent;

			if (problemTypeParent != null) {
				breadcrum = ' / ' + breadcrum;
			}
		}

		return breadcrum;
	}

	createProblemType(name, parentProblemTypeId) {
		var problemType = makeItAll.problemTypeManager.createProblemType(name, parentProblemTypeId);

		this.loadProblemType($('.type-columns'), problemType.id);
	}

	search(query) {
		var $problemTypePicker = $('.problem-type-picker'),
			$tableSection      = $(this.tableSelector);

		$('#list-view .splash-screen').addClass('block-hidden');

		if (query.length >= 2 || query == parseInt(query)) {
			$problemTypePicker.hide();
			$tableSection.show();

			var searchKeys   = ['name'],
				problemTypes = makeItAll.problemTypeManager.search(query, searchKeys);

			super.search(query, problemTypes, function(problemType) {
				return {
					id: problemType.id,
					name: problemType.name,
					parent: (problemType.parent !== null ? problemType.parent.name : 'N/A')
				};
			}, searchKeys);
		} else {
			$('.top-nav h4').text('Problem Types');
			$problemTypePicker.show();
			$tableSection.hide();
		}
	}
}