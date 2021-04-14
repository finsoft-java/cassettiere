reload_se_manca_token();

document.getElementById("qrcode").addEventListener("keyup", function(event) {
// Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        chiama_ws_ubicazione();
    }
});

$(document).on("click","#annullaEsaurimento", function(){
    $("#qrcode").val("");
    $("#qrcode").removeAttr("disabled");
    $("#qrcode").focus();
    $("#dettagli").html("");
    $("#messaggio").html("");
    $("#articoloEsaurito").attr("disabled", true); 
    
    $("#articoloEsaurito").css("display","none" ); 
    $("#annullaEsaurimento").css("display","none");
});
$(document).on("click","#articoloEsaurito", function(){
    $.post({
        url: "../../cassettiere/ws/Ubicazioni.php?COD_UBICAZIONE=" + codUbicazione,
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
        success: function(data, status) {
            console.log(data);
            $("#dettagli").html(`Articolo <b>${data.value.COD_ARTICOLO_CONTENUTO}</b> ${data.value.DESCR_ARTICOLO}<br/>Quantità prevista <b>${data.value.QUANTITA_PREVISTA}</b>`);
            if (data.value.SEGNALAZIONE_ESAURIMENTO == 'N') {
                $("#messaggio").html("Stai per dichiarare l'esaurimento di questa ubicazione. Confermi?");  
                // TODO ABILITA BOTTONI OK ANNULLA
            } else {
                $("#messaggio").html("Esiste già una segnalazione di esaurimento per questa ubicazione.");
                // TODO DISABILITA OK, ABILITA ANNULLA
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
                show_error("Network error");
            }
            $("#qrcode").val("");
            $("#qrcode").removeAttr("disabled");
            $("#qrcode").focus();
        }
    });
});

var codUbicazione = null;

function chiama_ws_ubicazione() {
    codUbicazione = $("#qrcode").val();
    $("#annullaEsaurimento").css("display","");
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
            $("#dettagli").html(`Articolo <b>${data.value.COD_ARTICOLO_CONTENUTO}</b> ${data.value.DESCR_ARTICOLO}<br/>Quantità prevista <b>${data.value.QUANTITA_PREVISTA}</b>`);
            if (data.value.SEGNALAZIONE_ESAURIMENTO == 'N') {
                $("#messaggio").html("Stai per dichiarare l'esaurimento di questa ubicazione. Confermi?");
                $("#articoloEsaurito").removeAttr("disabled");            
                $("#articoloEsaurito").css("display", "");    
                // TODO ABILITA BOTTONI OK ANNULLA
            } else {
                $("#messaggio").html("Esiste già una segnalazione di esaurimento per questa ubicazione.");
                $("#articoloEsaurito").css("display", "none");              
                // TODO DISABILITA OK, ABILITA ANNULLA
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
                show_error("Network error");
            }
            $("#qrcode").val("");
            $("#qrcode").removeAttr("disabled");
            $("#qrcode").focus();
        }
    });
}

var user = sessionStorage.getItem('user');
$("#user_box p").append(user);
$(".focus").removeAttr("disabled");
$(".focus").focus();
