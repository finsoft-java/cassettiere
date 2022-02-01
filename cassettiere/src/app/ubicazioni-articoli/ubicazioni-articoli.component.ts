import { ArticoliService } from './../_services/articoli.service';
import { UbicazioniArticoli } from './../_models/area';
import { map } from 'rxjs/operators';
import { ColumnDefinition, LabelValue } from '../mat-edit-table/ColumnDefinition';
import { AlertService } from './../_services/alert.service';
import { UbicazioniArticoliService } from './../_services/ubicazioni.articoli.service';
import { Component, OnInit } from '@angular/core';
import { UbicazioniService } from '../_services/ubicazioni.service';

@Component({
  selector: 'app-ubicazioni-articoli',
  templateUrl: './ubicazioni-articoli.component.html',
  styleUrls: ['./ubicazioni-articoli.component.css']
})
export class UbicazioniArticoliComponent implements OnInit {

  arrayAree: LabelValue[] = [];
  service: UbicazioniArticoliService;
  filter: any = {};
  alert: AlertService;

  columns: ColumnDefinition <UbicazioniArticoli>[] = [
    {
      title: 'Cod. Ubicazione',
      data: 'COD_UBICAZIONE',
      type: 'combo',
      asyncOptions: (row) => this.ubiSvc.getAll({ top: 15, search: row?.COD_UBICAZIONE == null ? "" : row?.COD_UBICAZIONE })
        .pipe(map(listBean => listBean.data.map(x => (
          {
            label: x.COD_UBICAZIONE + ' - ' + x.COD_CONTENITORE,
            value: x.COD_UBICAZIONE
          }
        )))),
      disabled: 'UPDATE',//UPDATE -> CHIAVE
      width: '10%'
    },
    {
      title: 'Codice Articolo',
      data: 'COD_ARTICOLO',
      type: 'combo',
      asyncOptions: (row) => this.articoliSvc.getAll({ top: 15, search: row?.COD_ARTICOLO == null ? "" : row?.COD_ARTICOLO })
        .pipe(map(listBean => listBean.data.map(x => (
          {
            label: x.ID_ARTICOLO,
            value: x.ID_ARTICOLO
          }
        )))),
      disabled: 'UPDATE',//UPDATE -> CHIAVE
      width: '10%',
      onChangeCallback: (event) => {
        alert();
      }
    },{
      title: 'Disegno',
      data: 'DISEGNO',
      type: 'input',
      disabled: 'ALWAYS',
      width: '20%'
    },
    {
      title: 'Descrizione',
      data: 'DESCRIZIONE',
      type: 'input',
      disabled: 'ALWAYS',
      width: '15%'
    },{
      title: 'Qnt. Prevista',
      data: 'QUANTITA_PREVISTA',
      type: 'number',
      width: '5%'
    },
    {
      title: 'Esaur.',
      data: 'SEGNALAZIONE_ESAURIMENTO',
      type: 'select',
      options: [{ label: 'Sì', value: 'Y' }, { label: 'No', value: 'N' }],
      width: '5%'
    },
    {
      title: 'Note',
      data: 'NOTE',
      type: 'input',
      width: '20%'
    }
  ];

  constructor(private ubiArtSvc: UbicazioniArticoliService,
              private alertService: AlertService,
              private ubiSvc: UbicazioniService,
              private articoliSvc: ArticoliService) {
    this.service = ubiArtSvc;
    this.alert = alertService;
  }

  ngOnInit(): void {
  }

  filterRow(editTableComponent: any): void {
    if (this.filter.search) {
      this.filter.search = this.filter.search.trim();
    }
    editTableComponent.filter(this.filter);
  }

  resetFilter(editTableComponent: any): void {
    delete this.filter.search;
    editTableComponent.filter(this.filter);
  }

  setError(errore: any) {
    console.log(errore);
    this.alert.error(errore);
  }

}
