<?php

// Prevedo le seguenti richieste:
// OPTIONS
// GET Progetti  -> lista di tutti i ubicazioni
// GET Progetti?id_area=xxx  -> singolo progetto
// PUT Progetti -> creazione nuovo progetto
// POST Progetti -> update progetto esistente
// DELETE Progetti?id_area=xxx -> elimina progetto esistente
include("include/all.php");
$con = connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

require_logged_user_JWT();

$cod_ubicazione = isset($_GET['COD_UBICAZIONE']) ? $con->escape_string($_GET['COD_UBICAZIONE']) : null;
$cod_area = isset($_GET['COD_AREA']) ? $con->escape_string($_GET['COD_AREA']) : null;
$sort = isset($_GET['SORT']) ? $con->escape_string($_GET['SORT']) : null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        [$ubicazioni, $count] = $ubicazioneManager->get_ubicazioni($cod_area, $sort);
          
        header('Content-Type: application/json');
        echo json_encode(['data' => $ubicazioni, 'count' => $count]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //==========================================================
    $postdata = file_get_contents("php://input");
    $json_data = json_decode($postdata);
    
    if(isset($json_data->ID_PROGETTO)){
        $id_area = $json_data->ID_PROGETTO;
    }
    
    if (!$json_data) {
        print_error(400, "Missing JSON data");
    }
    $area = $ubicazioneManager->crea($json_data);
    
    header('Content-Type: application/json');
    echo json_encode(['value' => $area]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    //==========================================================
    $postdata = file_get_contents("php://input");
    $json_data = json_decode($postdata);
    if (!$json_data) {
        print_error(400, "Missing JSON data");
    }
    $area_su_db = $ubicazioneManager->get_ubicazione($json_data->COD_UBICAZIONE);
    if (!$area_su_db) {
        print_error(404, 'Not found');
    }
    $ubicazioneManager->aggiorna($area_su_db, $json_data);
    
    $area_su_db = $ubicazioneManager->get_ubicazione($json_data->COD_UBICAZIONE);
    header('Content-Type: application/json');
    echo json_encode(['value' => $area_su_db]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    //==========================================================
    if (!$cod_ubicazione) {
        print_error(400, 'Missing cod_ubicazione');
    }
    $area_su_db = $ubicazioneManager->get_ubicazione($cod_ubicazione);
    if (!$area_su_db) {
        print_error(404, 'Not found');
    }
    
    $ubicazioneManager->elimina($cod_ubicazione);
    
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>