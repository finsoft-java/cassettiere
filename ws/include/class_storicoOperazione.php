<?php

$storicoOperazioneManager = new storicoOperazioniManager();

class storicoOperazioniManager {
    
    function get_storicoOperazioni($searchString, $dataInizio, $dataFine) {
        global $con;
        
        $sql0 = "SELECT COUNT(*) AS cnt ";
        $sql1 = "SELECT * ";
        $sql = "FROM storico_operazioni WHERE 1=1 ";
        if($dataInizio != null && $dataFine != null){
            $sql .= "AND TIMESTAMP BETWEEN '$dataInizio' AND '$dataFine' ";
        }
        if($searchString != null){
            $sql .= "AND (COD_UTENTE like '%$searchString%' or COD_ARTICOLO like '%$searchString%' or COD_OPERAZIONE  like '%$searchString%' or COD_ARTICOLO  like '%$searchString%' or COD_UBICAZIONE  like '%$searchString%' or COD_AREA  like '%$searchString%') ";
        }
        $sql .= "ORDER BY ID_OPERAZIONE DESC";
        $count = select_single_value($sql0 . $sql);
        $ubicazioni = select_list($sql1 . $sql);        
        return [$ubicazioni, $count];
    }
    
    function get_segnalazioni_attive($searchString) {
        global $con;
        
        $sql0 = "SELECT COUNT(*) AS cnt ";
        $sql1 = "SELECT * ";
        
        $sql = "FROM report_segnalazioni_attive WHERE 1=1 ";
        
        if ($searchString != null) {
            $sql .= "AND (COD_UBICAZIONE like '%$searchString%' or COD_ARTICOLO_CONTENUTO like '%$searchString%' or COD_AREA  like '%$searchString%' or DESCRIZIONE_AREA  like '%$searchString%' or COD_UTENTE like '%$searchString%' ) ";
        }

        $sql .= "ORDER BY COD_AREA, COD_UBICAZIONE ";
        $count = select_single_value($sql0 . $sql);
        $ubicazioni = select_list($sql1 . $sql);        
        return [$ubicazioni, $count];
    }
}
?>