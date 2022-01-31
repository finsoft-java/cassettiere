import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ColumnDefinition, LabelValue } from '../mat-edit-table/ColumnDefinition';
import { UbicazioniService } from '../_services/ubicazioni.service';
import { Ubicazione } from '../_models';
import { AlertService } from '../_services/alert.service';
import { ContenitorePadreService } from '../_services/contenitore.padre.service';

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
      type: 'input',
      disabled: true,
      width: '40%'
    },
    {
      title: 'Contenitore Padre',
      data: 'COD_CONTENITORE',
      type: 'combo',
      asyncOptions: (row) => this.contPadreSvc.getAll({ top: 15, search: row?.COD_CONTENITORE })
        .pipe(map(listBean => listBean.data.map(x => (
          {
            label: x.COD_CONTENITORE + ' - ' + x.COD_AREA,
            value: x.COD_CONTENITORE
          }
        )))),
      width: '40%'
    }
  ];

  constructor(private ubicSvc: UbicazioniService,
              private contPadreSvc: ContenitorePadreService,
              private alertService: AlertService) {
    this.service = ubicSvc;
    this.alert = alertService;
  }

  ngOnInit(): void {
    this.contPadreSvc.getAll().subscribe(
      response => {
        for (let i = 0; i < response.data.length; i++) {
          this.arrayAree.push({
            label: response.data[i].COD_CONTENITORE + ' - ' + response.data[i].DESCRIZIONE,
            value: response.data[i].COD_CONTENITORE
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
