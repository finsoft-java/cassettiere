import { DatePipe } from '@angular/common';
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

  service: AreeService;
  datePipe: DatePipe = new DatePipe('en-US');
  columns: ColumnDefinition<Area>[] = [
    {
      title: 'Codice',
      data: 'codice',
      type: 'text'
    },
    {
      title: 'Descrizione',
      data: 'descrizione',
      type: 'text'
    },
    {
      title: 'Data creazione',
      data: 'creationDate',
      type: 'date',
      render: x => this.datePipe.transform(x, 'dd/MM/YYYY')
    }
  ];

  constructor(private areeSvc: AreeService) {
    this.service = areeSvc;
  }

  ngOnInit(): void {
  }

}
