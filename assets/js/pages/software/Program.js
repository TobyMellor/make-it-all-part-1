/**
 * Program
 *
 * Holds information about a piece of Software.
 */

class Program {
	constructor(
		id,
		name,
		expiry,
		devices,
		isOS,
		created_at,
		updated_at
	) {
		this.id         = id;
		this.name       = name;
		this.expiry		= expiry;
		this.devices	= devices; // ID of devices, get method returns instances of Device	
		this.isOS		= isOS;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	get devices() {
		return makeItAll.hardwareManager.getDevices(this._devices);
	}

	set devices(devices) {
		this._devices = devices;
	}

	hasExpired() {
		var stringSections = this.expiry.split(" ");
		var dateSections = stringSections[0].split("/");
		var timeSections = stringSections[1].split(":");
		var expiry = new Date(dateSections[2], dateSections[1], dateSections[0], timeSections[1], timeSections[0], 0);
		if ( new Date() > expiry ) {
			return true;
		}
		return false;
	}
}