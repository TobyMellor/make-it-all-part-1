/**
 * Program
 *
 * Holds information about a piece of Software.
 * Contains all hardware that runs the software.
 */

class Program {
	constructor(
		id,
		name,
		devices
	) {
		this.id      = id;
		this.name    = name;
		this.devices = devices; // ID of devices, get method returns instances of Device
	}

	get devices() {
		return makeItAll.hardwareManager.getDevices(this._devices);
	}

	set devices(devices) {
		this._devices = devices;
	}
}