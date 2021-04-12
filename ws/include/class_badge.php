<?php

$badgeManager = new BadgeManager();

class BadgeManager {
    
    function get_username($rfid) {
        global $con_b;
        
        $query = "SELECT user FROM elenco_badge WHERE rfid_code='$rfid' ";
        $username = select_single_value($query, $con_b);
        if ($username == null) {
            print_error(404, 'Unrecognized RFID');
        }
        return $username;
    }
}
?>