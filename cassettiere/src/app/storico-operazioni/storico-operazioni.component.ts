import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ColumnDefinition } from './../mat-edit-table/ColumnDefinition';
import { StoricoOperazione } from './../_models/area';
import { StoricoOperazioniService } from './../_services/storico-operazioni.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-storico-operazioni',
  templateUrl: './storico-operazioni.component.html',
  styleUrls: ['./storico-operazioni.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})
export class StoricoOperazioniComponent implements OnInit {
  filter: any = {};
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  myControl = new FormControl();
  columns: ColumnDefinition<StoricoOperazione>[] = [
    {
      title: 'ID Operazione',
      data: 'ID_OPERAZIONE'
    },
    {
      title: 'Utente',
      data: 'COD_UTENTE'
    },
    {
      title: 'Operazione',
      data: 'COD_OPERAZIONE'
    },
    {
      title: 'Articolo',
      data: 'COD_ARTICOLO'
    },
    {
      title: 'Ubicazione',
      data: 'COD_UBICAZIONE'
    },
    {
      title: 'Area',
      data: 'COD_AREA'
    },
    {
      title: 'Timestamp',
      data: 'TIMESTAMP'
    }
  ];
  service!: StoricoOperazioniService;

  constructor(private storOpSvc: StoricoOperazioniService) {
    this.service = storOpSvc;
  }

  ngOnInit(): void {
  }

  filterRow(editTableComponent: any): void {

    delete this.filter.DATA_INIZIO;
    delete this.filter.DATA_FINE;

    if (this.range.value.end != null) {
      this.filter.DATA_FINE = formatDate(this.range.value.end , 'YYYY-MM-dd', 'en-GB');
    }

    if (this.range.value.start != null) {
      this.filter.DATA_INIZIO = formatDate(this.range.value.start , 'YYYY-MM-dd', 'en-GB');
    }

    if (this.filter.search) {
      this.filter.search = this.filter.search.trim();
    }

    editTableComponent.filter(this.filter);
  }

  resetFilter(editTableComponent: any): void {
    delete this.filter.DATA_INIZIO;
    delete this.filter.DATA_FINE;
    delete this.filter.search;
    editTableComponent.filter(this.filter);
  }

}
