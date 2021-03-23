/**
 * DataTable-like column definition structure
 */
export interface ColumnDefinition<T> {
  title: string;
  data: string;
  type?: string;
  render?: (data: any, row?: T, rowNum?: number, colNum?: number) => string | null; // Puoi usarlo per formattare le date
}
