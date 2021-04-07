<?php

include("include/all.php");
$panthera->connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

require_logged_user_JWT();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $search = isset($_GET['searchString']) ? $con->escape_string($_GET['searchString']) : null;
    $top = isset($_GET['top']) ? $con->escape_string($_GET['top']) : null;
    $skip = isset($_GET['skip']) ? $con->escape_string($_GET['skip']) : null;

    [$articoli, $count] = $panthera->get_articoli($top, $skip, $search);

    header('Content-Type: application/json');
    echo json_encode(['data' => $articoli, 'count' => $count]);
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>