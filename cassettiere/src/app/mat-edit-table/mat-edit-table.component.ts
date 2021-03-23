import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { ListBean, ValueBean } from '../_models';

/**
 * DataTable-like column definition structure
 */
export interface ColumnDefinition<T> {
  title: string;
  data: string;
  type?: string;
  render?: (data: any, row?: T, rowNum?: number, colNum?: number) => string | null; // Puoi usarlo per formattare le date
}

export interface HttpCrudService<T> {
  getAll(page?: number, size?: number, ...args: any[]): Observable<ListBean<T>>;
  create(obj: T): Observable<ValueBean<T>>;
  update(obj: T): Observable<ValueBean<T>>;
  delete(obj: T): Observable<void>;
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
  refresh: string;
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
    refresh: 'Refresh',
    exportXlsx: 'Export XLSX',
    exportCsv: 'Export CSV'
  };

  @Input()
  columns: ColumnDefinition<T>[] = [];

  @Input()
  service!: HttpCrudService<T>;

  @Output()
  create: EventEmitter<T> = new EventEmitter();
  @Output()
  update: EventEmitter<T> = new EventEmitter();
  @Output()
  delete: EventEmitter<T> = new EventEmitter();
  @Output()
  errorMessage: EventEmitter<any> = new EventEmitter();

  // Questi sono i parametri che si aspetta il mat-table:
  dataSource: MatTableDataSource<T> = new MatTableDataSource();
  displayedColumns: string[] = [];

  data: T[] = [];
  creating = false;
  editRowNumber = -1;
  oldRow: T = {} as T;
  buttonsEnabled = true;

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
    this.columns.forEach(x => this.displayedColumns.push(x.data));
    this.refresh();
  }

  refresh(): void {
    this.buttonsEnabled = false;
    this.service.getAll().subscribe(
      listBean => {
        this.dataSource.data = this.data = listBean.data;
        this.buttonsEnabled = true;
        // may use listBean.count for pagination
      },
      error => {
        this.buttonsEnabled = true;
        console.log('Emitting error:', error);
        this.errorMessage.emit(error);
      }
    );
  }

  renderCell(col: ColumnDefinition<T>, row: T, rowNum: number, colNum: number): string | null {
    const x = (row as any)[col.data];
    return col.render ? col.render(x, row, rowNum, colNum) : x;
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
    this.buttonsEnabled = false;
    this.editRowNumber = -1;
    const row = this.data[rowNum];
    if (this.creating) {
      this.service.create(row).subscribe(
        response => {
          console.log('Emitting create row:', row);
          this.create.emit(row);
          Object.assign(row, response.value);
          this.buttonsEnabled = true;
        },
        error => {
          this.editRowNumber = rowNum;
          console.log('Emitting error:', error);
          this.errorMessage.emit(error);
          this.buttonsEnabled = true;
        }
      );
    } else {
      this.service.update(row).subscribe(
        response => {
          console.log('Emitting update row:', row);
          this.update.emit(row);
          Object.assign(row, response.value);
          this.buttonsEnabled = true;
        },
        error => {
          this.editRowNumber = rowNum;
          console.log('Emitting error:', error);
          this.errorMessage.emit(error);
          this.buttonsEnabled = true;
        }
      );
    }
    this.creating = false;
  }

  deleteRow(rowNum: number): void {
    // TODO dovrei dare un messaggio di conferma
    this.buttonsEnabled = false;
    this.editRowNumber = -1;
    const row = this.data[rowNum];
    this.service.delete(row).subscribe(
      () => {
        this.data.splice(rowNum, 1);
        this.dataSource.data = this.data;
        console.log('Emitting delete row:', row);
        this.delete.emit(row);
        this.buttonsEnabled = true;
      },
      error => {
        console.log('Emitting error:', error);
        this.errorMessage.emit(error);
        this.buttonsEnabled = true;
      }
    );
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
