-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Gen 31, 2022 alle 16:39
-- Versione del server: 10.4.17-MariaDB
-- Versione PHP: 8.0.2

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
-- Struttura della tabella `contenitori_padre`
--

CREATE TABLE `contenitori_padre` (
  `COD_CONTENITORE` varchar(255) NOT NULL,
  `COD_AREA` varchar(255) NOT NULL,
  `DESCRIZIONE` varchar(255) NOT NULL,
  `ORDINE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `contenitori_padre`
--

INSERT INTO `contenitori_padre` (`COD_CONTENITORE`, `COD_AREA`, `DESCRIZIONE`, `ORDINE`) VALUES
('A7', 'A7', 'Descrizione a7', 1),
('E3', 'E3', 'Descrizione e3', 2),
('E4', 'E4', 'Descrizione E4', 3),
('M1', 'M1', 'Descrizione M1', 4),
('M2', 'M2', 'Descrizione M2', 5),
('M4', 'M4', 'Descrizione M4', 6);

-- --------------------------------------------------------

--
-- Struttura della tabella `elenco_badge`
--

CREATE TABLE `elenco_badge` (
  `RFID_CODE` varchar(25) NOT NULL,
  `USER` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `elenco_badge`
--

INSERT INTO `elenco_badge` (`RFID_CODE`, `USER`) VALUES
('finsoft', 'finsoft');

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
  `COD_CONTENITORE` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `ubicazioni`
--

INSERT INTO `ubicazioni` (`COD_UBICAZIONE`, `COD_CONTENITORE`) VALUES
('UBI-A7-001', 'A7'),
('UBI-A7-002', 'A7'),
('UBI-A7-003', 'A7'),
('UBI-E3-001', 'E3'),
('UBI-E3-002', 'E3'),
('UBI-E3-003', 'E3'),
('UBI-E4-001', 'E4'),
('UBI-E4-002', 'E4'),
('UBI-E4-003', 'E4'),
('UBI-M1-001', 'M1'),
('UBI-M1-002', 'M1'),
('UBI-M1-003', 'M1'),
('UBI-M2-001', 'M2'),
('UBI-M2-002', 'M2'),
('UBI-M2-003', 'M2'),
('UBI-M4-001', 'M4'),
('UBI-M4-002', 'M4'),
('UBI-M4-003', 'M4');

-- --------------------------------------------------------

--
-- Struttura della tabella `ubicazioni_articoli`
--

CREATE TABLE `ubicazioni_articoli` (
  `COD_UBICAZIONE` varchar(255) NOT NULL,
  `COD_ARTICOLO` varchar(255) NOT NULL,
  `QUANTITA_PREVISTA` int(11) NOT NULL,
  `SEGNALAZIONE_ESAURIMENTO` char(1) NOT NULL,
  `DISEGNO` varchar(255) NOT NULL,
  `DESCRIZIONE` varchar(255) NOT NULL,
  `NOTE` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `ubicazioni_articoli`
--

INSERT INTO `ubicazioni_articoli` (`COD_UBICAZIONE`, `COD_ARTICOLO`, `QUANTITA_PREVISTA`, `SEGNALAZIONE_ESAURIMENTO`, `DISEGNO`, `DESCRIZIONE`, `NOTE`) VALUES
('UBI-A7-001', 'ART 1', 100, '', 'PROVA', 'PROVA', 'PROVA');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `aree`
--
ALTER TABLE `aree`
  ADD PRIMARY KEY (`COD_AREA`);

--
-- Indici per le tabelle `contenitori_padre`
--
ALTER TABLE `contenitori_padre`
  ADD PRIMARY KEY (`COD_CONTENITORE`),
  ADD KEY `COD_AREA` (`COD_AREA`);

--
-- Indici per le tabelle `elenco_badge`
--
ALTER TABLE `elenco_badge`
  ADD PRIMARY KEY (`RFID_CODE`);

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
  ADD KEY `ubicazioni` (`COD_CONTENITORE`);

--
-- Indici per le tabelle `ubicazioni_articoli`
--
ALTER TABLE `ubicazioni_articoli`
  ADD PRIMARY KEY (`COD_UBICAZIONE`,`COD_ARTICOLO`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `storico_operazioni`
--
ALTER TABLE `storico_operazioni`
  MODIFY `ID_OPERAZIONE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `contenitori_padre`
--
ALTER TABLE `contenitori_padre`
  ADD CONSTRAINT `contenitori_padre_ibfk_1` FOREIGN KEY (`COD_AREA`) REFERENCES `aree` (`COD_AREA`);

--
-- Limiti per la tabella `storico_operazioni`
--
ALTER TABLE `storico_operazioni`
  ADD CONSTRAINT `storico_op` FOREIGN KEY (`COD_OPERAZIONE`) REFERENCES `operazioni` (`COD_OPERAZIONE`);

--
-- Limiti per la tabella `ubicazioni`
--
ALTER TABLE `ubicazioni`
  ADD CONSTRAINT `ubicazioni` FOREIGN KEY (`COD_CONTENITORE`) REFERENCES `contenitori_padre` (`COD_CONTENITORE`);

--
-- Limiti per la tabella `ubicazioni_articoli`
--
ALTER TABLE `ubicazioni_articoli`
  ADD CONSTRAINT `ubicazioni_articoli_ibfk_1` FOREIGN KEY (`COD_UBICAZIONE`) REFERENCES `ubicazioni` (`COD_UBICAZIONE`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
