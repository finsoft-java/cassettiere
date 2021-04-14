reload_se_manca_token();

document.getElementById("qrcode").addEventListener("keyup", function(event) {
// Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        // TODO
        console.log('invio ->'+$("#qrcode").val());
        chiama_ws_ubicazione();
    }
});

function chiama_ws_ubicazione() {
    var codUbicazione = $("#qrcode").val();
    $.get({
        url: "../../cassettiere/ws/Ubicazioni.php?COD_UBICAZIONE=" + codUbicazione,
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
        success: function(data, status) {
            console.log(data);
            $("dettagli").html(data);
        },
        error: show_error
    });
}

var user = sessionStorage.getItem('user');
$("#user_box p").append(user);
$(".focus").removeAttr("disabled");
$(".focus").focus();
