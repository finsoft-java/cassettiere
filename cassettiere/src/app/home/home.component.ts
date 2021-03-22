import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource: MatTableDataSource<any>;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.getData());
  }

  getData() {
    return [
      {
        area: 'M1',
        descrizione: 'Area M1'
      },
      {
        area: 'M2',
        descrizione: 'Area M2'
      },
      {
        area: 'M3',
        descrizione: 'Area M3'
      },
      {
        area: 'M5',
        descrizione: 'Area M5'
      },
      {
        area: 'M6',
        descrizione: 'Area M6'
      },
    ];
  }

  nuovaArea() {
    console.log('TODO');
  }
}
