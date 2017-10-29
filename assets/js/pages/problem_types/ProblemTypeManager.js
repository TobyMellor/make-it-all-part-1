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
				[2, 8, 10]
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
		return this.findAllWhere(this.problemTypes, problemType => problemType.parent === null);
	}

	getProblemType(problemTypeId) {
		return this.findFirstWhere(this.problemTypes, problemType => problemType.id === problemTypeId);
	}

	getProblemTypes(problemTypeIds) {
		// TODO: return problemTypes with the ids

		return this.findAllWhere(this.problemTypes, problemType => problemTypeIds.indexOf(problemType.id) > -1);
	}
}