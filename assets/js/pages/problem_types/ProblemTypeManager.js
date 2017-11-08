/**
 * ProblemTypeManager
 *
 * Responsible for storing and retrieving
 * problem types across the system.
 *
 * ProblemTypeManager should never know about the DOM
 */

class ProblemTypeManager extends Manager {
	constructor(devices) {
		super();
		
		this.problemTypes = [
			new ProblemType(
				1,
				'Printers',
				null,
				[2]
			),
			new ProblemType(
				2,
				'Low Ink',
				1,
				[3, 4, 5, 6]
			),
			new ProblemType(
				3,
				'No Magenta',
				2,
				[]
			),
			new ProblemType(
				4,
				'No Yellow',
				2,
				[]
			),
			new ProblemType(
				5,
				'No Cyan',
				2,
				[]
			),
			new ProblemType(
				6,
				'No Black',
				2,
				[]
			),
			new ProblemType(
				8,
				'Computers',
				null,
				[9]
			),
			new ProblemType(
				9,
				'Display',
				8,
				[]
			),
			new ProblemType(
				10,
				'Software',
				null,
				[]
			)
		];

		// loop through problem types, create instances and push to this.devices
	}

	getRootProblemTypes() {
		return this.problemTypes.filter(problemType => problemType.parent == null);
	}

	getProblemType(problemTypeId) {
		return this.problemTypes.find(problemType => problemType.id === problemTypeId);
	}

	getProblemTypes(problemTypeIds) {
		// TODO: return problemTypes with the ids

		return this.problemTypes.filter(problemType => problemTypeIds.indexOf(problemType.id) > -1);
	}

	getProblemTypeChain(problemType) {
		var problemTypeParent = problemType,
			problemTypes      = [problemTypeParent];

		while (problemTypeParent != null) {
			problemTypeParent = problemTypeParent.parent;

			if (problemTypeParent != null) {
				problemTypes.push(problemTypeParent);
			}
		}

		return problemTypes;
	}

	createProblemType(name, parentProblemTypeId) {
		// AJAX call here, which returns a problemTypeId
		// validation here
		var problemTypeId = Math.floor(Math.random() * (10000 + 1));

		this.problemTypes.push(new ProblemType(
			problemTypeId,
			name,
			parentProblemTypeId,
			[]
		));

		if (parentProblemTypeId !== null) {
			this.getProblemType(parentProblemTypeId)._children.push(problemTypeId);
		}

		return this.problemTypes[this.problemTypes.length - 1];
	}

	search(query, properties) {
		return super.search(this.problemTypes, query, properties);
	}
}