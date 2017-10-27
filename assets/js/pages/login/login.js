$(() => {
	
	$("#username").keydown(e => {
		if (e.key === "Enter") $("#password").focus();
	});
	$("#password").keydown(e => {
		if (e.key === "Enter") login();
	});
	$("[data-action=\"login\"]").click(login);
	
});

function login() {
	// Workaround for local file access
	document.location.pathname = document.location.pathname.replace("index.html", "tickets.html");
}
