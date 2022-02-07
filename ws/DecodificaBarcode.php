<?php

include("include/all.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

require_logged_user_JWT();

$barcode = isset($_GET['barcode']) ? $con->escape_string($_GET['barcode']) : null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!$barcode) {
        print_error(404, 'Missing barcode');
    } else {
        $pieces = explode(';', $barcode);
        header('Content-Type: application/json');
        echo json_encode(['value' => ['COD_UBICAZIONE' => $pieces[POS_UBICAZIONE], 'COD_ARTICOLO' => $pieces[POS_ARTICOLO]]]);
    }
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>