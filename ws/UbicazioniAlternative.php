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

    if (!$codUbicazione) {
        print_error(400, "Missing COD_UBICAZIONE");
    }
    if (!$codArticolo) {
        print_error(400, "Missing COD_ARTICOLO");
    }
    $list = $ubicazioniArticoliManager->getUbicazioniAlternative($codUbicazione, $codArticolo);
    if (!$list) {
        print_error(404, 'Nessuna ubicazione alternativa disponibile');
    }
    header('Content-Type: application/json');
    echo json_encode(['data' => $list, 'count' => count($list)]);
    }*/
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>