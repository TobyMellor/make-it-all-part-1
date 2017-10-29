/**
 * ProblemTypePage
 *
 * Manipulates the problems page /w JQuery using data from
 * the ProblemManager.
 */

class ProblemTypePage extends DynamicPage {
	constructor() {
		super();

		this.loadSubProblemTypes($('.problem-type-picker .type-column')); // there will only be one at the start
	}

	loadSubProblemTypes($typeColumn, problemTypeId = null) {
		var children = [];

		if (problemTypeId === null) {
			children = makeItAll.problemTypeManager.getRootProblemTypes();
		} else {
			var problemType = makeItAll.problemTypeManager.getProblemType(problemTypeId);

			children = makeItAll.problemTypeManager.getProblemTypes(problemType.children);
		}

		console.log(children);

		for (var i = 0; i < children.length; i++) {
			var specialistCount = Math.floor(Math.random() * 5); // TODO: Replace with actual specialist count

			$typeColumn.append(
				'<li class="active">' +
					children[i].name +
					'<div class="specialist-counter">' +
						(specialistCount > 0 ? specialistCount + ' <i class="fa fa-user"></i>' : '<i class="fa fa-user-times"></i>') +
					'</div>' +
					'<i class="fa fa-caret-right"></i>' +
				'</li>'
			);
		}
	}
}