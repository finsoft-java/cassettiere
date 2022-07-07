import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnDefinition } from '../mat-edit-table';
import { Segnalazione } from '../_models';
import { AlertService } from '../_services/alert.service';
import { ReportSegnalazioniService } from '../_services/report.segnalazioni.service';

@Component({
  selector: 'app-report-segnalazioni',
  templateUrl: './report-segnalazioni.component.html',
  styleUrls: ['./report-segnalazioni.component.css']
})
export class ReportSegnalazioniComponent implements OnInit {
  filter: any = {};
  myControl = new FormControl();
  columns: ColumnDefinition<Segnalazione>[] = [
    {
      title: 'Area',
      data: 'COD_AREA',
      // commentato perchè troppo lungo
      // render: (data, row) => data + ' - ' + row?.DESCRIZIONE_AREA,
      width: '3cm'
    },
    {
      title: 'Cont. Padre',
      data: 'DES_UBICAZIONE', // attenzione non e' COD_CONTENIORE!
      width: '3cm'
    },
    {
      title: 'Ubicazione',
      data: 'COD_UBICAZIONE'
    },
    {
      title: 'Articolo',
      data: 'COD_ARTICOLO_CONTENUTO'
    },
    {
      title: 'Descrizione',
      data: 'DESCR_ARTICOLO',
      width: '20%'
    },
    {
      title: 'Cod. disegno',
      data: 'COD_DISEGNO'
    },
    {
      title: 'Quantità prevista',
      data: 'QUANTITA_PREVISTA',
      width: '2cm'
    },
    {
      title: 'Utente segnalante',
      data: 'COD_UTENTE'
    },
    {
      title: 'Timestamp segnalazione',
      data: 'TIMESTAMP',
      width: '3cm'
      // render: (data => data ? data.substring(0,10)+'\n'+data.substring(11,20) : null)
    }
  ];
  service!: ReportSegnalazioniService;

  constructor(private svc: ReportSegnalazioniService,
    private alertService: AlertService,
    private router: Router) {
    this.service = svc;
  }

  ngOnInit(): void {
  }

  filterRow(editTableComponent: any): void {
    if (this.filter.search) {
      this.filter.search = this.filter.search.trim();
    } else {
      delete this.filter.search;
    }

    editTableComponent.filter(this.filter);
  }

  resetFilter(editTableComponent: any): void {
    delete this.filter.search;
    editTableComponent.filter(this.filter);
  }

  showError(msg: string) {
    this.alertService.error(msg);
  }

  gotoUbicazioneArticolo(row: Segnalazione) {
    this.router.navigate(['/ubicazioni-articoli', { filter: row.COD_UBICAZIONE }]);
  }
}
