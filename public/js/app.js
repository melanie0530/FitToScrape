$("[name='modalBtn']").on("click", () => {
    $('#noteModal').modal("show")
})

$("#noteArchiveForm").on("submit", function(req, res) {
    event.preventDefault()  
    window.location.href += `/${$("#archiveID").val().trim()}`;
    // res.redirect(`window.location.href/${$("#archiveID").val().trim()}`)
})
