reload_se_manca_token();

document.getElementById("qrcode").addEventListener("keyup", function(event) {
// Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        chiama_ws_ubicazione();
    }
});

setInterval(function() {
    $("#qrcode").focus();
}, 1000);

var ubicazioni = [];

$(document).on("click", "#annullaRabbocco", function() {
    init();
});

$(document).on("click", "#confermaRabbocco", chiama_ws_rabbocco);

function init() {
    ubicazioni = [];
    $("#lista").html("");
    abilita_qrcode();
    abilita_o_disabilita_bottoni();
}

function abilita_qrcode() {
    $("#qrcode").val("");
    $("#qrcode").removeAttr("disabled");
    $("#qrcode").focus();
}

function abilita_o_disabilita_bottoni() {
    if (ubicazioni.length > 0) {
        $("#confermaRabbocco").attr("disabled", false); 
        $("#annullaRabbocco").attr("disabled", false);
    } else {
        $("#confermaRabbocco").attr("disabled", true); 
        $("#annullaRabbocco").attr("disabled", true);
    }
}

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
                $("#lista").append(`<li style="width:100%;line-height: 38px;padding:10px 15px;border-bottom:1px solid #000;">Articolo <b>${ubicazione.COD_ARTICOLO_CONTENUTO}</b> ${ubicazione.DESCR_ARTICOLO}<br/>Quantità prevista <b>${ubicazione.QUANTITA_PREVISTA}</b> <button class="btn btn-danger" style="float:right" onclick="elimina('${ubicazione.COD_UBICAZIONE}')"> Elimina </button></li>`);
            }
            abilita_qrcode();
            abilita_o_disabilita_bottoni();
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
            abilita_qrcode();
            abilita_o_disabilita_bottoni();
        }
    });
}

function non_duplicata(ubicazione) {
    var codUbicazione = ubicazione.COD_UBICAZIONE;
    return ubicazioni.filter(x => x.COD_UBICAZIONE == codUbicazione).length === 0;
}

function chiama_ws_rabbocco() {
    hide_errors();
    $("#qrcode").attr("disabled", true);
    $("#confermaRabbocco").attr("disabled", true); 
    $("#annullaRabbocco").attr("disabled", true);
    $("#messaggio").html("Dichiarazione in corso...");

    var listaUbicazioni = ubicazioni.map(x => x.COD_UBICAZIONE);

    $.post({
        url: "../../cassettiere/ws/SegnalazioneRabbocco.php",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
        data: JSON.stringify(listaUbicazioni),
        success: function(data, status) {
            console.log(data);
            init();
            // TODO DOVREI DARE UN MESSAGGIO: Dichiarazione effettuata
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr);
            if (xhr.responseJSON && xhr.responseJSON.error && xhr.responseJSON.error.value) {
                show_error(xhr.responseJSON.error.value);
            } else if (xhr.responseText) {
                show_error(xhr.responseText);
            } else {
                show_error("Network error");
            }
            abilita_qrcode();
            abilita_o_disabilita_bottoni();
        }
    });
}

function elimina(codUbicazione) {
    var index = ubicazioni.findIndex(x => x.COD_UBICAZIONE == codUbicazione);
    ubicazioni.splice(index, 1);
    $("#lista").find("li")[index].remove();
}

var user = sessionStorage.getItem('user');
$("#user_box p").append(user);
$(".focus").removeAttr("disabled");
$(".focus").focus();
