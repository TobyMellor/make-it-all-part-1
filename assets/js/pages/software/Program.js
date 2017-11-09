/**
 * Program
 *
 * Holds information about a piece of Software.
 */

class Program {
	constructor(
		id,
		name,
		devices,
		created_at,
		updated_at
	) {
<<<<<<< HEAD
		this.id      = id;
		this.name    = name;
		this.devices = devices; // ID of devices, get method returns instances of Device
		this.created_at        = created_at;
		this.updated_at        = updated_at;
	}

	get devices() {
		return makeItAll.hardwareManager.getDevices(this._devices);
	}

	set devices(devices) {
		this._devices = devices;
=======
		this.id   = id;
		this.name = name;
>>>>>>> Design for all modals, outline for removed program/software/operating_system
	}
}