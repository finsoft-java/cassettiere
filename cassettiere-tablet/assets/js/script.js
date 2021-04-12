$(document).on("click","#login", function(){
    alert(1);
    login();
});

$(document).on("click","#ablLettore", function(){
    $("#rfid").removeAttr("disabled");
    $("#login").removeAttr("disabled");
    $("#rfid").focus();
});

function login (){
    rfid = $("#rfid").val();
    $.post({
    url: "../../cassettiere/ws/LoginBadge.php",
    dataType: 'json',
    data: {
        rfid: rfid
    },
    success: function(data, status) {
      $("#rfid").val("");
      $("#login").css("display","none");
      console.log(data);
    }
  });
}
