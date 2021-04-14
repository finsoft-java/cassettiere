reload_se_manca_token();

document.getElementById("qrcode").addEventListener("keyup", function(event) {
// Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        chiama_ws_ubicazione();
    }
});

var ubicazioni = [];

function chiama_ws_ubicazione() {
    var codUbicazione = $("#qrcode").val();
    hide_errors();
    $("#qrcode").attr("disabled", true);
    $.get({
        url: "../../cassettiere/ws/Ubicazioni.php?COD_UBICAZIONE=" + codUbicazione,
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
        success: function(data, status) {
            console.log(data);
            var ubicazione = data.value;
            if (ubicazione.SEGNALAZIONE_ESAURIMENTO == 'N') {
                show_error("Questa ubicazione non risulta essere in sofferenza");
                // lo faccio lo stesso o no?
            }
            if (non_duplicata(ubicazione)) {
                ubicazioni.push(ubicazione);
                $("#lista").append(`<li style="width:100%;line-height: 38px;padding:10px 15px;border-bottom:1px solid #000;">Articolo <b>${ubicazione.COD_ARTICOLO_CONTENUTO}</b> ${ubicazione.DESCR_ARTICOLO}<br/>Quantità prevista <b>${ubicazione.QUANTITA_PREVISTA}</b> <button class="btn btn-danger" style="float:right"> Elimina </button></li>`);
            }
            $("#qrcode").val("");
            $("#qrcode").removeAttr("disabled");
            $("#qrcode").focus();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr);
            if (xhr.responseJSON && xhr.responseJSON.error && xhr.responseJSON.error.value) {
                show_error(xhr.responseJSON.error.value);
            } else if (xhr.responseText) {
                show_error(xhr.responseText);
            } else {
                console.log(xhr);
                show_error("Network error");
            }
            $("#qrcode").val("");
            $("#qrcode").removeAttr("disabled");
            $("#qrcode").focus();
        }
    });
}

function non_duplicata(ubicazione) {
    var codUbicazione = ubicazione.COD_UBICAZIONE;
    return ubicazioni.filter(x => x.COD_UBICAZIONE == codUbicazione).length === 0;
}

var user = sessionStorage.getItem('user');
$("#user_box p").append(user);
$(".focus").removeAttr("disabled");
$(".focus").focus();
