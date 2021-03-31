
export interface Area {
  COD_AREA: string;
  DESCRIZIONE: string;
}

export interface Articolo {
  ID_ARTICOLO: string;
  DESCRIZIONE: string;
}

export interface Ubicazione {
  COD_UBICAZIONE: string;
  COD_ARTICOLO_CONTENUTO: string;
  QUANTITA_PREVISTA:number;
  COD_AREA: string;
  SEGNALAZIONE_ESAURIMENTO: string;
  DESCRIZIONE_AREA: string;
}

export class User {
  username: string = '';
  password:string = '';
}