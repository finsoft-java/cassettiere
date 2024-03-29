<?php 

/* DATABASE CASSETTIERE */
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'cassettiere');

/* DATABASE BADGE */
define('DB_HOST_BADGE', 'localhost');
define('DB_USER_BADGE', 'root');
define('DB_PASS_BADGE', '');
define('DB_NAME_BADGE', 'cassettiere');

define('JWT_SECRET_KEY', 'OSAISECRET2021');

/* LDAP / ACTIVE DIRECTORY */
define('AD_SERVER', 'ldap://osai.loc');
define('AD_DOMAIN', 'OSAI.LOC');
// define('AD_BASE_DN', "dc=OSAI,dc=LOC");
define('AD_BASE_DN', "OU=Users,OU=OU Osai.it,DC=osai,DC=loc");
// AD_FILTER: è il gruppo dei "Magazzinieri"
// Solo i magazzinieri possono accedere al backend.
// Invece al frontend possono accedere tutti gli utenti con badge, tuttavia i magazzinieri hanno più privilegi.
define('AD_FILTER', '(memberOf=CN=Gruppo Logistica,OU=OU Osai Groups,DC=osai,DC=loc)');
define('AD_USERNAME', 'surveyosai@OSAI.LOC');
define('AD_PASSWORD', 's0fu3Y2o19!');

/* DATABASE PANTHERA */
define('MOCK_PANTHERA', 'true');
define('DB_PTH_HOST', 'tcp:myserver.database.windows.net,1433');
define('DB_PTH_USER', 'my_user');
define('DB_PTH_PASS', 'my_pwd');
define('DB_PTH_NAME', 'PANTH01');

/* PARAMETRI PER LETTURA BARCODE CSV */
define('POS_UBICAZIONE', '1');
define('POS_ARTICOLO', '0');

?>