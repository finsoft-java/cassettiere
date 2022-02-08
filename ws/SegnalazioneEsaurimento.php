<?php

// L'utente segnala che l'ubicazione COD_UBICAZIONE è in esaurimento

include("include/all.php");
$con = connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

$logged_user = require_logged_user_JWT();
$codUbicazione = isset($_POST['COD_UBICAZIONE']) ? $con->escape_string($_POST['COD_UBICAZIONE']) : null;
$codArticolo = isset($_POST['COD_ARTICOLO']) ? $con->escape_string($_POST['COD_ARTICOLO']) : null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!$codUbicazione || !$codArticolo) {
       print_error(400, 'Missing COD_UBICAZIONE or COD_ARTICOLO');
    }
    $storicoOperazioneManager->segnala_esaurimento($codUbicazione, $codArticolo, $logged_user->nome_utente);
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>