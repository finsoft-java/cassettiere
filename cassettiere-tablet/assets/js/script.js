$(document).on("click","#login", function(){
    login();
});

$(document).on("click","#ablLettore", function(){
    $("#rfid").removeAttr("disabled");
    $("#login").removeAttr("disabled");
    $("#rfid").focus();
});

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
