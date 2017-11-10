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

		for (var i = 0; i < programs.length; i++) {
			var program = programs[i];

			this.programs.push(new Program(
				program.id,
				program.name,
				program.devices,
				program.created_at,
				program.updated_at
			));
		}
	}

	createprogram() {
		//
	}

	getPrograms(ids) {
		return this.findAllWhere(this.programs, program => ids.indexOf(program.id) > -1);
	}

	getProgram(id) {
		return this.programs.find(p => p.id === id);
	}
}