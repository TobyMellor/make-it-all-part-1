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
				id: 0,
				type: 'GPU',
				manufacturer: 'ASUS',
				serial_number: '0123456789',
				programs: null,
				created_at: 'Yesterday',
				updated_at: 'Just now'
			},
			{
				id: 1,
				type: 'GPU',
				manufacturer: 'DELL',
				serial_number: '00000000001',
				programs: null,
				created_at: 'Today',
				updated_at: '2 hours ago'
			},
			{
				id: 2,
				type: 'RAM',
				manufacturer: 'Corsair',
				serial_number: '00000000002',
				programs: null,
				created_at: 'Today',
				updated_at: '1 hour ago'
			},
			{
				id: 3,
				type: 'Monitor',
				manufacturer: 'Samsung',
				serial_number: '00000000003',
				programs: null,
				created_at: 'Today',
				updated_at: 'Just now'
			},
			{
				id: 4,
				type: 'GPU',
				manufacturer: 'ASUS',
				serial_number: '00000000004',
				programs: null,
				created_at: 'Yesterday',
				updated_at: '21 hours ago'
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
		return this.findAllWhere(this.programs, program => ids.indexOf(program.id) > -1);
	}

	getProgram(id) {
		return this.programs.find(p => p.id === id);
	}
}