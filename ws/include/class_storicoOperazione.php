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

    function segnala_esaurimento($codUbicazione, $codUtente) {
        $query = "SELECT count(*) FROM ubicazioni WHERE cod_ubicazione='$codUbicazione'";
        $num = select_single_value($query);
        if ($num == 0) {
            print_error(404, "Ubicazione inesistente: $codUbicazione");
        }

        $query = "UPDATE ubicazioni SET segnalazione_esaurimento='Y' WHERE cod_ubicazione='$codUbicazione'";
        $num_updated = execute_update($query);
        if ($num_updated == 0) {
            print_error(404, "Ubicazione inesistente: $codUbicazione");
        }

        $query = "INSERT INTO `storico_operazioni` (`COD_UTENTE`, `COD_OPERAZIONE`, `COD_ARTICOLO`, `COD_UBICAZIONE`, `COD_AREA`)
            SELECT '$codUtente', 'ESAURIMENTO', COD_ARTICOLO_CONTENUTO, '$codUbicazione', COD_AREA
            FROM ubicazioni
            WHERE COD_UBICAZIONE='$codUbicazione'";
        execute_update($query);
    }

    function segnala_rabbocco_singolo($codUbicazione, $codUtente) {
        $query = "SELECT count(*) FROM ubicazioni WHERE cod_ubicazione='$codUbicazione'";
        $num = select_single_value($query);
        if ($num == 0) {
            print_error(404, "Ubicazione inesistente: $codUbicazione");
        }

        $query = "UPDATE ubicazioni SET segnalazione_esaurimento='N' WHERE cod_ubicazione='$codUbicazione'";
        execute_update($query);

        $query = "INSERT INTO `storico_operazioni` (`COD_UTENTE`, `COD_OPERAZIONE`, `COD_ARTICOLO`, `COD_UBICAZIONE`, `COD_AREA`)
            SELECT '$codUtente', 'RABBOCCO', COD_ARTICOLO_CONTENUTO, '$codUbicazione', COD_AREA
            FROM ubicazioni
            WHERE COD_UBICAZIONE='$codUbicazione'";
        execute_update($query);
    }

    function segnala_rabbocco($lista_codici, $codUtente) {
        foreach ($lista_codici as $codUbicazione) {
            $this->segnala_rabbocco_singolo($codUbicazione, $codUtente);
        }
    }
}
?>