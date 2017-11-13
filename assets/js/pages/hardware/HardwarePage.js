class HardwarePage extends DynamicPage {
	constructor() {
		super();
		this.type = null;
		this.manufacturer = null;
		this.device = null;
	}
	
	populateTypes() {
		var typeList = $('#typeList');

		typeList.empty();

		let uniqueTypes = [...new Set(makeItAll.HardwareManager.devices.map(t => t.type))];
		for (let type of uniqueTypes) {
			var row = "<tr><td data-type='"+type+"'>" + type + "</td></tr>";
			typeList.append(row);
		}
		hardwarePage.updateSplashScreen("Hardware");
	}

	populateManufacturers() {
		var type = this.type;
		var manufacturerList = $('#manufacturerList');

		manufacturerList.empty();
		this.clearTable();

		var devicesByType = makeItAll.HardwareManager.devices.filter(function(device) {return device.type == type;});
		let uniqueManufacturers = [...new Set(devicesByType.map(t => t.manufacturer))];
		for (let manufacturer of uniqueManufacturers) {
			var row = "<tr><td data-manufacturer="+manufacturer+">" + manufacturer + "</td></tr>";
			manufacturerList.append(row);
		}
	}
	
	showDevices() {
		var type = this.type;
		var manufacturer = this.manufacturer;
		
		this.clearTable();

		var results = makeItAll.HardwareManager.devices.filter(function(device) {
			return (device.type == type) && (device.manufacturer == manufacturer);
		});
		for (let device of results) {
			this.appendTableRow(device);
		}
	}

	showTableRowDetails(id) {
		this.device = makeItAll.HardwareManager.getDevice(id);
		if (!this.device) {
			this.hideTableRowDetails();
			alert("No hardware with ID " + id);

			return;
		}

		this.updateSingleViewNavbar(this.device.type + " / " + this.device.manufacturer + " / " + this.device.serial_number);
		super.showTableRowDetails(id);

		//Todo generated programmatically
		$("#authorised-users").html(`
		<li class="list-group-item list-group-item-action" data-rowid="0">
			#0 Steve
			<span class="pull-right text-muted">Operator</span>
		</li>
		<li class="list-group-item list-group-item-action" data-rowid="1">
			#1 Andy
			<span class="pull-right text-muted">Admin</span>
		</li>
		<li class="list-group-item list-group-item-action" data-rowid="2">
			#2 Claire
			<span class="pull-right text-muted">Analyst</span>
		</li>
		<li class="list-group-item list-group-item-action" data-rowid="3">
			#3 Mary
			<span class="pull-right text-muted">Specialist</span>
		</li>
		`);


		$("#tickets").html(`
		<li class="list-group-item list-group-item-action" data-rowid="0">
			#0: Printer Queue not working
			<span class="filter filter-new">New</span>
			<span class="pull-right text-muted">12/10/2017</span>
		</li>
		<li class="list-group-item list-group-item-action" data-rowid="1">
			#1: Coffee machine needs refilling
			<span class="filter filter-new">New</span>
			<span class="pull-right text-muted">12/10/2017</span>
		</li>
		<li class="list-group-item list-group-item-action" data-rowid="2">
			#2: Squeeky chair
			<span class="filter filter-new">New</span>
			<span class="pull-right text-muted">12/10/2017</span>
		</li>
		<li class="list-group-item list-group-item-action" data-rowid="3">
			#3: Spilt water on macbook
			<span class="filter filter-pending">Pending - In Progress</span>
			<span class="pull-right text-muted">12/10/2017</span>
		</li>
		<li class="list-group-item list-group-item-action" data-rowid="4">
			#4: Computer wont turn on
			<span class="filter filter-resolved">Resolved</span>
			<span class="pull-right text-muted">12/10/2017</span>
		</li>
		`);

		$("#software").html(`
			<li class="list-group-item list-group-item-action" data-rowid="1">
				Microsoft Word
			</li>
			<li class="list-group-item list-group-item-action" data-rowid="2">
				Google Chrome
			</li>
			<li class="list-group-item list-group-item-action" data-rowid="3">
				Microsoft Excel
			</li>
		`);
		
	}
}
