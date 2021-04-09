<?php 

/* docker
define('DB_HOST', 'db');
define('DB_USER', 'user');
define('DB_PASS', 'user');
define('DB_NAME', 'questionari');
*/
/* sviluppo */
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'cassettiere');

define('DB_HOST_BADGE', 'localhost');
define('DB_USER_BADGE', 'root');
define('DB_PASS_BADGE', '');
define('DB_NAME_BADGE', 'cassettiere');

/* produzione 
define('DB_HOST', 'localhost');
define('DB_USER', 'rd');
define('DB_PASS', 'Wn#5OHGt');
define('DB_NAME', 'rd');
*/
define('JWT_SECRET_KEY', 'OSAISECRET2021');

define('AD_SERVER', 'ldap://osai.loc');
define('AD_DOMAIN', 'OSAI.LOC');
define('AD_BASE_DN', "dc=OSAI,dc=LOC");
// define('AD_FILTER', '(&(|(objectclass=person))(|(|(memberof=CN=OSAI-IT Users,OU=OU Osai Groups,DC=osai,DC=loc)(primaryGroupID=1202))(|(memberof=CN=OSAI-DE Users,OU=OU Osai Groups,DC=osai,DC=loc)(primaryGroupID=2625))(|(memberof=CN=OSAI-CN Users,OU=OU Osai Groups,DC=osai,DC=loc)(primaryGroupID=3233))(|(memberof=CN=OSAI-US Users,OU=OU Osai Groups,DC=osai,DC=loc)(primaryGroupID=4426))))');
// define('AD_USERNAME', 'surveyosai@OSAI.LOC');
// define('AD_PASSWORD', 's0fu3Y2o19!');


define('MOCK_PANTHERA', 'true');
define('DB_PTH_HOST', 'tcp:myserver.database.windows.net,1433');
define('DB_PTH_USER', 'my_user');
define('DB_PTH_PASS', 'my_pwd');
define('DB_PTH_NAME', 'PANTH01');
?>