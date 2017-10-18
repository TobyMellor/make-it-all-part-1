/**
 * Device
 *
 * Holds information about a piece of Hardware.
 * Contains all software that is running on the Hardware Unit
 */

class Device {
	constructor(
		id,
		serialNumber,
		name,
		operatingSystem,
		programs
	) {
		this.id                = id;
		this.serial_number     = serialNumber; // TODO: Turn into uppercase serial number
		this.name              = name;
		this.operating_system  = operatingSystem;
		this.programs          = programs; // ID of programs, get method returns instances of Program
	}

	get programs() {
		return makeItAll.softwareManager.getPrograms(this._programs);
	}

	set programs(programs) {
		this._programs = programs;
	}
}