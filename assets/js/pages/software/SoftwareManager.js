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
				expiry: '11/07/2018 09:56',
				devices: null,
				isOS: false,
				created_at: '3 minutes ago',
				updated_at: 'Just now'
			},
			{
				id: 2,
				name: 'Google Chrome',
				expiry: '15/06/2017 11:16',
				devices: null,
				isOS: false,
				created_at: '15/03/2016 11:16',
				updated_at: '10 minutes ago'
			},
			{
				id: 3,
				name: 'Microsoft Excel',
				expiry: '25/12/2017 16:56',
				devices: null,
				isOS: false,
				created_at: 'Today',
				updated_at: '2 hours ago'
			},
			{
				id: 4,
				name: 'Microsoft Powerpoint',
				expiry: '1/1/2020 21:34',
				devices: null,
				isOS: false,
				created_at: 'Yesterday',
				updated_at: '1 hour ago'
			},
			{
				id: 5,
				name: 'Microsoft Windows 10',
				devices: null,
				isOS: true,
				created_at: '3 minutes ago',
				updated_at: 'Just now'
			},
			{
				id: 6,
				name: 'Mac OS X 10.11',
				devices: null,
				isOS: true,
				created_at: '15/03/2016 11:16',
				updated_at: '10 minutes ago'
			}
		];

		for (var i = 0; i < programs.length; i++) {
			var program = programs[i];

			this.programs.push(new Program(
				program.id,
				program.name,
				program.expiry,
				program.devices,
				program.isOS,
				program.created_at,
				program.updated_at
			));
		}
	}

	createProgram(name, expiry, isOS) {
		var programID = Math.floor(Math.random() * (10000 + 1));

		var prog = new Program(
			programID,
			name,
			expiry,
			null,
			isOS,
			'Just now',
			'Just now');

		this.programs.push(prog);
	}

	getPrograms(ids) {
		return this.findAllWhere(this.programs, program => ids.indexOf(program.id) > -1);
	}

	getProgram(id) {
		return this.programs.find(p => p.id === id);
	}
}