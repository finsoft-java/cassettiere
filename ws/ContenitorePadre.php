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
$panthera->connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

// Disabilito la protezione per permettere l'utilizzo da tablet
// require_logged_user_JWT();

$cod_contenitore = isset($_GET['COD_CONTENITORE']) ? $con->escape_string($_GET['COD_CONTENITORE']) : null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($cod_contenitore) {
        $object = $contenitorePadreManager->get_contenitorePadrebyId($cod_contenitore);
        if (!$object) {
            print_error(404, 'Contenitore Padre inesistente: ' . $cod_contenitore);
        }
        header('Content-Type: application/json');
        echo json_encode(['value' => $object]);
    } else {
        $orderby = isset($_GET['orderby']) ? $con->escape_string($_GET['orderby']) : null;
        $search = isset($_GET['search']) ? $con->escape_string($_GET['search']) : null;
        $skip = isset($_GET['skip']) ? $con->escape_string($_GET['skip']) : null;
        $top = isset($_GET['top']) ? $con->escape_string($_GET['top']) : null;
        [$contenitorePadre, $count] = $contenitorePadreManager->get_contenitorePadre($search, $orderby, $skip, $top);
              
        header('Content-Type: application/json');
        echo json_encode(['data' => $contenitorePadre, 'count' => $count]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //==========================================================
    $postdata = file_get_contents("php://input");
    $json_data = json_decode($postdata);
    
    if (!$json_data) {
        print_error(400, "Missing JSON data");
    }
    $area = $contenitorePadreManager->crea($json_data);
    
    header('Content-Type: application/json');
    echo json_encode(['value' => $area]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    //==========================================================
    $postdata = file_get_contents("php://input");
    $json_data = json_decode($postdata);
    if (!$json_data) {
        print_error(400, "Missing JSON data");
    }
    $contenitorePadreManager->aggiorna("", $json_data);
    
    $contenitorePadre = $contenitorePadreManager->get_contenitorePadrebyId($json_data->COD_CONTENITORE);
    header('Content-Type: application/json');
    echo json_encode(['value' => $contenitorePadre]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    //==========================================================
    if (!$cod_contenitore) {
        print_error(400, 'Missing cod_contenitore');
    }
    $area_su_db = $contenitorePadreManager->get_contenitorePadrebyId($cod_contenitore);
    if (!$area_su_db) {
        print_error(404, 'Not found');
    }
    
    $contenitorePadreManager->elimina($cod_contenitore);
    
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>