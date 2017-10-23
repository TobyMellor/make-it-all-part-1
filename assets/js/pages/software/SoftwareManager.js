/**
 * SoftwareManager
 *
 * Responsible for storing and retrieving
 * software programs across the system.
 *
 * SoftwareManager should never know about the DOM
 */

class SoftwareManager extends Manager {
	constructor(programs) {
		super();
		
		this.programs = [];

		// loop through programs, create instances and push to this.programs
		// TODO: Likely need an "OperatingSystem" class, Michael TODO
	}

	createprogram() {
		//
	}

	getPrograms(programIds) {
		// TODO: return all programs with any of the programIds

		return [
			new Program(
				Math.floor(Math.random() * (10000 + 1)),
				'Microsoft Word',
				[Math.floor(Math.random() * (10000 + 1)), Math.floor(Math.random() * (10000 + 1))]
			),
			new Program(
				Math.floor(Math.random() * (10000 + 1)),
				'Microsoft Excel',
				[Math.floor(Math.random() * (10000 + 1))]
			)
		];
	}

	getProgram(programId) {
		// TODO: return program with programId

		return new Program(
			Math.floor(Math.random() * (10000 + 1)),
			'Microsoft Word',
			[0, 1]
		);
	}
}