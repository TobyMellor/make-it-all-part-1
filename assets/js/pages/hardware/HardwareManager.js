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
				id: 0,
				name: 'AX7000',
				type: 'GPU',
				manufacturer: 'ASUS',
				serial_number: '0123456789',
				programs: null,
				created_at: 'Yesterday',
				updated_at: 'Just now'
			},
			{
				id: 1,
				name: 'JH5333',
				type: 'GPU',
				manufacturer: 'DELL',
				serial_number: '00000000001',
				programs: null,
				created_at: 'Today',
				updated_at: '2 hours ago'
			},
			{
				id: 2,
				name: 'Vengence',
				type: 'RAM',
				manufacturer: 'Corsair',
				serial_number: '00000000002',
				programs: null,
				created_at: 'Today',
				updated_at: '1 hour ago'
			},
			{
				id: 3,
				name: 'HDX 500',
				type: 'Monitor',
				manufacturer: 'Samsung',
				serial_number: '00000000003',
				programs: null,
				created_at: 'Today',
				updated_at: 'Just now'
			},
			{
				id: 4,
				name: 'AX6000',
				type: 'GPU',
				manufacturer: 'ASUS',
				serial_number: '00000000004',
				programs: null,
				created_at: 'Yesterday',
				updated_at: '21 hours ago'
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

	getDeviceBySerialNumber(serialNumber) {
		return this.devices.find(d => d.serial_number == serialNumber);
	}
}