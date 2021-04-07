<?php

include("include/all.php");
$con = connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

require_logged_user_JWT();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    [$ubicazioni, $count] = $ubicazioneManager->get_ubicazioni_per_area();

    header('Content-Type: application/json');
    echo json_encode(['data' => $ubicazioni, 'count' => $count]);
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>