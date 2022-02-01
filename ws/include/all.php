<?php 
use Firebase\JWT\JWT;
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");
header("Access-Control-Allow-Headers: Accept,Content-Type,Authorization");
# Chrome funziona anche con Access-Control-Allow-Headers: *  invece Firefox no

require 'vendor/autoload.php';

include("config.php");
include("costanti.php");
include("functions.php");
include("class_area.php");
include("class_ubicazione.php");
include("class_ubicazioniArticoli.php");
include("class_contenitore_padre.php");
include("class_storicoOperazione.php");
include("class_panthera.php");
include("class_badge.php");
include("class_ldap.php");