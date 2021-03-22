import { Component, OnInit } from '@angular/core';
import { ColumnDefinition } from '../mat-edit-table/mat-edit-table.component';
import { Area } from '../_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Questi servono per la mat-table
  dataSource: Area[] = [];
  columns: ColumnDefinition[] = [
    {
      title: 'Codice',
      data: 'codice',
      type: 'text'
    },
    {
      title: 'Descrizione',
      data: 'descrizione',
      type: 'text'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.getData();
  }

  getData(): Area[] {
    return [
      {
        codice: 'M1',
        descrizione: 'Area M1'
      },
      {
        codice: 'M2',
        descrizione: 'Area M2'
      },
      {
        codice: 'M3',
        descrizione: 'Area M3'
      },
      {
        codice: 'M5',
        descrizione: 'Area M5'
      },
      {
        codice: 'M6',
        descrizione: 'Area M6'
      },
    ];
  }

}
