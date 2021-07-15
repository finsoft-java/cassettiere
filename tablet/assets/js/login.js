$(document).ready(function(){
    abilitaLettoreBadge();
});

setInterval(function() {
    $("#rfid").focus();
}, 1000);

console.log(document.getElementById("rfid"));
document.getElementById("rfid").addEventListener("keyup", function(event) {
// Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        login();
    }
});

function login () {
    const rfid = $("#rfid").val();
    hide_errors();
    $("#rfid").attr("disabled", true);
    $.post({
        url: BASE_HREF + "/ws/LoginBadge.php",
        dataType: 'json',
        data: {
            rfid: rfid
        },
        success: function(data, status) {
            console.log("SONO QUI");
            if (sessionStorage.getItem('requiredRole') && data["value"]["ruolo"] != sessionStorage.getItem('requiredRole')) {
                show_error("Utente non autorizzato");
                $("#rfid").val("");
                $("#rfid").removeAttr("disabled");
            } else {
                sessionStorage.setItem( "user", (data["value"]["nome"] || '') + ' ' + (data["value"]["cognome"] || ''));
                sessionStorage.setItem( "token", data["value"]["username"] );
                sessionStorage.setItem( "role", data["value"]["ruolo"] );
                location.href = sessionStorage.getItem('redirectPage') || 'segnalazione-esaurimento.html';
            }
        },
        error:  function (xhr, ajaxOptions, thrownError) {
            console.log(xhr);
            if (xhr.responseJSON && xhr.responseJSON.error && xhr.responseJSON.error.value) {
                show_error(xhr.responseJSON.error.value);
            } else if (xhr.responseText) {
                show_error(xhr.responseText);
            } else {
                show_error("Network error");
            }
            $("#rfid").val("");
            $("#rfid").removeAttr("disabled");
        }
    });
}