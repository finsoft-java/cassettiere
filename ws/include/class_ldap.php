<?php

$ldapManager = new LdapManager();

class LdapManager {
    
    function get_user($username) {

        $ldap_connection = ldap_connect(AD_SERVER);
        if (FALSE === $ldap_connection) {
            print_error(500, "Errore interno nella configurazione di Active Directory: " . AD_SERVER);
        }

        // We have to set this option for the version of Active Directory we are using.
        ldap_set_option($ldap_connection, LDAP_OPT_PROTOCOL_VERSION, 3) or die('Unable to set LDAP protocol version');
        ldap_set_option($ldap_connection, LDAP_OPT_REFERRALS, 0); // We need this for doing an LDAP search.

        ini_set('display_errors', 0);  // Se ci sono errori, ldap_bind() scrive sullo stdout e fa casino....
        $bind = ldap_bind($ldap_connection, AD_USERNAME, AD_PASSWORD);
        if ($bind !== TRUE) {
            print_error(502, "Impossibile connettersi al server Active Directory");
        }

        $ldap_base_dn = AD_BASE_DN;
        $search_filter = "(&(|(objectCategory=person)(objectClass=user))(sAMAccountName=$username))";
        $attributes = array();
        $attributes[] = 'givenname';
        $attributes[] = 'mail';
        $attributes[] = 'samaccountname';
        $attributes[] = 'sn';
        $result = ldap_search($ldap_connection, $ldap_base_dn, $search_filter, $attributes);
        
        $user = null;

        if (FALSE !== $result){
            $entries = ldap_get_entries($ldap_connection, $result);
            
            // should be exactly 1
            if ($entries['count'] != 1) {
                ldap_unbind($ldap_connection); // Clean up after ourselves.
                print_error(500, 'More than 1 user found for username ' . $username);
            }

            $entry = $entries[0];
            $user = [
                'username' => $entry['samaccountname'][0],
                'nome' => $entry['givenname'][0],
                'cognome' => $entry['sn'][0],
                'email' => $entry['mail'][0]
            ];
        }
        ldap_unbind($ldap_connection); // Clean up after ourselves.

        if ($user == null) {
            print_error(404, 'Username not recognized: ' . $username);
        }

        return $user;
    }
}
?>