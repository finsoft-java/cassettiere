<?php

$ubicazioniArticoliManager = new UbicazioniArticoliManager();

class UbicazioniArticoliManager {
    
    function getUbicazioniArticoli($search=null, $orderby=null, $skip=null, $top=null) {
        global $panthera;
        $sql  = "";
        $sql0 = "SELECT COUNT(*) AS cnt FROM ubicazioni_articoli ";
        $sql1 = "SELECT COD_UBICAZIONE, COD_CONTENITORE, COD_ARTICOLO, QUANTITA_PREVISTA, SEGNALAZIONE_ESAURIMENTO, DISEGNO, DESCRIZIONE, NOTE as COD_CONTENITORE FROM ubicazioni_articoli ";
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

        if ($top != null){
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
        global $panthera;
        $sql = "SELECT u.*,ua.COD_ARTICOLO,ua.QUANTITA_PREVISTA,ua.SEGNALAZIONE_ESAURIMENTO,ua.DISEGNO,ua.DESCRIZIONE,ua.NOTE FROM ubicazioni u
        LEFT JOIN ubicazioni_articoli ua ON u.COD_UBICAZIONE = ua.COD_UBICAZIONE
        WHERE COD_CONTENITORE = '$cod_contenitore'";
                //echo $sql;
        $ubi = select_list($sql);
        return $ubi;
    }
    function getUbicazioneArticoliByUbi($cod_ubicazione) {
        global $panthera;
        $sql = "SELECT * FROM ubicazioni_articoli 
                WHERE COD_UBICAZIONE = '$cod_ubicazione'";
        $ubi = select_single($sql);
        return $ubi;
    }
    
    function getUbicazioneArticoliById($cod_ubicazione, $cod_articolo) {
        global $panthera;
        $sql = "SELECT * FROM ubicazioni_articoli 
                WHERE COD_UBICAZIONE = '$cod_ubicazione'
                AND COD_ARTICOLO = '$cod_articolo'";
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

        if(isset($json_data->COD_ARTICOLO)) {
            $codArticolo = $json_data->COD_ARTICOLO;
        }else{
            $codArticolo = '';
        }
        
        if(isset($json_data->QUANTITA_PREVISTA)) {
            $qnt = $json_data->QUANTITA_PREVISTA;
        }else{
            $qnt = '';
        }

        if(isset($json_data->SEGNALAZIONE_ESAURIMENTO)) {
            $esaurimento = $json_data->SEGNALAZIONE_ESAURIMENTO;
        }else{
            $esaurimento = '';
        }

        if(isset($json_data->DISEGNO)) {
            $disegno = $json_data->DISEGNO;
        }else{
            $disegno = '';
        }
        if(isset($json_data->DESCRIZIONE)) {
            $descrizione = $json_data->DESCRIZIONE;
        }else{
            $descrizione = '';
        }
        if(isset($json_data->NOTE)) {
            $note = $json_data->NOTE;
        }else{
            $note = '';
        }
        $sql = insert("ubicazioni_articoli", [
                                     "COD_UBICAZIONE" => $codUbi,
                                     "COD_ARTICOLO" => $codArticolo,
                                     "QUANTITA_PREVISTA" => $qnt,
                                     "SEGNALAZIONE_ESAURIMENTO" => $esaurimento,
                                     "DISEGNO" => $disegno,
                                     "DESCRIZIONE" => $descrizione,
                                     "NOTE" => $note]);
        mysqli_query($con, $sql);
        if ($con ->error) {
            print_error(500, $con ->error);
        }
        return $this->getUbicazioneArticoliById($json_data->COD_UBICAZIONE,$json_data->COD_ARTICOLO);
    }
    
    function aggiorna($progetto, $json_data) {
        global $con, $STATO_PROGETTO;        

        
        if(isset($json_data->COD_UBICAZIONE)) {
            $codUbi = $json_data->COD_UBICAZIONE;
        }else{
            $codUbi = '';
        }
        if(isset($json_data->COD_ARTICOLO)) {
            $codArticolo = $json_data->COD_ARTICOLO;
        }else{
            $codArticolo = '';
        }        
        if(isset($json_data->QUANTITA_PREVISTA)) {
            $qnt = $json_data->QUANTITA_PREVISTA;
        }else{
            $qnt = '';
        }
        if(isset($json_data->SEGNALAZIONE_ESAURIMENTO)) {
            $esaurimento = $json_data->SEGNALAZIONE_ESAURIMENTO;
        }else{
            $esaurimento = '';
        }
        if(isset($json_data->NOTE)) {
            $note = $json_data->NOTE;
        }else{
            $note = '';
        }

        $sql = update("ubicazioni_articoli", ["QUANTITA_PREVISTA" => $qnt,
                                              "SEGNALAZIONE_ESAURIMENTO" => $esaurimento,
                                              "NOTE" => $note], 
                                        ["COD_UBICAZIONE" => $json_data->COD_UBICAZIONE,
                                        "COD_ARTICOLO" => $json_data->COD_ARTICOLO]);
        mysqli_query($con, $sql);
        if ($con ->error) {
            print_error(500, $con ->error);
        }
    }
    
    function elimina($cod_ubicazione,$codArticolo) {
        global $con;
        $sql = "DELETE FROM ubicazioni_articoli WHERE COD_UBICAZIONE = '$cod_ubicazione' AND COD_ARTICOLO = '$codArticolo'";  //on delete cascade! (FIXME funziona anche con i questionari?!?)
        mysqli_query($con, $sql);
        if ($con ->error) {
            print_error(500, $con ->error);
        }
    }
}
?>