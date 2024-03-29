<?php

include("include/all.php");
$con = connect();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

$barcode = isset($_GET['barcode']) ? $con->escape_string($_GET['barcode']) : null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!$barcode) {
        print_error(404, 'Missing barcode');
    } else {
        $pieces = explode(';', $barcode);
        
        if(isset($pieces[POS_UBICAZIONE]) && isset($pieces[POS_ARTICOLO])){
            header('Content-Type: application/json');
            echo json_encode(['value' => ['COD_UBICAZIONE' => $pieces[POS_UBICAZIONE], 'COD_ARTICOLO' => $pieces[POS_ARTICOLO]]]);
        } else {
            print_error(404, 'Barcode Errato');
        }
    }
} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>