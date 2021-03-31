<?php

$areeManager = new AreeManager();

class AreeManager {
    
    function get_aree() {
        global $con;
        
        $sql0 = "SELECT COUNT(*) AS cnt ";
        $sql1 = "SELECT * ";
        $sql = "FROM aree p ";

        $sql .= " ORDER BY p.cod_area DESC";
        $count = select_single_value($sql0 . $sql);
        $aree = select_list($sql1 . $sql);        
        return [$aree, $count];
    }

    function crea($json_data) {
        global $con, $logged_user;
        $sql = insert("aree", ["COD_AREA" => $json_data->COD_AREA,
                                   "DESCRIZIONE" => $con->escape_string($json_data->TITOLO)
                                  ]);
        mysqli_query($con, $sql);
        if ($con ->error) {
            print_error(500, $con ->error);
        }
        $id_progetto = mysqli_insert_id($con);
        return $this->get_progetto($id_progetto);
    }
    
    function aggiorna($progetto, $json_data) {
        global $con, $STATO_PROGETTO;
        $titolo = $con->escape_string($json_data->TITOLO);
        
        $sql = update("aree", ["COD_AREA" => $json_data->COD_AREA,
                               "DESCRIZIONE" => $con->escape_string($json_data->DESCRIZIONE)], 
                               ["COD_AREA" => $json_data->COD_AREA]);
        mysqli_query($con, $sql);
        if ($con ->error) {
            print_error(500, $con ->error);
        }
    }
    
    function elimina($cod_area) {
        global $con;
        $sql = "DELETE FROM aree WHERE COD_AREA = '$cod_area'";  //on delete cascade! (FIXME funziona anche con i questionari?!?)
        mysqli_query($con, $sql);
        if ($con ->error) {
            print_error(500, $con ->error);
        }
    }

}
?>