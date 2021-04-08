<?php

$storicoOperazioneManager = new storicoOperazioniManager();

class storicoOperazioniManager {
    
    function get_storicoOperazioni($search, $dataInizio, $dataFine) {
        global $con;
        
        $sql0 = "SELECT COUNT(*) AS cnt ";
        $sql1 = "SELECT * ";
        $sql = "FROM storico_operazioni WHERE 1=1 ";
        if ($dataInizio != null && $dataFine != null){
            $sql .= "AND TIMESTAMP BETWEEN '$dataInizio' AND '$dataFine' ";
        }
        if ($search != null){
            $search = strtoupper($search);
            $sql .= "AND (upper(COD_UTENTE) like '%$search%' or upper(COD_ARTICOLO) like '%$search%' or upper(COD_OPERAZIONE)  like '%$search%' or upper(COD_ARTICOLO) like '%$search%' or upper(COD_UBICAZIONE) like '%$search%' or upper(COD_AREA) like '%$search%') ";
        }
        $sql .= "ORDER BY ID_OPERAZIONE DESC";
        $count = select_single_value($sql0 . $sql);
        $ubicazioni = select_list($sql1 . $sql);        
        return [$ubicazioni, $count];
    }
    
    function get_segnalazioni_attive($search) {
        global $con;
        
        $sql0 = "SELECT COUNT(*) AS cnt ";
        $sql1 = "SELECT * ";
        
        $sql = "FROM report_segnalazioni_attive WHERE 1=1 ";
        
        if ($search != null) {
            $search = strtoupper($search);
            $sql .= "AND (upper(COD_UBICAZIONE) like '%$search%' or upper(COD_ARTICOLO_CONTENUTO) like '%$search%' or upper(COD_AREA) like '%$search%' or upper(DESCRIZIONE_AREA) like '%$search%' or upper(COD_UTENTE) like '%$search%' ) ";
        }

        $sql .= "ORDER BY COD_AREA, COD_UBICAZIONE ";
        $count = select_single_value($sql0 . $sql);
        $ubicazioni = select_list($sql1 . $sql);        
        return [$ubicazioni, $count];
    }
}
?>