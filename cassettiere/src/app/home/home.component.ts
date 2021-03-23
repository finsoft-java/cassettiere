import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColumnDefinition } from '../mat-edit-table';
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
      type: 'text',
      width: '20%'
    },
    {
      title: 'Descrizione',
      data: 'descrizione',
      type: 'text',
      width: '40%'
    },
    {
      title: 'Data creazione',
      data: 'creationDate',
      type: 'date',
      width: '20%',
      render: x => this.datePipe.transform(x, 'dd/MM/YYYY')
    }
  ];

  constructor(private areeSvc: AreeService) {
    this.service = areeSvc;
  }

  ngOnInit(): void {
  }

}
