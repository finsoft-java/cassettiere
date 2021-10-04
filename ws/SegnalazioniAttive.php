<?php

// Prevedo le seguenti richieste:
// OPTIONS
// GET
include("include/all.php");
$con = connect();
$panthera->connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

require_logged_user_JWT();

$cod_ubicazione = isset($_GET['COD_UBICAZIONE']) ? $con->escape_string($_GET['COD_UBICAZIONE']) : null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $search = null;
        if(isset($_GET['search'])) {
            $search = $_GET['search'];
        }
        [$ubicazioni, $count] = $storicoOperazioneManager->get_segnalazioni_attive($search);
          
        header('Content-Type: application/json');
        echo json_encode(['data' => $ubicazioni, 'count' => $count]);
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>