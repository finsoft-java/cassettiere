<?php
//header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
//header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
include("./include/all.php");
use Firebase\JWT\JWT;
$con_b = connect_badge();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //do nothing, HTTP 200
    exit();
}


$user = '';
$postdata = $_POST;
if($postdata != ''){
    $rfid = $postdata["rfid"];
    if (!$rfid) {
        print_error(400, 'Missing RFID');
    }
    
    $username = $badgeManager->get_username($rfid);
    $user = check_and_load_user($username);
}

if ($user) {
    try {
        $user->username = JWT::encode($user, JWT_SECRET_KEY);
        $user->login = date("Y-m-d H:i:s");
        echo json_encode(['value' => $user]);
    } catch(Exception $e) {
        print_error(403, $e->getMessage());
    } catch (Error $e) {
        print_error(403, $e->getMessage());
    }
   
} else {
    session_unset();
    print_error(403, "Invalid credentials");
}


function check_and_load_user($username) {

    // PRIMA, proviamo la backdoor
    if ($username == 'finsoft') {
        $user = (object) [];
        $user->nome_utente = 'finsoft';
        $user->nome = 'Mario';
        $user->cognome = 'Rossi';
        $user->email = 'alessandro.barsanti@it-present.com';
        $user->ruolo = 'magazziniere'; // FIXME
        return $user;
    }

    // POI, proviamo su LDAP
    $user = $ldapManager->get_user();
    return $user;
}


?>