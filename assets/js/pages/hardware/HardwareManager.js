/**
 * HardwareManager
 *
 * Responsible for storing and retrieving
 * devices across the system.
 *
 * HardwareManager should never know about the DOM
 */

class HardwareManager extends Manager {
	constructor(devices) {
		super();
		
		this.devices = [];

		for (var i = 0; i < devices.length; i++) {
			var device = devices[i];

			this.devices.push(new Device(
				device.id,
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