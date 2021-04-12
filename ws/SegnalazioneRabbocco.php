<?php

// L'utente segnala che l'ubicazione COD_UBICAZIONE è in esaurimento

include("include/all.php");
$con = connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

$logged_user = require_logged_user_JWT();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    if (!isset($request->COD_UBICAZIONE)) {
       print_error(400, 'Missing COD_UBICAZIONE');
    }
    $storicoOperazioneManager->segnala_rabbocco($request->COD_UBICAZIONE, $logged_user->nome_utente);
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>