import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColumnDefinition } from '../mat-edit-table';
import { Ubicazione } from '../_models';
import { ReportSegnalazioniService } from '../_services/report.segnalazioni.service';
import { UbicazioniService } from '../_services/ubicazioni.service';

@Component({
  selector: 'app-report-segnalazioni',
  templateUrl: './report-segnalazioni.component.html',
  styleUrls: ['./report-segnalazioni.component.css']
})
export class ReportSegnalazioniComponent implements OnInit {
  filter: any = {};
  myControl = new FormControl();
  columns: ColumnDefinition<Ubicazione>[] = [
    {
      title: 'Ubicazione',
      data: 'COD_UBICAZIONE'
    },
    {
      title: 'Articolo',
      data: 'COD_ARTICOLO_CONTENUTO'
    },
    {
      title: 'Quantità prevista',
      data: 'QUANTITA_PREVISTA'
    },
    {
      title: 'Area',
      data: 'COD_AREA',
      render: (data, row) => data + ' ' + row?.DESCRIZIONE_AREA
    }
  ];
  service!: ReportSegnalazioniService;

  constructor(private svc: ReportSegnalazioniService) {
    this.service = svc;
  }

  ngOnInit(): void {
  }

  filterRow(editTableComponent: any): void {

    if (this.filter.searchString) {
      this.filter.searchString = this.filter.searchString.trim();
    } else {
      delete this.filter.searchString;
    }

    editTableComponent.filter(this.filter);
  }

  resetFilter(editTableComponent: any): void {
    delete this.filter.searchString;
    editTableComponent.filter(this.filter);
  }

}
