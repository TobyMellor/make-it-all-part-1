/**
 * Device
 *
 * Holds information about a piece of Hardware.
 * Contains all software that is running on the Hardware Unit
 */

class Device {
	constructor(
		id,
		type,
		manufacturer,
		serial_number,
		programs,
		created_at,
		updated_at
	) {
		this.id                = id;
		this.type 			   = type;
		this.manufacturer              = manufacturer;
		this.programs		   = programs;
		this.serial_number     = serial_number;
		this.created_at        = created_at;
		this.updated_at        = updated_at;
	}

	get programs() {
		return makeItAll.softwareManager.getPrograms(this._programs);
	}

	set programs(programs) {
		this._programs = programs;
	}
}