-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mar 26, 2021 alle 16:08
-- Versione del server: 10.4.17-MariaDB
-- Versione PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cassettiere`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `aree`
--

CREATE TABLE `aree` (
  `COD_AREA` varchar(10) NOT NULL,
  `DESCRIZIONE` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `aree`
--

INSERT INTO `aree` (`COD_AREA`, `DESCRIZIONE`) VALUES
('A7', 'Cortile oratorio'),
('E3', 'Edificio 3'),
('E4', 'Edificio 4'),
('M1', 'Capannone M1'),
('M2', 'Capannone M2'),
('M4', 'Magazzino 4');

-- --------------------------------------------------------

--
-- Struttura della tabella `operazioni`
--

CREATE TABLE `operazioni` (
  `COD_OPERAZIONE` varchar(15) NOT NULL,
  `DESCRIZIONE` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `operazioni`
--

INSERT INTO `operazioni` (`COD_OPERAZIONE`, `DESCRIZIONE`) VALUES
('ESAURIMENTO', 'Segnalazione materiale in esaurimento'),
('RABBOCCO', 'Segnalazione rabbocco materiale');

-- --------------------------------------------------------

--
-- Struttura della tabella `storico_operazioni`
--

CREATE TABLE `storico_operazioni` (
  `ID_OPERAZIONE` int(11) NOT NULL,
  `COD_UTENTE` varchar(8) NOT NULL,
  `COD_OPERAZIONE` varchar(15) NOT NULL,
  `COD_ARTICOLO` varchar(25) NOT NULL,
  `COD_UBICAZIONE` varchar(255) NOT NULL,
  `COD_AREA` varchar(10) NOT NULL,
  `TIMESTAMP` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `storico_operazioni`
--

INSERT INTO `storico_operazioni` (`ID_OPERAZIONE`, `COD_UTENTE`, `COD_OPERAZIONE`, `COD_ARTICOLO`, `COD_UBICAZIONE`, `COD_AREA`, `TIMESTAMP`) VALUES
(1, '1111', 'ESAURIMENTO', 'AAAA', 'UBI-M1-001', 'M1', '2021-03-26 16:12:10');

-- --------------------------------------------------------

--
-- Struttura della tabella `ubicazioni`
--

CREATE TABLE `ubicazioni` (
  `COD_UBICAZIONE` varchar(255) NOT NULL,
  `COD_ARTICOLO_CONTENUTO` varchar(25) NOT NULL,
  `QUANTITA_PREVISTA` int(11) DEFAULT NULL,
  `COD_AREA` varchar(10) NOT NULL,
  `SEGNALAZIONE_ESAURIMENTO` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `ubicazioni`
--

INSERT INTO `ubicazioni` (`COD_UBICAZIONE`, `COD_ARTICOLO_CONTENUTO`, `QUANTITA_PREVISTA`, `COD_AREA`, `SEGNALAZIONE_ESAURIMENTO`) VALUES
('UBI-A7-001', 'AAAAA', 50, 'A7', 'N'),
('UBI-A7-002', 'BBBBB', 50, 'A7', 'N'),
('UBI-A7-003', 'CCCCC', 50, 'A7', 'N'),
('UBI-E3-001', 'AAAAA', 50, 'E3', 'N'),
('UBI-E3-002', 'BBBBB', 50, 'E3', 'N'),
('UBI-E3-003', 'CCCCC', 50, 'E3', 'N'),
('UBI-E4-001', 'AAAAA', 50, 'E4', 'N'),
('UBI-E4-002', 'BBBBB', 50, 'E4', 'N'),
('UBI-E4-003', 'CCCCC', 50, 'E4', 'N'),
('UBI-M1-001', 'AAAAA', 50, 'M1', 'N'),
('UBI-M1-002', 'BBBBB', 50, 'M1', 'N'),
('UBI-M1-003', 'CCCCC', 50, 'M1', 'N'),
('UBI-M2-001', 'AAAAA', 50, 'M2', 'N'),
('UBI-M2-002', 'BBBBB', 50, 'M2', 'N'),
('UBI-M2-003', 'CCCCC', 50, 'M2', 'N'),
('UBI-M4-001', 'AAAAA', 50, 'M4', 'N'),
('UBI-M4-002', 'BBBBB', 50, 'M4', 'N'),
('UBI-M4-003', 'CCCCC', 50, 'M4', 'N');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `aree`
--
ALTER TABLE `aree`
  ADD PRIMARY KEY (`COD_AREA`);

--
-- Indici per le tabelle `operazioni`
--
ALTER TABLE `operazioni`
  ADD PRIMARY KEY (`COD_OPERAZIONE`);

--
-- Indici per le tabelle `storico_operazioni`
--
ALTER TABLE `storico_operazioni`
  ADD PRIMARY KEY (`ID_OPERAZIONE`),
  ADD KEY `storico_op` (`COD_OPERAZIONE`);

--
-- Indici per le tabelle `ubicazioni`
--
ALTER TABLE `ubicazioni`
  ADD PRIMARY KEY (`COD_UBICAZIONE`),
  ADD KEY `ubicazioni` (`COD_AREA`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `storico_operazioni`
--
ALTER TABLE `storico_operazioni`
  MODIFY `ID_OPERAZIONE` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `storico_operazioni`
--
ALTER TABLE `storico_operazioni`
  ADD CONSTRAINT `storico_op` FOREIGN KEY (`COD_OPERAZIONE`) REFERENCES `operazioni` (`COD_OPERAZIONE`);

--
-- Limiti per la tabella `ubicazioni`
--
ALTER TABLE `ubicazioni`
  ADD CONSTRAINT `ubicazioni` FOREIGN KEY (`COD_AREA`) REFERENCES `aree` (`COD_AREA`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


CREATE VIEW `report_ubicazioni_per_area`  AS
SELECT `ubicazioni`.`COD_AREA` AS `COD_AREA`, count(0) AS `NUM_UBICAZIONI`, sum(case when `ubicazioni`.`SEGNALAZIONE_ESAURIMENTO` = 'N' then 0 else 1 end) AS `IN_ESAURIMENTO`
FROM `ubicazioni` GROUP BY `ubicazioni`.`COD_AREA` ;

