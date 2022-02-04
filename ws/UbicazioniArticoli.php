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

$codUbicazione = isset($_GET['COD_UBICAZIONE']) ? $con->escape_string($_GET['COD_UBICAZIONE']) : null;
$codContenitore = isset($_GET['COD_CONTENITORE']) ? $con->escape_string($_GET['COD_CONTENITORE']) : null;
$codArticolo = isset($_GET['COD_ARTICOLO']) ? $con->escape_string($_GET['COD_ARTICOLO']) : null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($codContenitore) {
        $object = $ubicazioniArticoliManager->getUbicazioneArticoliByContenitorePadre($codContenitore);
        if (!$object) {
            print_error(404, 'Contenitore Padre inesistente: ' . $codContenitore);
        }
        header('Content-Type: application/json');
        echo json_encode(['data' => $object, 'count' => count($object)]);
    } else if($codUbicazione && $codArticolo){
        $object = $ubicazioniArticoliManager->getUbicazioneArticoliById($codUbicazione);
        if (!$object) {
            print_error(404, 'UbicazioneArticolo inesistente: ' . $codUbicazione);
        }
        header('Content-Type: application/json');
        echo json_encode(['value' => $object]);
    } else {
        $orderby = isset($_GET['orderby']) ? $con->escape_string($_GET['orderby']) : null;
        $search = isset($_GET['search']) ? $con->escape_string($_GET['search']) : null;
        $skip = isset($_GET['skip']) ? $con->escape_string($_GET['skip']) : null;
        $top = isset($_GET['top']) ? $con->escape_string($_GET['top']) : null;
        [$ubicazioni, $count] = $ubicazioniArticoliManager->getUbicazioniArticoli($search, $orderby, $skip, $top);
              
        header('Content-Type: application/json');
        echo json_encode(['data' => $ubicazioni, 'count' => $count]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //==========================================================
    $postdata = file_get_contents("php://input");
    $json_data = json_decode($postdata);    
    if (!$json_data) {
        print_error(400, "Missing JSON data");
    }
    $ubicazioniArticoli = $ubicazioniArticoliManager->crea($json_data);
    
    header('Content-Type: application/json');
    echo json_encode(['value' => $ubicazioniArticoli]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    //==========================================================
    $postdata = file_get_contents("php://input");
    $json_data = json_decode($postdata);
    if (!$json_data) {
        print_error(400, "Missing JSON data");
    }
    $ubicazioniArticoli = $ubicazioniArticoliManager->getUbicazioneArticoliById($json_data->COD_UBICAZIONE, $json_data->COD_ARTICOLO);
    if (!$ubicazioniArticoli) {
        print_error(404, 'Not found');
    }
    $ubicazioniArticoliManager->aggiorna($ubicazioniArticoli, $json_data);
    
    $ubicazioniArticoli = $ubicazioniArticoliManager->getUbicazioneArticoliById($json_data->COD_UBICAZIONE, $json_data->COD_ARTICOLO);
    header('Content-Type: application/json');
    echo json_encode(['value' => $ubicazioniArticoli]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    //==========================================================
    if (!$codUbicazione) {
        print_error(400, 'Missing cod_ubicazione');
    }
    if (!$codArticolo) {
        print_error(400, 'Missing cod_ubicazione');
    }    
    $obj = $ubicazioniArticoliManager->getUbicazioneArticoliById($codUbicazione, $codArticolo);
    if (!$obj) {
        print_error(404, 'Not found');
    }
    
    $ubicazioniArticoliManager->elimina($codUbicazione, $codArticolo);
    
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>