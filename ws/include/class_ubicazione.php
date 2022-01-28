<?php

$ubicazioneManager = new UbicazioniManager();

class UbicazioniManager {
    
    function get_ubicazioni($search=null, $orderby=null, $skip=null, $top=null) {
        global $panthera;
        $sql  = "";
        $sql0 = "SELECT COUNT(*) AS cnt FROM ubicazioni ";
        $sql1 = "SELECT COD_UBICAZIONE,COD_CONTENITORE as COD_CONTENITORE FROM ubicazioni ";
        if ($search) {
            $search = strtoupper($search);
            $sql .= "WHERE (upper(COD_UBICAZIONE) like '%$search%')";
        }
        if ($orderby && preg_match("/^[a-zA-Z0-9,_ ]+$/", $orderby)) {
            // avoid SQL-injection
            $sql .= " ORDER BY $orderby";
        } else {
            $sql .= " ORDER BY COD_UBICAZIONE";
        }
        //echo $sql0 . $sql;
        $count = select_single_value($sql0 . $sql);

        if ($top != null){
            if ($skip != null) {
                $sql .= " LIMIT $skip,$top";
            } else {
                $sql .= " LIMIT $top";
            }
        }
        //echo $sql1 . $sql;
        $ubicazioni = select_list($sql1 . $sql);
        return [$ubicazioni, $count];
    }
    
    function get_ubicazione($cod_ubicazione) {
        global $panthera;
        $sql = "SELECT * FROM ubicazioni p WHERE p.cod_ubicazione = '$cod_ubicazione'";
        $ubi = select_single($sql);
        return $ubi;
    }

    function crea($json_data) {
        global $con, $logged_user;
        
        if(isset($json_data->COD_UBICAZIONE)) {
            $codUbi = $json_data->COD_UBICAZIONE;
        }else{
            $codUbi = '';
        }
        if(isset($json_data->COD_CONTENITORE)) {
            $codContenitore = $json_data->COD_CONTENITORE;
        }else{
            $codContenitore = '';
        }
        $sql = insert("ubicazioni", ["COD_UBICAZIONE" => $codUbi,
                                     "COD_CONTENITORE" => $codContenitore]);
        mysqli_query($con, $sql);
        if ($con ->error) {
            print_error(500, $con ->error);
        }
        return $this->get_ubicazione($json_data->COD_UBICAZIONE);
    }
    
    function aggiorna($progetto, $json_data) {
        global $con, $STATO_PROGETTO;        

        if(isset($json_data->COD_UBICAZIONE)) {
            $codUbi = $json_data->COD_UBICAZIONE;
        }else{
            $codUbi = '';
        }
        if(isset($json_data->COD_CONTENITORE)) {
            $codContenitore = $json_data->COD_CONTENITORE;
        }else{
            $codContenitore = '';
        }

        $sql = update("ubicazioni", ["COD_CONTENITORE" => $json_data->COD_CONTENITORE], 
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

    function get_ubicazioni_per_area() {
        global $con;
        
        $sql0 = "SELECT COUNT(*) AS cnt ";
        $sql1 = "SELECT * ";

        $sql = "FROM report_ubicazioni_per_area ";
        $sql .= "ORDER BY COD_AREA ";
        $count = select_single_value($sql0 . $sql);
        $ubicazioni = select_list($sql1 . $sql);        
        return [$ubicazioni, $count];
    }
}
?>