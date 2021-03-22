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

export interface MatEditTableLabels {
  add: string;
  edit: string;
  undo: string;
  save: string;
  delete: string;
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
    save: 'Salva'
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

  oldRow: T | undefined;

  constructor() { }

  ngOnInit(): void {
    this.columns.push({
      // Una colonna per le azioni
      data: '$$actions',
      title: '',
      type: ''
    });
    this.matDataSource = new MatTableDataSource(this.dataSource);
    this.columns.forEach(x => this.displayedColumns.push(x.data));
  }

  createRow(): void {
    const newRow: any = {};
    this.dataSource.push(newRow);
    this.beginEdit(newRow);
  }

  toggleRow(row: any): void {
    row.isEdit = !row.isEdit;
  }

  beginEdit(row: T): void {
    this.oldRow = row;
    this.toggleRow(row);
  }

  saveRow(row: T): void {
    this.toggleRow(row);
    console.log('Emitting save row:', row);
    this.save.emit(row);
  }

  deleteRow(row: T): void {
    console.log('Emitting delete row:', row);
    this.delete.emit(row);
  }

  undoChange(row: T): void {
    this.toggleRow(row);
    Object.assign(row, this.oldRow);

    // ora dovrei ripristinare la vecchia riga

  }

}
