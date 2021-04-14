reload_se_manca_token();

document.getElementById("qrcode").addEventListener("keyup", function(event) {
// Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        // TODO
        console.log('invio ->'+$("#qrcode").val());
    }
});

var user = sessionStorage.getItem('user');
$("#user_box p").append(user);
$(".focus").removeAttr("disabled");
$(".focus").focus();
