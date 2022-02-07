<?php

include("include/all.php");
$con = connect();
// $panthera->connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

require_logged_user_JWT();

$codUbicazione = isset($_GET['COD_UBICAZIONE']) ? $con->escape_string($_GET['COD_UBICAZIONE']) : null;
$codArticolo = isset($_GET['COD_ARTICOLO']) ? $con->escape_string($_GET['COD_ARTICOLO']) : null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // TODO DEVE FILTRARE PER CODICE ARTICOLO E POI TOGLIERE L'UBICAZIONE DI PARTENZA


    
    /*if ($codContenitore) {
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
    }*/
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>