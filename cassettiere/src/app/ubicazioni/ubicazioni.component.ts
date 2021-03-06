import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ColumnDefinition, LabelValue } from '../mat-edit-table/ColumnDefinition';
import { UbicazioniService } from '../_services/ubicazioni.service';
import { Ubicazione } from '../_models';
import { ArticoliService } from '../_services/articoli.service';
import { AreeService } from '../_services/aree.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-ubicazioni',
  templateUrl: './ubicazioni.component.html',
  styleUrls: ['./ubicazioni.component.css'],
})
export class UbicazioniComponent implements OnInit {
  arrayAree: LabelValue[] = [];
  arrayEsaurimento: LabelValue[] = [];
  service: UbicazioniService;
  filter: any = {};
  alert: AlertService;

  columns: ColumnDefinition<Ubicazione>[] = [
    {
      title: 'Cod. Ubicazione',
      data: 'COD_UBICAZIONE',
      disabled: true,
      width: '15%'
    },
    {
      title: 'Cod. Articolo',
      data: 'COD_ARTICOLO_CONTENUTO',
      type: 'combo',
      asyncOptions: (row) => this.articoliService.getAll({ top: 15, search: row?.COD_ARTICOLO_CONTENUTO })
        .pipe(map(listBean => listBean.data.map(x => (
          {
            label: x.ID_ARTICOLO + ' - ' + x.DESCRIZIONE,
            value: x.ID_ARTICOLO
          }
        )))),
      width: '20%'
    },
    {
      title: 'Qnt. prevista',
      data: 'QUANTITA_PREVISTA',
      type: 'number',
      width: '10%'
    },
    {
      title: 'Area',
      data: 'COD_AREA',
      type: 'select',
      options: this.arrayAree,
      width: '20%'
    },
    {
      title: 'In esaurimento',
      data: 'SEGNALAZIONE_ESAURIMENTO',
      type: 'select',
      options: [{ label: 'Sì', value: 'Y' }, { label: 'No', value: 'N' }],
      render: (data) => (data === 'N' ? 'No' : 'Sì'),
      width: '10%'
    }
  ];

  constructor(private ubicSvc: UbicazioniService,
              private areeSvc: AreeService,
              private alertService: AlertService,
              private articoliService: ArticoliService) {
    this.service = ubicSvc;
    this.alert = alertService;
  }

  ngOnInit(): void {
    this.areeSvc.getAll().subscribe(
      response => {
        for (let i = 0; i < response.data.length; i++) {
          this.arrayAree.push({
            label: response.data[i].COD_AREA + ' - ' + response.data[i].DESCRIZIONE,
            value: response.data[i].COD_AREA
          });
        }
      }
    );
    this.arrayEsaurimento.push({ label: 'No', value: 'N' }, { label: 'Si', value: 'Y' });
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
