CREATE VIEW`report_ubicazioni_per_area`  AS
SELECT `ubicazioni`.`COD_AREA` AS `COD_AREA`,
    `aree`.`DESCRIZIONE` AS `DESCRIZIONE`,
    count(0) AS `NUM_UBICAZIONI`,
    sum(case when `ubicazioni`.`SEGNALAZIONE_ESAURIMENTO` = 'N' then 0 else 1 end) AS `IN_ESAURIMENTO`
FROM `ubicazioni`
join `aree` on `aree`.`COD_AREA` = `ubicazioni`.`COD_AREA`
GROUP BY `ubicazioni`.`COD_AREA` ;


CREATE VIEW `report_segnalazioni_attive` AS
SELECT `u`.`COD_UBICAZIONE` AS `COD_UBICAZIONE`,
    `u`.`COD_ARTICOLO_CONTENUTO` AS `COD_ARTICOLO_CONTENUTO`,
    `u`.`QUANTITA_PREVISTA` AS `QUANTITA_PREVISTA`,
    `u`.`COD_AREA` AS `COD_AREA`,
    `a`.`DESCRIZIONE` AS `DESCRIZIONE_AREA`,
    `s`.`COD_UTENTE` AS `COD_UTENTE`,
    `s`.`TIMESTAMP` AS `TIMESTAMP`
FROM `ubicazioni` `u`
join `aree` `a` on `u`.`COD_AREA` = `a`.`COD_AREA`
left join `storico_operazioni` `s` on `s`.`COD_UBICAZIONE` = `u`.`COD_UBICAZIONE`
WHERE `u`.`SEGNALAZIONE_ESAURIMENTO` = 'Y' AND (`s`.`ID_OPERAZIONE` is null OR
  `s`.`ID_OPERAZIONE` = (select max(`z`.`ID_OPERAZIONE`) from `storico_operazioni` `z` where `z`.`COD_UBICAZIONE` = `u`.`COD_UBICAZIONE` AND `z`.`COD_OPERAZIONE` = 'ESAURIMENTO')) ;
