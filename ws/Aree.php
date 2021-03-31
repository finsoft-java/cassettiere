<?php

// Prevedo le seguenti richieste:
// OPTIONS
// GET Progetti  -> lista di tutti i aree
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

$cod_area = isset($_GET['COD_AREA']) ? $con->escape_string($_GET['COD_AREA']) : null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        [$aree, $count] = $areeManager->get_aree();
          
        header('Content-Type: application/json');
        echo json_encode(['data' => $aree, 'count' => $count]);
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
    $area = $areeManager->crea($json_data);
    
    header('Content-Type: application/json');
    echo json_encode(['value' => $area]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    //==========================================================
    $postdata = file_get_contents("php://input");
    $json_data = json_decode($postdata);
    if (!$json_data) {
        print_error(400, "Missing JSON data");
    }
    $area_su_db = $areeManager->get_area($json_data->COD_AREA);
    if (!$area_su_db) {
        print_error(404, 'Not found');
    }
    $areeManager->aggiorna($area_su_db, $json_data);
    
    $area_su_db = $areeManager->get_area($json_data->COD_AREA);
    header('Content-Type: application/json');
    echo json_encode(['value' => $area_su_db]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    //==========================================================
    if (!$cod_area) {
        print_error(400, 'Missing cod_area');
    }
    $area_su_db = $areeManager->get_area($cod_area);
    if (!$area_su_db) {
        print_error(404, 'Not found');
    }
    
    $areeManager->elimina($cod_area);
    
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>