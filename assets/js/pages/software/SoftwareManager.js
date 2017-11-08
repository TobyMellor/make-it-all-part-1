/**
 * SoftwareManager
 *
 * Responsible for storing and retrieving
 * software programs across the system.
 *
 * SoftwareManager should never know about the DOM
 */

class SoftwareManager extends Manager {
	constructor() {
		super();

		this.programs = [];

		var programs = [
			{
				id: 1,
				name: 'Microsoft Word',
				devices: null,
				created_at: '3 minutes ago',
				updated_at: 'Just now'
			},
			{
				id: 2,
				name: 'Google Chrome',
				devices: null,
				created_at: 'Yesterday',
				updated_at: '10 minutes ago'
			},
			{
				id: 3,
				name: 'Microsoft Excel',
				devices: null,
				created_at: 'Today',
				updated_at: '2 hours ago'
			},
			{
				id: 4,
				name: 'Microsoft Powerpoint',
				devices: null,
				created_at: 'Yesterday',
				updated_at: '1 hour ago'
			}
		];

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
		return this.programs.filter(program => ids.indexOf(program.id) > -1);
	}

	getProgram(id) {
		return this.programs.find(p => p.id === id);
	}
}