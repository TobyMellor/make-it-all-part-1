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
				[2, 8, 10]
			),
			new ProblemType(
				2,
				'Low Ink',
				[3, 4, 5, 6]
			),
			new ProblemType(
				3,
				'No Magenta',
				[]
			),
			new ProblemType(
				4,
				'No Yellow',
				[]
			),
			new ProblemType(
				5,
				'No Cyan',
				[]
			),
			new ProblemType(
				6,
				'No Black',
				[]
			),
			new ProblemType(
				8,
				'Computers',
				[9]
			),
			new ProblemType(
				9,
				'Display',
				[]
			),
			new ProblemType(
				10,
				'Software',
				[]
			)
		];

		// loop through problem types, create instances and push to this.devices
	}

	getProblemTypes(problemTypeIds) {
		// TODO: return problemTypes with the ids

		return this.findAllWhere(this.problemTypes, problemType => problemTypeIds.indexOf(problemType.id) > -1);
	}
}