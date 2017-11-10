/**
 * StaffProblemTypePage
 *
 * Includes specialist allocations ontop of ProblemTypePage
 */

class StaffProblemTypePage {
	constructor() {
		this.currentSpecialisms = [];
	}

	loadSpecialistProblemTypes($typeColumns, $li = null, problemTypeId = null) {
		var problemType = null;
		
		if ($li) {
			problemType = makeItAll.problemTypeManager.getProblemType(problemTypeId);

			$li.parent().nextAll().remove();
			$li.parent().find('li.active').removeClass('active');
			$li.parent().parent().find('li.last-active').removeClass('last-active');
			$li.addClass('active last-active');

			if ($li.hasClass('no-children')) {
				return;
			}
		} else {
			$typeColumns.empty();
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
						(this.currentSpecialisms.indexOf(child.id) > -1 ? '<i class="fa fa-check"></i>' : '<i class="fa fa-times"></i>') +
					'</div>' +
				'</li>'
			);
		}

		$typeColumns.append($typeColumn);
		$typeColumns.scrollLeft($typeColumns.width());
	}

	toggleSpecialism($specialismCheckbox) {
		var clickedSpecialismId       = Number($specialismCheckbox.parent().data('problemTypeId')),
			currentSpecialismsIndexOf = this.currentSpecialisms.indexOf(clickedSpecialismId),
			$icon                     = $specialismCheckbox.find('i'),
			children                  = makeItAll.problemTypeManager.getProblemType(clickedSpecialismId).children;

		if (currentSpecialismsIndexOf > -1) {
			this.currentSpecialisms.splice(currentSpecialismsIndexOf, 1);
			$icon.removeClass('fa-check').addClass('fa-times');

			if (this.shouldRemoveChildSpecialisms(children)) {
				this.toggleChildren(children, false);
			}
		} else {
			this.currentSpecialisms.push(clickedSpecialismId);
			$icon.removeClass('fa-times').addClass('fa-check');

			this.toggleChildren(children, true);
		}
	}

	toggleChildren(children, status = false) {
		for (var i = 0; i < children.length; i++) {
			var child = children[i];

			if (status) {
				if (this.currentSpecialisms.indexOf(child.id) === -1) {
					this.currentSpecialisms.push(child.id);
				}
			} else {
				var indexOf = this.currentSpecialisms.indexOf(child.id);

				if (indexOf > -1) {
					this.currentSpecialisms.splice(indexOf, 1);
				}
			}

			this.toggleChildren(child.children, status);
		}
	}

	/*
	 * We should only mess with children if they
	 * all have the same status
	 */
	shouldRemoveChildSpecialisms(children) {
		for (var i = 0; i < children.length; i++) {
			var child = children[i];

			if (this.currentSpecialisms.indexOf(child.id) === -1) {
				return false;
			}

			if (!this.shouldRemoveChildSpecialisms(child.children)) {
				return false;
			}
		}

		return true;
	}

	getSpecialistForProblemType(problemTypeId) {
		var problemType = makeItAll.problemTypeManager.getProblemType(problemTypeId),
			specialists = makeItAll.staffManager.getSpecialists(problemTypeId);

		if (specialists.length > 0) {
			var bestSpecialist = null,
				bestCount      = null,
				filters        = makeItAll.ticketManager.getFilters(['new', 'pending_in_progress', 'pending_awaiting_staff']),
				openTickets    = [].concat(...filters.map(filter => filter.tickets));

			for (let i = 0; i < specialists.length; i++) {
				var specialist      = specialists[i],
					assignedToCount = 0;

				for (let j = 0; j < openTickets.length; j++) {
					if (openTickets[j]._assigned_to === specialist.id) {
						assignedToCount++;
					}
				}

				if (bestSpecialist === null || assignedToCount < bestCount) {
					bestSpecialist = specialist;
					bestCount      = assignedToCount;
					continue;
				}

			}

			return bestSpecialist;
		}

		if (problemType._parent !== null) {
			return this.getSpecialistForProblemType(problemType._parent);
		}

		return null;
	}
}