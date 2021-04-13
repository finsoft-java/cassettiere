$(document).on("click","#login", function(){
    login();
});

$(document).on("click","#ablLettore", function(){
    abilitaLettore();
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

function login (){
    rfid = $("#rfid").val();
    $("#error_message p").html();
    $.post({
    url: "../../cassettiere/ws/LoginBadge.php",
    dataType: 'json',
    data: {
        rfid: rfid
    },
    success: function(data, status) {
        $("#rfid").val("");
        $("#login").attr("disabled","");
        console.log(data);
        sessionStorage.setItem( "user", (data["value"]["nome"] || '') + ' ' + (data["value"]["cognome"] || ''));
        sessionStorage.setItem( "token", data["value"]["username"] );
        location.href ="segnalazione-esaurimento.html";
    },
    error: function (xhr, ajaxOptions, thrownError) {
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
  });
}

$(document).on("click","#logout", function(){
    sessionStorage.clear();
    location.reload();
});