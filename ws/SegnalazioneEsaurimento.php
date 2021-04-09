<?php

// L'utente segnala che l'ubicazione COD_UBICAZIONE è in esaurimento

include("include/all.php");
$con = connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

require_logged_user_JWT();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    if (!$request->COD_UBICAZIONE) {
       print_error(400, 'Missing COD_UBICAZIONE');
    }
    $storicoOperazioniManager->segnala_esaurimento($request->COD_UBICAZIONE, $loggedUser->username);
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>