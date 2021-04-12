var tokenString = 'pippo';
function login (){
    rfid = $("#rfid");
    $.ajax({
    url: "../../ws/LoginBadge.php",
    dataType: 'json',
    data: {
        rfid: rfid
    },
    success: function(data, status) {
        alert();
      $("#rfid").val("");
      $("#login").css("display","none");
      console.log("The returned data", data);
    },
    beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + tokenString ); } //set tokenString before send
  });
}

$(document).on("click","#ablLettore", function(){
    $("#rfid").val("finsoft");
    $("#login").css("display","");
});