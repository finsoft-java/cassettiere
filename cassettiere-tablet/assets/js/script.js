var tokenString = 'pippo';

$(document).on("click","#login", function(){
    alert(1);
    login();
});

$(document).on("click","#ablLettore", function(){
    $("#rfid").val("finsoft");
    $("#login").css("display","");
});

function login (){
    alert(2);
    rfid = $("#rfid").val();
    $.post({
    url: "../../cassettiere/ws/LoginBadge.php",
    dataType: 'json',
    data: {
        rfid: rfid
    },
    success: function(data, status) {
        alert();
      $("#rfid").val("");
      $("#login").css("display","none");
      console.log("The returned data", data);
    }
    ,beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + tokenString ); } //set tokenString before send
  });
}
