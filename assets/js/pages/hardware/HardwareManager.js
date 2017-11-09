/**
 * HardwareManager
 *
 * Responsible for storing and retrieving
 * devices across the system.
 *
 * HardwareManager should never know about the DOM
 */

class HardwareManager extends Manager {
	constructor() {
		super();
		
		this.devices = [];

		var devices = [
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

		for (var i = 0; i < devices.length; i++) {
			var device = devices[i];

			this.devices.push(new Device(
				device.id,
				device.name,
				device.type,
				device.manufacturer,
				device.serial_number,
				device.programs,
				device.created_at,
				device.updated_at
			));
		}
	}

	createDevice() {
		//
	}

	getDevices(ids) {
		return this.findAllWhere(this.devices, device => ids.indexOf(device.id) > -1);
	}

	getDevice(id) {
		return this.devices.find(d => d.id == id);
	}
}