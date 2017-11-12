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
		
		var cells = $(this.tableSelector + " tbody tr td:nth-child(4)");
		for (var i = 0; i < cells.length;i++) {
			if (cells[i].innerText == "false") {
				cells[i].innerText = "Program"
			} else if (cells[i].innerText == "true") {
				cells[i].innerText = "Operating System"
			}
		}

		softwarePage.updateSplashScreen("Software");
	}
	
	showTableRowDetails(id) {
		this.program = makeItAll.SoftwareManager.getProgram(id);
		if (!this.program) {
			this.hideTableRowDetails();
			return;
		}
		$('.alert').remove();
		var typetext;

		if (this.program.isOS) {
			typetext = "Operating System";
		} else {
			typetext = "Program";
			var stringSections = this.program.expiry.split(" ");
			var dateSections = stringSections[0].split("/");
			var timeSections = stringSections[1].split(":");
			var expiry = new Date(dateSections[2], dateSections[1], dateSections[0], timeSections[1], timeSections[0], 0);
			if ( new Date() > expiry ) {
				$(".main-content").prepend("<div class='alert alert-danger'><p><strong> This program's licence is not valid. Expiry Date: </strong> " + expiry.toDateString() + "</p></div>");
			} else {
				$(".main-content").prepend("<div class='alert alert-success'><p><strong> This program has a valid licence. Expiry Date: </strong>" + expiry.toDateString() + "</p></div>");
			}
			
		}

		this.updateSingleViewNavbar(typetext + " / " + this.program.name);

		//Todo generate programmatically
		$("#authorised-users").html(`
		<li class="list-group-item list-group-item-action">
			#0 Steve
			<span class="pull-right text-muted">Operator</span>
		</li>
		<li class="list-group-item list-group-item-action">
			#1 Andy
			<span class="pull-right text-muted">Admin</span>
		</li>
		<li class="list-group-item list-group-item-action">
			#2 Claire
			<span class="pull-right text-muted">Analyst</span>
		</li>
		<li class="list-group-item list-group-item-action">
			#3 Mary
			<span class="pull-right text-muted">Specialist</span>
		</li>
		`);


		$("#tickets").html(`
		<li class="list-group-item list-group-item-action">
			#0: Printer Queue not working
			<span class="filter filter-new">New</span>
			<span class="pull-right text-muted">12/10/2017</span>
		</li>
		<li class="list-group-item list-group-item-action">
			#1: Coffee machine needs refilling
			<span class="filter filter-new">New</span>
			<span class="pull-right text-muted">12/10/2017</span>
		</li>
		<li class="list-group-item list-group-item-action">
			#2: Squeeky chair
			<span class="filter filter-new">New</span>
			<span class="pull-right text-muted">12/10/2017</span>
		</li>
		<li class="list-group-item list-group-item-action">
			#3: Spilt water on macbook
			<span class="filter filter-pending">Pending - In Progress</span>
			<span class="pull-right text-muted">12/10/2017</span>
		</li>
		<li class="list-group-item list-group-item-action">
			#4: Computer wont turn on
			<span class="filter filter-resolved">Resolved</span>
			<span class="pull-right text-muted">12/10/2017</span>
		</li>
		`);

		$("#hardware").html(`
			<li class="list-group-item list-group-item-action">
				Laptop/MacBook Pro 2015
			</li>
			<li class="list-group-item list-group-item-action">
				Laptop/ASUS
			</li>
			<li class="list-group-item list-group-item-action">
				Desktop/HP
			</li>
		`);
		
		super.showTableRowDetails(id);
	}
}
