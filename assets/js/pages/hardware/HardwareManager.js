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

		// loop through device, create instances and push to this.devices
	}

	createDevice() {
		//
	}

	getDevices(programId) {
		// TODO: return hardwareUnit with the software id

		return [
			new Device(
				Math.floor(Math.random() * (10000 + 1)),
				'123456789',
				'MacBook Pro',
				'macOS 10.13',
				[programId, Math.floor(Math.random() * (10000 + 1))]
			),
			new Device(
				Math.floor(Math.random() * (10000 + 1)),
				'987654321',
				'Vending Machine',
				'10.4.1',
				[programId]
			)
		];
	}

	getDevice(serialNumber) {
		// TODO: return hardwareUnit with serial number

		return new Device(
			Math.floor(Math.random() * (10000 + 1)),
			serialNumber,
			'MacBook Pro',
			'macOS 10.13',
			[0, 1]
		);
	}
}