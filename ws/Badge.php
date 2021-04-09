<?php

// Prende in input il rfid dell'utente, restituisce un oggetto con il nome utente, oppure 404 NOT FOUND

include("include/all.php");
$con = connect();
$con_b = connect_badge();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $rfid = isset($_GET['rfid']) ? $con->escape_string($_GET['rfid']) : null;
    if (!$rfid) {
        print_error(400, 'Missing RFID');
    }
    $username = $badgeManager->get_username($rfid);
        
    header('Content-Type: application/json');
    echo json_encode(['value' => [ 'username' => $username ]]);
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>