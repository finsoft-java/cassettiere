<?php
error_reporting(E_ALL);

include("./include/all.php");
$con_b = connect_badge();

$list = select_list("SELECT * FROM elenco_badge", $con_b);

print_r($list);

?>