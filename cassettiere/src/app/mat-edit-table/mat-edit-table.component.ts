import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * DataTable-like column definition structure
 */
export interface ColumnDefinition {
  title: string;
  data: string;
  type?: string;
  // TODO render ???
}

/**
 * Etichette sui buttons
 */
export interface MatEditTableLabels {
  add: string;
  edit: string;
  undo: string;
  save: string;
  delete: string;
  exportXlsx: string;
  exportCsv: string;
}

@Component({
  selector: 'app-mat-edit-table',
  templateUrl: './mat-edit-table.component.html',
  styleUrls: ['./mat-edit-table.component.css']
})
/**
 * Editable Material Table
 * @see https://muhimasri.com/blogs/create-an-editable-dynamic-table-using-angular-material/
 */
export class MatEditTableComponent<T> implements OnInit {

  @Input()
  labels: MatEditTableLabels = {
    add: 'Nuovo',
    edit: 'Modifica',
    undo: 'Annulla',
    delete: 'Elimina',
    save: 'Salva',
    exportXlsx: 'Export XLSX',
    exportCsv: 'Export CSV'
  };

  @Input()
  columns: ColumnDefinition[] = [];

  @Input()
  data: T[] = [];

  @Output()
  save: EventEmitter<T> = new EventEmitter();
  @Output()
  delete: EventEmitter<T> = new EventEmitter();

  // Questi sono i parametri che si aspetta il datatable:
  dataSource: MatTableDataSource<T> = new MatTableDataSource();
  displayedColumns: string[] = [];

  editRowNumber = -1;
  oldRow: T = {} as T;
  creating = false;

  ACTIONS_INDEX = '$$actions';
  XLSX_FILE_NAME = 'Export.xlsx';
  XLSX_SHEET_NAME = 'Data';
  CSV_FILE_NAME = 'Export.csv';

  constructor() { }

  ngOnInit(): void {
    this.columns.push({
      // Una colonna per le azioni
      data: this.ACTIONS_INDEX,
      title: '',
      type: ''
    });
    this.dataSource.data = this.data;
    this.columns.forEach(x => this.displayedColumns.push(x.data));
  }

  createRow(): void {
    const newRow = {} as T;
    this.data.push(newRow);
    this.dataSource.data = this.data;
    this.creating = true;
    this.beginEdit(this.data.length - 1);
  }

  beginEdit(rowNum: number): void {
    this.editRowNumber = rowNum;
    console.log('Editing row', rowNum);
    const row = this.data[rowNum];
    Object.assign(this.oldRow, row);
  }

  saveRow(rowNum: number): void {
    this.editRowNumber = -1;
    const row = this.data[rowNum];
    console.log('Emitting save row:', row);
    this.save.emit(row);
    this.creating = false;
    // TODO prima di aggiornare la tabella dovrei appurare che la webservice sia andata a buon fine
  }

  deleteRow(rowNum: number): void {
    // TODO dovrei dare un messaggio di conferma
    this.editRowNumber = -1;
    const row = this.data[rowNum];
    console.log('Emitting delete row:', row);
    this.delete.emit(row);
    this.data.splice(rowNum, 1);
    this.dataSource.data = this.data;
    // TODO prima di eliminare la tabella dovrei appurare che la webservice sia andata a buon fine
  }

  undoChange(rowNum: number): void {
    console.log('Undo');
    this.editRowNumber = -1;
    if (this.creating) {
      this.data.splice(rowNum, 1);
      this.dataSource.data = this.data;
    } else {
      const row = this.data[rowNum];
      Object.assign(row, this.oldRow);
    }
    this.creating = false;
  }

  getSheetHeader(): any[] {
    const row = Array();
    this.columns.forEach(col => {
      if (col.data !== this.ACTIONS_INDEX) {
        row.push(col.title);
      }
    });
    return row;
  }

  getSheetDataColumns(): any[] {
    const row = Array();
    this.columns.forEach(col => {
      if (col.data !== this.ACTIONS_INDEX) {
        row.push(col.data);
      }
    });
    return row;
  }

  createWorksheet(): XLSX.WorkSheet {
    const header = [this.getSheetHeader()];
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(header);
    XLSX.utils.sheet_add_json(ws, this.data, { skipHeader: true, origin: -1, header:  this.getSheetDataColumns()});
    return ws;
  }

  exportXlsx(): void {
    const ws = this.createWorksheet();
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.XLSX_SHEET_NAME);
    XLSX.writeFile(wb, this.XLSX_FILE_NAME);
  }

  exportCsv(): void {
    const ws = this.createWorksheet();
    const csv = XLSX.utils.sheet_to_csv(ws, {FS: ';'});
    const blob = new Blob([csv], {type: 'text/csv;charset=UTF-8'});
    saveAs(blob, this.CSV_FILE_NAME);
  }
}
