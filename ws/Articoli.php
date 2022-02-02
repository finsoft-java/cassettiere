<?php

include("include/all.php");
$panthera->connect();


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}

require_logged_user_JWT();

$idArticolo = isset($_GET['ID_ARTICOLO']) ? $panthera->escape_string($_GET['ID_ARTICOLO']) : null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if($idArticolo){
        $articoli = $panthera->get_articolo($idArticolo);
        header('Content-Type: application/json');
        echo json_encode(['value' => $articoli]);
    } else {
        $search = isset($_GET['search']) ? $panthera->escape_string($_GET['search']) : null;
        $top = isset($_GET['top']) ? $panthera->escape_string($_GET['top']) : null;
        $skip = isset($_GET['skip']) ? $panthera->escape_string($_GET['skip']) : null;    
        [$articoli, $count] = $panthera->get_articoli($top, $skip, $search);
        header('Content-Type: application/json');
        echo json_encode(['data' => $articoli, 'count' => $count]);
    }    

} else {
    //==========================================================
    print_error(400, "Unsupported method in request: " . $_SERVER['REQUEST_METHOD']);
}


?>