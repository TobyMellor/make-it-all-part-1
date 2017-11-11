class SoftwarePage extends DynamicPage {
	constructor() {
		super();
		this.program = null;
	}
	
	showPrograms() {
		$(this.tableSelector).find("tbody").empty();
		for (let program of makeItAll.SoftwareManager.programs) {
			this.appendTableRow(program);
		}
		softwarePage.updateSplashScreen("Software");
	}
	
	showTableRowDetails(id) {
		this.program = makeItAll.SoftwareManager.getProgram(id);
		if (!this.program) {
			this.hideTableRowDetails();
			alert("No software with ID " + id);

			return;
		}

		//Todo generate programmatically
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

		$("#hardware").html(`
			<li class="list-group-item list-group-item-action" data-rowid="0">
				Laptop/MacBook Pro 2015
			</li>
			<li class="list-group-item list-group-item-action" data-rowid="1">
				Laptop/ASUS
			</li>
			<li class="list-group-item list-group-item-action" data-rowid="2">
				Desktop/HP
			</li>
		`);
		
		this.updateSingleViewNavbar(this.program.name);
		super.showTableRowDetails(id);
	}
}
