export interface Area {
  COD_AREA: string;
  DESCRIZIONE: string;
}

export interface Articolo {
  ID_ARTICOLO: string;
  DESCRIZIONE: string;
  DISEGNO: string;
}

export interface Ubicazione {
  COD_UBICAZIONE: string;
  COD_CONTENITORE: string;
  DESCRIZIONE: string;
}

export interface ContenitorePadre {
  COD_CONTENITORE: string;
  COD_AREA: string;
  DESCRIZIONE: string;
  ORDINE: number;
}

export interface StoricoOperazione {
  ID_OPERAZIONE: number;
  COD_UTENTE: string;
  COD_OPERAZIONE: string;
  COD_ARTICOLO: string;
  COD_UBICAZIONE: string;
  DES_UBICAZIONE: string;
  COD_AREA: string;
  TIMESTAMP: string;
}

export interface Segnalazione {
  COD_AREA: string;
  COD_ARTICOLO: string;
  COD_UBICAZIONE: string;
  DES_UBICAZIONE: string;
  COD_ARTICOLO_CONTENUTO: string;
  DESCR_ARTICOLO: string;
  COD_DISEGNO: string;
  QUANTITA_PREVISTA: number;
  COD_UTENTE: string;
  TIMESTAMP: string;
}

export class User {
  username = '';
  password = '';
}

export interface UbicazionePerArea {
  COD_AREA: string;
  DESCRIZIONE_AREA: string;
  COD_CONTENITORE: string;
  DESCRIZIONE: string;
  NUM_UBICAZIONI: number;
  IN_ESAURIMENTO: number;
}

export interface UbicazioniArticoli {
  COD_UBICAZIONE?: string;
  COD_ARTICOLO: string;
  QUANTITA_PREVISTA: number;
  SEGNALAZIONE_ESAURIMENTO: string;
  DISEGNO: string;
  DESCRIZIONE: string;
  NOTE: string;
}
