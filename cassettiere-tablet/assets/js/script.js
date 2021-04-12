$(document).on("click","#login", function(){
    alert(1);
    login();
});

$(document).on("click","#ablLettore", function(){
    $("#rfid").val("1234");
    $("#login").css("display","");
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
