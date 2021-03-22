import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

/**
 * DataTable-like column definition structure
 */
export interface ColumnDefinition {
  title: string;
  data: string;
  type?: string;
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
  dataSource: T[] = [];

  @Output()
  save: EventEmitter<T> = new EventEmitter();
  @Output()
  delete: EventEmitter<T> = new EventEmitter();

  // Questi sono i parametri che si aspetta il datatable:
  matDataSource: MatTableDataSource<T> = new MatTableDataSource();
  displayedColumns: string[] = [];

  editRowNumber = -1;
  oldRow: T = {} as T;
  creating = false;

  constructor() { }

  ngOnInit(): void {
    this.columns.push({
      // Una colonna per le azioni
      data: '$$actions',
      title: '',
      type: ''
    });
    this.matDataSource.data = this.dataSource;
    this.columns.forEach(x => this.displayedColumns.push(x.data));
  }

  createRow(): void {
    const newRow = {} as T;
    this.dataSource.push(newRow);
    this.matDataSource.data = this.dataSource;
    this.creating = true;
    this.beginEdit(this.dataSource.length - 1);
  }

  beginEdit(rowNum: number): void {
    this.editRowNumber = rowNum;
    console.log('Editing row', rowNum);
    const row = this.dataSource[rowNum];
    Object.assign(this.oldRow, row);
  }

  saveRow(rowNum: number): void {
    this.editRowNumber = -1;
    const row = this.dataSource[rowNum];
    console.log('Emitting save row:', row);
    this.save.emit(row);
    this.creating = false;
    // TODO prima di aggiornare la tabella dovrei appurare che la webservice sia andata a buon fine
  }

  deleteRow(rowNum: number): void {
    // TODO dovrei dare un messaggio di conferma
    this.editRowNumber = -1;
    const row = this.dataSource[rowNum];
    console.log('Emitting delete row:', row);
    this.delete.emit(row);
    this.dataSource.splice(rowNum, 1);
    this.matDataSource.data = this.dataSource;
    // TODO prima di eliminare la tabella dovrei appurare che la webservice sia andata a buon fine
  }

  undoChange(rowNum: number): void {
    console.log('Undo');
    if (this.creating) {
      this.deleteRow(rowNum);
    } else {
      this.editRowNumber = -1;
      const row = this.dataSource[rowNum];
      Object.assign(row, this.oldRow);
    }
    this.creating = false;
  }

  exportCsv(): void {
    console.log('TODO');
  }

  exportXlsx(): void {
    console.log('TODO');
  }
}
