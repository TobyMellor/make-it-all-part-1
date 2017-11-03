/**
 * DynamicPage
 *
 * Extended by every page, e.g. TicketPage.
 * Contains functions that are repeated often among
 * pages, such as updating tables or updating the
 * navbar
 */

class DynamicPage {
	constructor({
		sectionSelector = "#list-view",
		tableSelector = "#table-section",
		navSelector,
		detailSelector
	} = {}) {
		this.sectionSelector = sectionSelector;
		this.tableSelector = tableSelector;
		// Set navigation selector to first component of section selector with ‘-nav’ appended, otherwise default CSS selector
		this.navSelector = navSelector ? navSelector : (sectionSelector !== "#list-view" ? sectionSelector.split(" ")[0] + "-nav" : ".side-nav-bar-nested");
		this.detailSelector = detailSelector ? detailSelector : (sectionSelector !== "#list-view" ? sectionSelector.split(" ")[0] + "-detail" : "#single-view");
	}
	
	updateSingleViewNavbar(html) {
		$(this.detailSelector).find('.top-nav h4').html(html);
	}

	/**
	 * Hides the "Loading..." splash screen if it's shown
	 * Determines whether the "No Results..." splash screen
	 * should be shown or not.
	 *
	 * You should call this function after using "appendTable"
	 */
	updateSplashScreen(navText = null) {
		var $table = $(this.tableSelector),
		    resultsCount = $table.find('tbody tr').filter((i, el) => !$(el).hasClass("row-hidden")).length,
		    $splashScreen = $('.splash-screen');
		
		var [$show, $hide] = resultsCount ? [$table, $splashScreen] : [$splashScreen, $table];
		$hide.addClass("block-hidden");
		$show.removeClass("block-hidden");
		
		if (!navText) {
			// Set navbar text as number of items in table then append currently selected filter
			navText = resultsCount + " " + $(this.navSelector).find("li.active").first().text().replace("All ", "");
		}

		// If unable to obtain rows count, show "Loading…"
		$(this.sectionSelector).closest("section").find(".top-nav h4").text(resultsCount !== undefined ? navText : "Loading…");
	}

	/**
	 * Adds a row in the table body within #table-section
	 * using data from "object".
	 *
	 * The property names should correspond with the "slug"
	 * attribute in table header.
	 *
	 * NOTE: This assumes the object has an ID attribute. Include it
	 * even if you don't wish to show it.
	 *
	 * @param object - The data to append to the end of the table
	 * @param shouldDisplaySplashScreen - true you want the "loading"
	 * splashscreen on your page
	 */
	appendTableRow(object) {
		var $tableSection = $(this.sectionSelector),
		    $tableHead     = $tableSection.find('table thead tr'),
		    $tableBody     = $tableSection.find('table tbody'),
		    $newRow       = $(document.createElement("tr"));

		// Set ID on row to reference later
		$newRow[0].dataset.rowid = object.id;

		$tableHead.children('th').each(function() {
			var slug = this.dataset.slug, td = document.createElement("td");

			if (slug === 'eye') { // the on-hover eye invisible row
				td.innerHTML = '<i class="fa fa-eye"></i>';
			} else if (slug && slug.includes("access")) {
				// Boolean value support
				td.innerHTML = Object.resolve(slug, object) ? this.innerHTML : "·";
			} else {
				td.innerHTML = object[slug] !== undefined ? object[slug] : "—";
			}
			
			$newRow.append(td);
		});
		
		$tableBody.append($newRow);
	}

	/**
	 * Clears the data in the table body within #table-section
	 */
	clearTable() {
		$(this.sectionSelector).find('tbody').html('');
	}
	
	/**
	 * Show detail page
	 */
	showTableRowDetails(id = null) {
		// No need to check for null as no rows will match if no ID passed
		// .siblings does not include the element itself so can be chained after finding highlight row first
		$(this.sectionSelector).find("tbody tr").filter((i, el) => el.dataset.rowid == id).addClass("highlight").first().siblings().removeClass("highlight");
		
		// No need to set style using JS here, CSS handles flex
		$(this.detailSelector).unwrap("div")
		
		// Close button on hide
		.find("[data-action=\"close\"]").click(() => this.hideTableRowDetails());
	}
	
	/**
	 * Hide detail page shown with showDetail
	 */
	hideTableRowDetails() {
		// Deselect all rows
		$(this.sectionSelector).find("tbody tr").removeClass("highlight");
		// Filter to check if already hidden, don't hide again
		$(this.detailSelector).filter((i, el) => $(el).parent("div").length === 0).wrap(document.createElement("div"));
	}

	populateSelectField($select, defaultText, elements, defaultOptionId = null) {
		$select.html('<option selected disabled hidden>' + defaultText + '</option>');

		for (var i = 0; i < elements.length; i++) {
			if (defaultOptionId !== null && elements[i].id === defaultOptionId) {
				$select.append('<option selected value="' + elements[i].id + '">' + elements[i].name + '</option>');
				
				continue;
			}

			$select.append('<option value="' + elements[i].id + '">' + elements[i].name + '</option>');
		}

		$select.selectpicker('refresh');
	}

	/**
	 * @param query The search string
	 * @param elements The elements matching the search to display
	 * @param objectCallback a callback returning an object (the row structure)
	 * @param searchKeys the properties in objectCallback to highlight
	 */
	search(query, elements, objectCallback, searchKeys = []) {
		this.clearTable();

		if (elements.length > 0) {
			for (var i = 0; i < elements.length; i++) {
				var object = objectCallback(elements[i]);

				for (var j = 0; j < searchKeys.length; j++) {
					object[searchKeys[j]] = String(object[searchKeys[j]]).replace(new RegExp('(' + query + ')', 'ig'), '<strong>$1</strong>');
				}

				this.appendTableRow(object);
			}
		}

		this.updateSplashScreen(elements.length + ' search ' + (elements.length === 1 ? 'result' : 'results') + ' for \'' + query + '\'');
	}
}