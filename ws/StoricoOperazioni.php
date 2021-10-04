<?php

// Prevedo le seguenti richieste:
// OPTIONS
// GET storicoOperazioni  -> lista di tutti i storicoOperazioni
include("include/all.php");
$con = connect();
$panthera->connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}
require_logged_user_JWT();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $search = isset($_GET['search']) ? $con->escape_string($_GET['search']) : null;
    $dataInizio = isset($_GET['DATA_INIZIO']) ? $con->escape_string($_GET['DATA_INIZIO']) : null;
    $dataFine = isset($_GET['DATA_FINE']) ? $con->escape_string($_GET['DATA_FINE']) : null;
    $skip = isset($_GET['skip']) ? $con->escape_string($_GET['skip']) : null;
    $top = isset($_GET['top']) ? $con->escape_string($_GET['top']) : null;
    [$storicoOperazioni, $count] = $storicoOperazioneManager->get_storicoOperazioni($search, $dataInizio, $dataFine, $skip, $top);
        
    header('Content-Type: application/json');
    echo json_encode(['data' => $storicoOperazioni, 'count' => $count]);
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>