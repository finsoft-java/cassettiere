import { Observable } from 'rxjs';

/**
 * DataTable-like column definition structure
 */
export interface ColumnDefinition<T> {
  /** Titolo della colonna */
  title: string;
  /** Nome dell'attributo dell'oggetto. Non obbligatorio se usi render. */
  data: string;
  /** input type: text/number/date/hidden/select/... */
  type?: string;
  /** width style property */
  width?: string;
  /** render function. Puoi usarlo per formattare le date */
  render?: (data: any, row?: T, rowNum?: number, colNum?: number) => string | null;
  /** select options */
  options?: LabelValue[];
  /** funzione per caricare asincronamente le options */
  asyncOptions?: (row?: T) => Observable<LabelValue[]>;
}

export interface LabelValue {
  label: string;
  value: any;
}
