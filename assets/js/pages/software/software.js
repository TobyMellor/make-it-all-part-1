let softwarePage = new SoftwarePage();

$(() => {
    let isPage = document.getElementById(softwarePage.sectionSelector.substring(1)).dataset.page === "software";

    if (isPage) {
        softwarePage.showPrograms();
        $(softwarePage.tableSelector).on("click", "tbody tr", e => {
            softwarePage.showTableRowDetails(Number(e.currentTarget.dataset.rowid));
        });
    }

    $('.datepicker').datepicker();

    $('#isOS').change(function () {
        var index = $(this)[0].selectedIndex;
        if (index == 1) {
            $("#expiryGroup>label").addClass("text-muted");
            $("#expiryGroup>input").val("");
            $("#expiryGroup>input").prop('disabled', true);
        } else {
            $("#expiryGroup>label").removeClass("text-muted");
            $("#expiryGroup>input").prop('disabled', false);
        }
    });

    $("#new-software-modal #create-new-software").click(e => {
        e.preventDefault();
        var formData = $("#new-software-modal form").serializeObject();

        var program = makeItAll.SoftwareManager.createProgram(formData.name, formData.expiry == undefined ? null : formData.expiry , formData.isOS);
        softwarePage.appendTableRow(program);
        softwarePage.updateSoftwareTypeText();

        $('#new-software-modal').modal('hide');
    });
});