$(function () {
	$('[data-toggle="tooltip"]').tooltip();

	$('[data-toggle="tooltip"] > .nested-list').hover(function() {
		$(this).parent().tooltip('disable');
	}, function() {
		$(this).parent().tooltip('enable');
	});
});