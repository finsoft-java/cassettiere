$(document).on("click", "#logout", function(){
    sessionStorage.clear();
    location.href = "./";
});

function reload_se_manca_token() {
    var data = sessionStorage.getItem('token');
    if (data == null) {
      location.href = "./";
    }
}

function show_error(msg) {
    $("#error_message p").html(msg);
    $("#error_message").css("display","");
}

function hide_errors() {
    $("#error_message p").html("");
    $("#error_message").css("display","none");
}