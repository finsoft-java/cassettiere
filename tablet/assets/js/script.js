$(document).on("click", "#logout", function(){
    sessionStorage.clear();
    location.reload();
});

function show_error(xhr, ajaxOptions, thrownError) {
    console.log(xhr);
    if (xhr.responseJSON && xhr.responseJSON.error && xhr.responseJSON.error.value) {
        $("#error_message p").html(xhr.responseJSON.error.value);
    } else if (xhr.responseText) {
        $("#error_message p").html(xhr.responseText);
    } else {
        console.log(xhr);
        $("#error_message p").html("Network error");
    }
    $("#error_message").css("display","");
}

function reload_se_manca_token() {
    var data = sessionStorage.getItem('token');
    if(data == null){
      location.href="./";
    }
}