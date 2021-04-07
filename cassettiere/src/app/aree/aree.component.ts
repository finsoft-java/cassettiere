import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColumnDefinition } from '../mat-edit-table';
import { Area } from '../_models';
import { AreeService } from '../_services/aree.service';

@Component({
  selector: 'app-aree',
  templateUrl: './aree.component.html',
  styleUrls: ['./aree.component.css']
})
export class AreeComponent implements OnInit {

  service: AreeService;
  datePipe: DatePipe = new DatePipe('en-US');
  columns: ColumnDefinition<Area>[] = [
    {
      title: 'Codice',
      data: 'COD_AREA',
      type: 'text',
      width: '30%',
      disabled: true
    },
    {
      title: 'Descrizione',
      data: 'DESCRIZIONE',
      type: 'text',
      width: '50%'
    }
  ];

  constructor(private areeSvc: AreeService) {
    this.service = areeSvc;
  }

  ngOnInit(): void {
  }

}
