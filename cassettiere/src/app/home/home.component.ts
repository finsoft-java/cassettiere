import { Component, OnInit } from '@angular/core';
import { ColumnDefinition } from '../mat-edit-table/mat-edit-table.component';
import { Area } from '../_models';
import { AreeService } from '../_services/aree.service';

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

  constructor(private areeSvc: AreeService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.areeSvc.getMockData().subscribe(
      response => this.dataSource = response.data
    );
  }

}
