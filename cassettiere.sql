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

-- --------------------------------------------------------

--
-- Struttura della tabella `operazioni`
--

CREATE TABLE `operazioni` (
  `COD_OPERAZIONE` varchar(15) NOT NULL,
  `DESCRIZIONE` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
