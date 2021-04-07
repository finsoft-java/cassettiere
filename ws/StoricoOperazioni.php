<?php

// Prevedo le seguenti richieste:
// OPTIONS
// GET storicoOperazioni  -> lista di tutti i storicoOperazioni
include("include/all.php");
$con = connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}
require_logged_user_JWT();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $searchString = null;
    $dataInizio = null;
    $dataFine = null;
    if(isset($_GET['searchString'])) {
        $searchString = $_GET['searchString'];
    }
    if(isset($_GET['DATA_INIZIO'])) {
        $dataInizio = $_GET['DATA_INIZIO'];
    }
    if(isset($_GET['DATA_FINE'])) {
        $dataFine = $_GET['DATA_FINE'];
    }
    [$storicoOperazioni, $count] = $storicoOperazioneManager->get_storicoOperazioni($searchString,$dataInizio,$dataFine);
        
    header('Content-Type: application/json');
    echo json_encode(['data' => $storicoOperazioni, 'count' => $count]);
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>