<?php

// L'utente segnala che l'ubicazione COD_UBICAZIONE è in esaurimento

include("include/all.php");
$con = connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

require_logged_user_JWT();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $cod_ubicazione = isset($_GET['COD_UBICAZIONE']) ? $con->escape_string($_GET['COD_UBICAZIONE']) : null;
    if (!$cod_ubicazione) {
       print_error(400, 'Missing COD_UBICAZIONE');
    }
    $storicoOperazioniManager->segnala_rabbocco($cod_ubicazione, $loggedUser->username);
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>