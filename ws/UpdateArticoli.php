<?php

// Questo script è da lanciare a manina per allineare DISEGNO e DESCRIZIONE degli articoli


include("include/all.php");
$con = connect();
$panthera->connect();


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

// require_logged_user_JWT();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $query = "SELECT DISTINCT COD_ARTICOLO FROM ubicazioni_articoli";
    $articoli = select_column($query);
    foreach($articoli as $a) {
        $query = "SELECT DESCR_ESTESA,DISEGNO FROM THIP.ARTICOLI WHERE ID_ARTICOLO='$a' ";
        $data = $panthera->select_single($query);
        $descrizione = $data['DESCR_ESTESA'];
        $disegno = $data['DISEGNO'];
        $query = "UPDATE ubicazioni_articoli SET DESCRIZIONE='$descrizione', DISEGNO='$disegno' WHERE COD_ARTICOLO='$a'";
        execute_update($query);
    }

    echo "Done.";

} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>