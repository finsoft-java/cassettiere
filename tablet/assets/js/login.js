$(document).on("click", "#ablLettore", function(){
    abilitaLettore();
});

$(document).on("click", "#login", function(){
    login();
});

document.getElementById("rfid").addEventListener("keyup", function(event) {
// Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#login").click();
    }
});

function abilitaLettore() {
    // TODO call ajax webservice
    $("#rfid").removeAttr("disabled");
    $("#login").removeAttr("disabled");
    $("#rfid").focus();
    setTimeout("disabilitaLettore()", 30000); // timeout 30 secondi
}

function disabilitaLettore() {
    // TODO call ajax webservice
    $("#rfid").attr("disabled", true);
    $("#login").attr("disabled", true);
}

function login () {
    rfid = $("#rfid").val();
    $("#error_message p").html();
    $.post({
        url: "../../cassettiere/ws/LoginBadge.php",
        dataType: 'json',
        data: {
            rfid: rfid
        },
        success: function(data, status) {
            console.log(data);
            sessionStorage.setItem( "user", (data["value"]["nome"] || '') + ' ' + (data["value"]["cognome"] || ''));
            sessionStorage.setItem( "token", data["value"]["username"] );
            location.href = "segnalazione-esaurimento.html";
        },
        error: show_error
    });
}