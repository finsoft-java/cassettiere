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
-- Struttura della tabella `ubicazioni`
--

CREATE TABLE `ubicazioni` (
  `COD_UBICAZIONE` varchar(255) NOT NULL,
  `COD_CONTENITORE` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `ubicazioni`
--

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
