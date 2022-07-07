import { Component, OnInit } from '@angular/core';
import { ContenitorePadre } from '../_models';
import { ContenitorePadreService } from '../_services/contenitore.padre.service';
import { AreeService } from '../_services/aree.service';
import { ColumnDefinition, LabelValue } from '../mat-edit-table/ColumnDefinition';
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

  columns: ColumnDefinition<ContenitorePadre>[] = [
    {
      title: 'Cod. Contenitore',
      data: 'COD_CONTENITORE',
      disabled: 'UPDATE',
      width: '20%'
    },
    {
      title: 'Cod. Area',
      data: 'COD_AREA',
      type: 'select',
      options: this.arrayAree,
      width: '10%'
    },
    {
      title: 'Descrizione',
      data: 'DESCRIZIONE',
      type: 'input',
      width: '40%'
    },
    {
      title: 'Ordine',
      data: 'ORDINE',
      type: 'number',
      width: '10%'
    }
  ];

  constructor(private contenitoreSvc: ContenitorePadreService,
    private areeService: AreeService,
    private alertService: AlertService) {
    this.service = contenitoreSvc;
    this.areeService = areeService;
    this.alert = alertService;
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      response => {
        console.log(response);
      }
    );
    this.areeService.getAll().subscribe(
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
    this.alert.error(errore);
  }
}
