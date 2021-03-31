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

$id_area = isset($_GET['id_area']) ? $con->escape_string($_GET['id_area']) : null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        [$aree, $count] = $areeManager->get_aree($top, $skip, $orderby);
          
        header('Content-Type: application/json');
        echo json_encode(['data' => $aree, 'count' => $count]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    //==========================================================
    $postdata = file_get_contents("php://input");
    $json_data = json_decode($postdata);
    $id_area = '';
    
    if(isset($json_data->ID_PROGETTO)){
        $id_area = $json_data->ID_PROGETTO;
    }
    
    if (!$json_data) {
        print_error(400, "Missing JSON data");
    }
    if ($id_area) {
        print_error(400, "id_area must be null when creating new project");
    }
    $progetto = $areeManager->crea($json_data);
    
    header('Content-Type: application/json');
    echo json_encode(['value' => $progetto]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //==========================================================
    $postdata = file_get_contents("php://input");
    $json_data = json_decode($postdata);
    if (!$json_data) {
        print_error(400, "Missing JSON data");
    }
    $progetto_su_db = $areeManager->get_progetto($json_data->ID_PROGETTO);
    if (!$progetto_su_db) {
        print_error(404, 'Not found');
    }
    $areeManager->aggiorna($progetto_su_db, $json_data);
    
    $progetto_su_db = $areeManager->get_progetto($json_data->ID_PROGETTO);
    header('Content-Type: application/json');
    echo json_encode(['value' => $progetto_su_db]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    //==========================================================
    if (!$id_area) {
        print_error(400, 'Missing id_area');
    }
    $progetto_su_db = $areeManager->get_progetto($id_area);
    if (!$progetto_su_db) {
        print_error(404, 'Not found');
    }
    if (!$progetto_su_db->utente_puo_modificarlo()) {
        print_error(403, "Utente non autorizzato a modificare questo Progetto.");
    }
    if ($progetto_su_db->is_gia_compilato()) {
        print_error(403, "Non e' possibile eliminare un progetto con questionari già compilati.");
    }
    
    $areeManager->elimina($id_area);
    
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>