<?php

$contenitorePadreManager = new ContenitorePadreManager();

class ContenitorePadreManager {
    
    function get_contenitorePadre($search=null, $orderby=null, $skip=null, $top=null) {
        global $panthera;
        $sql  = "";
        $sql0 = "SELECT COUNT(*) AS cnt FROM contenitori_padre ";
        $sql1 = "SELECT COD_CONTENITORE, COD_AREA, DESCRIZIONE, ORDINE FROM contenitori_padre ";
        if ($search) {
            $search = strtoupper($search);
            $sql .= "WHERE (upper(COD_CONTENITORE) like '%$search%' || upper(COD_AREA) like '%$search%' || upper(DESCRIZIONE) like '%$search%')";
        }
        if ($orderby && preg_match("/^[a-zA-Z0-9,_ ]+$/", $orderby)) {
            // avoid SQL-injection
            $sql .= " ORDER BY $orderby";
        } else {
            $sql .= " ORDER BY COD_CONTENITORE";
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
    
    function get_contenitorePadrebyId($cod_contenitore) {
        global $panthera;
        $sql = "SELECT * FROM contenitori_padre c WHERE c.COD_CONTENITORE = '$cod_contenitore'";
        $ubi = select_single($sql);
        return $ubi;
    }

    function crea($json_data) {
        global $con, $logged_user; 
        if(isset($json_data->COD_CONTENITORE)) {
            $codContenitore = $json_data->COD_CONTENITORE;
        }else{
            $codContenitore = '';
        }
        if(isset($json_data->COD_AREA)) {
            $codArea = $json_data->COD_AREA;
        }else{
            $codArea = '';
        }        
        if(isset($json_data->DESCRIZIONE)) {
            $descrizione = $json_data->DESCRIZIONE;
        }else{
            $descrizione = '';
        }   
        if(isset($json_data->ORDINE)) {
            $ordine = $json_data->ORDINE;
        }else{
            $ordine = '';
        }
        $sql = insert("contenitori_padre", ["COD_CONTENITORE" => $codContenitore,
                                            "COD_AREA" => $codArea,
                                            "DESCRIZIONE" => $descrizione,
                                            "ORDINE" => $ordine]);
        mysqli_query($con, $sql);
        if ($con ->error) {
            print_error(500, $con ->error);
        }
        return $this->get_contenitorePadrebyId($json_data->COD_CONTENITORE);
    }
    
    function aggiorna($progetto, $json_data) {
        global $con;        
        if(isset($json_data->COD_CONTENITORE)) {
            $codContenitore = $json_data->COD_CONTENITORE;
        }else{
            $codContenitore = '';
        }
        if(isset($json_data->COD_AREA)) {
            $codArea = $json_data->COD_AREA;
        }else{
            $codArea = '';
        }        
        if(isset($json_data->DESCRIZIONE)) {
            $descrizione = $json_data->DESCRIZIONE;
        }else{
            $descrizione = '';
        }   
        if(isset($json_data->ORDINE)) {
            $ordine = $json_data->ORDINE;
        }else{
            $ordine = '';
        }

        $sql = update("contenitori_padre",["COD_AREA" => $codArea,
                                    "DESCRIZIONE" => $descrizione,
                                    "ORDINE" => $ordine], 
                               ["COD_CONTENITORE" => $json_data->COD_CONTENITORE]);
        mysqli_query($con, $sql);
        if ($con ->error) {
            print_error(500, $con ->error);
        }
    }
    
    function elimina($codContenitore) {
        global $con;
        $sql = "DELETE FROM contenitori_padre WHERE COD_CONTENITORE = '$codContenitore'";  //on delete cascade! (FIXME funziona anche con i questionari?!?)
        mysqli_query($con, $sql);
        if ($con ->error) {
            print_error(500, $con ->error);
        }
    }
}
?>