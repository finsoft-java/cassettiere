<?php

// Prevedo le seguenti richieste:
// OPTIONS
// GET
include("include/all.php");
$con = connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

require_logged_user_JWT();

$cod_ubicazione = isset($_GET['COD_UBICAZIONE']) ? $con->escape_string($_GET['COD_UBICAZIONE']) : null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $searchString = null;
        if(isset($_GET['searchString'])) {
            $searchString = $_GET['searchString'];
        }
        [$ubicazioni, $count] = $ubicazioneManager->get_ubicazioni_in_esaurimento($searchString);
          
        header('Content-Type: application/json');
        echo json_encode(['data' => $ubicazioni, 'count' => $count]);
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>