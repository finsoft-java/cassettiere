import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularDataTable';
  
  @ViewChild('dataTable') table;
  dataTable: any;
  
  constructor(){
  }

  ngOnInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }
}
