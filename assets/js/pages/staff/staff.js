let staffPage;

$(() => {
	
	staffPage = new StaffPage();
	staffPage.showStaff();
	staffPage.updateSplashScreen();
	$(staffPage.navSelector).find("[data-slug]").click(el => {
		$(el.delegateTarget).addClass("active").siblings().removeClass("active");
		
		let slug = el.delegateTarget.dataset.slug;
		let $table = $(staffPage.sectionSelector).find("table");
		let columnIndex = $table.find("thead th").filter((i, el) => el.dataset.slug === slug).first().index();
		
		$table.find("tbody tr").each((i, el) => {
			let $el = $(el);
			let $td = $el.children().eq(columnIndex);
			// Closure used to set ‘this’ correctly https://i.stack.imgur.com/CUsZm.png
			$el[$td.text() === "No" ? "fadeOut" : "fadeIn"](100, () => staffPage.updateSplashScreen());
		});
	});
	
	$(staffPage.sectionSelector).on("click", "tbody tr", e => {
		staffPage.showDetail(Number(e.currentTarget.dataset.id));
	});
	
});
