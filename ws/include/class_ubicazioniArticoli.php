<?php

$ubicazioniArticoliManager = new UbicazioniArticoliManager();

class UbicazioniArticoliManager {
    
    function getUbicazioniArticoli($search=null, $orderby=null, $skip=null, $top=null) {
        $sql  = "";
        $sql0 = "SELECT COUNT(*) AS cnt FROM ubicazioni_articoli ";
        $sql1 = "SELECT COD_UBICAZIONE, COD_ARTICOLO, QUANTITA_PREVISTA, SEGNALAZIONE_ESAURIMENTO, DISEGNO, DESCRIZIONE, NOTE FROM ubicazioni_articoli ";
        if ($search) {
            $search = strtoupper($search);
            $sql .= "WHERE (upper(COD_UBICAZIONE) like '%$search%' || upper(COD_ARTICOLO) like '%$search%' || upper(DISEGNO) like '%$search%' || upper(DESCRIZIONE) like '%$search%')";
        }
        if ($orderby && preg_match("/^[a-zA-Z0-9,_ ]+$/", $orderby)) {
            // avoid SQL-injection
            $sql .= " ORDER BY $orderby";
        } else {
            $sql .= " ORDER BY COD_UBICAZIONE";
        }
        //echo $sql0 . $sql;
        $count = select_single_value($sql0 . $sql);

        if ($top != null) {
            if ($skip != null) {
                $sql .= " LIMIT $skip,$top";
            } else {
                $sql .= " LIMIT $top";
            }
        }
        //echo $sql1 . $sql;
        $ubicazioni_articoli = select_list($sql1 . $sql);
        return [$ubicazioni_articoli, $count];
    }
    
    function getUbicazioneArticoliByContenitorePadre($cod_contenitore) {
        $sql = "SELECT u.*,ua.COD_ARTICOLO,ua.QUANTITA_PREVISTA,ua.SEGNALAZIONE_ESAURIMENTO,ua.DISEGNO,ua.DESCRIZIONE,ua.NOTE
                FROM ubicazioni u
                LEFT JOIN ubicazioni_articoli ua ON u.COD_UBICAZIONE = ua.COD_UBICAZIONE
                WHERE COD_CONTENITORE = '$cod_contenitore'";
        $ubi = select_list($sql);
        return $ubi;
    }

    function getUbicazioneArticoliByUbi($cod_ubicazione) {
        $sql = "SELECT * FROM ubicazioni_articoli 
                WHERE COD_UBICAZIONE = '$cod_ubicazione'";
        $ubi = select_single($sql);
        return $ubi;
    }
    
    function getUbicazioneArticoliById($cod_ubicazione, $cod_articolo) {
        $sql = "SELECT * FROM ubicazioni_articoli 
                WHERE COD_UBICAZIONE = '$cod_ubicazione'
                AND COD_ARTICOLO = '$cod_articolo'";
        $ubi = select_single($sql);
        return $ubi;
    }
    
    function getUbicazioniAlternative($codUbicazione, $codArticolo) {
        $sql = "SELECT *
                FROM ubicazioni_articoli
                WHERE COD_ARTICOLO = '$codArticolo' AND COD_UBICAZIONE <> '$codUbicazione'";
        $ubi = select_list($sql);
        return $ubi;
    }

    function crea($json_data) {
        global $con;
        $sql = insert("ubicazioni_articoli", [
                                     "COD_UBICAZIONE" => $con->escape_string($json_data->COD_UBICAZIONE),
                                     "COD_ARTICOLO" => $con->escape_string($json_data->COD_ARTICOLO),
                                     "QUANTITA_PREVISTA" => $con->escape_string($json_data->QUANTITA_PREVISTA),
                                     "SEGNALAZIONE_ESAURIMENTO" => $con->escape_string($json_data->SEGNALAZIONE_ESAURIMENTO),
                                     "DISEGNO" => $con->escape_string($json_data->DISEGNO),
                                     "DESCRIZIONE" => $con->escape_string($json_data->DESCRIZIONE),
                                     "NOTE" => $con->escape_string($json_data->NOTE)]);
        execute_update($sql);
        return $this->getUbicazioneArticoliById($json_data->COD_UBICAZIONE,$json_data->COD_ARTICOLO);
    }
    
    function aggiorna($progetto, $json_data) {
        global $con;
        $sql = update("ubicazioni_articoli", [ "QUANTITA_PREVISTA" => $con->escape_string($json_data->QUANTITA_PREVISTA),
                                                "SEGNALAZIONE_ESAURIMENTO" => $con->escape_string($json_data->SEGNALAZIONE_ESAURIMENTO),
                                              "NOTE" => $con->escape_string($json_data->NOTE)], 
                                        ["COD_UBICAZIONE" => $con->escape_string($json_data->COD_UBICAZIONE),
                                        "COD_ARTICOLO" => $con->escape_string($json_data->COD_ARTICOLO)]);
        execute_update($sql);
    }
    
    function elimina($cod_ubicazione, $codArticolo) {
        $sql = "DELETE FROM ubicazioni_articoli WHERE COD_UBICAZIONE = '$cod_ubicazione' AND COD_ARTICOLO = '$codArticolo'";
        execute_update($sql);
    }
}
?>