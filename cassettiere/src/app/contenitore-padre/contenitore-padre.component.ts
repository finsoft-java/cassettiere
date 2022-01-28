import { ContenitorePadre } from './../_models/area';
import { ContenitorePadreService } from './../_services/contenitore.padre.service';
import { ArticoliService } from './../_services/articoli.service';
import { AreeService } from './../_services/aree.service';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ColumnDefinition, LabelValue } from '../mat-edit-table/ColumnDefinition';
import { UbicazioniService } from '../_services/ubicazioni.service';
import { AlertService } from '../_services/alert.service';
@Component({
  selector: 'app-contenitore-padre',
  templateUrl: './contenitore-padre.component.html',
  styleUrls: ['./contenitore-padre.component.css']
})
export class ContenitorePadreComponent implements OnInit {
  arrayAree: LabelValue[] = [];
  arrayEsaurimento: LabelValue[] = [];
  service: ContenitorePadreService;
  filter: any = {};
  alert: AlertService;
  constructor(private contenitoreSvc: ContenitorePadreService,
    private alertService: AlertService) {
    this.service = contenitoreSvc;
    this.alert = alertService;
}

  columns: ColumnDefinition<ContenitorePadre>[] = [
    {
      title: 'Cod. Contenitore',
      data: 'COD_CONTENITORE',
      disabled: true,
      width: '15%'
    },
    {
      title: 'Cod. Area',
      data: 'COD_AREA',
      type: 'input',
      width: '15%'
    },
    {
      title: 'Descrizione',
      data: 'DESCRIZIONE',
      type: 'input',
      width: '15%'
    },
    {
      title: 'Ordine',
      data: 'ORDINE',
      type: 'number',
      width: '7%'
    }
  ];
  ngOnInit(): void {
    this.service.getAll().subscribe(
      response => {
        console.log(response);
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
