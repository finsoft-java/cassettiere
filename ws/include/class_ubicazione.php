<?php

$ubicazioneManager = new UbicazioniManager();

class UbicazioniManager {
    
    function get_ubicazioni() {
        global $con;
        
        $sql0 = "SELECT COUNT(*) AS cnt ";
        $sql1 = "SELECT ub.COD_UBICAZIONE,ub.COD_ARTICOLO_CONTENUTO,ub.SEGNALAZIONE_ESAURIMENTO, ub.QUANTITA_PREVISTA ,ub.COD_AREA, ar.DESCRIZIONE as DESCRIZIONE_AREA ";
        
        $sql = "FROM ubicazioni ub join aree ar on ub.cod_area = ar.COD_AREA";
        $sql .= " ORDER BY ub.COD_UBICAZIONE DESC";
        $count = select_single_value($sql0 . $sql);
        $ubicazioni = select_list($sql1 . $sql);        
        return [$ubicazioni, $count];
    }
    
    function get_ubicazione($cod_ubicazione) {
        $sql = "SELECT * FROM ubicazioni p WHERE p.cod_ubicazione = '$cod_ubicazione'";
        return select_single($sql);
    }

    function crea($json_data) {
        global $con, $logged_user;
        $sql = insert("ubicazioni", ["COD_UBICAZIONE" => $json_data->COD_UBICAZIONE,
                                     "COD_ARTICOLO_CONTENUTO" => $json_data->COD_ARTICOLO_CONTENUTO,
                                     "QUANTITA_PREVISTA" => $json_data->QUANTITA_PREVISTA,
                                     "COD_AREA " => $json_data->COD_AREA,
                                     "SEGNALAZIONE_ESAURIMENTO" => $json_data->SEGNALAZIONE_ESAURIMENTO
                                  ]);
        mysqli_query($con, $sql);
        if ($con ->error) {
            print_error(500, $con ->error);
        }
        return $this->get_ubicazione($json_data->COD_UBICAZIONE);
    }
    
    function aggiorna($progetto, $json_data) {
        global $con, $STATO_PROGETTO;        
        $sql = update("ubicazioni", ["COD_ARTICOLO_CONTENUTO" => $json_data->COD_ARTICOLO_CONTENUTO,
                               "QUANTITA_PREVISTA" => $json_data->QUANTITA_PREVISTA,
                               "COD_AREA " => $json_data->COD_AREA,
                               "SEGNALAZIONE_ESAURIMENTO" => $json_data->SEGNALAZIONE_ESAURIMENTO], 
                               ["COD_UBICAZIONE" => $json_data->COD_UBICAZIONE]);
        mysqli_query($con, $sql);
        if ($con ->error) {
            print_error(500, $con ->error);
        }
    }
    
    function elimina($cod_ubicazione) {
        global $con;
        $sql = "DELETE FROM ubicazioni WHERE COD_UBICAZIONE = '$cod_ubicazione'";  //on delete cascade! (FIXME funziona anche con i questionari?!?)
        mysqli_query($con, $sql);
        if ($con ->error) {
            print_error(500, $con ->error);
        }
    }
    
    function get_ubicazioni_in_esaurimento($searchString) {
        global $con;
        
        $sql0 = "SELECT COUNT(*) AS cnt ";
        $sql1 = "SELECT ub.COD_UBICAZIONE,ub.COD_ARTICOLO_CONTENUTO, ub.QUANTITA_PREVISTA ,ub.COD_AREA, ar.DESCRIZIONE as DESCRIZIONE_AREA ";
        
        $sql = "FROM ubicazioni ub join aree ar on ub.cod_area = ar.COD_AREA ";
        $sql .= "WHERE SEGNALAZIONE_ESAURIMENTO='Y' ";
        
        if ($searchString != null) {
            $sql .= "AND (ub.COD_UBICAZIONE like '%$searchString%' or ub.COD_ARTICOLO_CONTENUTO like '%$searchString%' or ub.COD_AREA  like '%$searchString%' or ar.DESCRIZIONE  like '%$searchString%' ) ";
        }

        $sql .= "ORDER BY ub.COD_UBICAZIONE DESC ";
        $count = select_single_value($sql0 . $sql);
        $ubicazioni = select_list($sql1 . $sql);        
        return [$ubicazioni, $count];
    }

}
?>