import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ColumnDefinition, LabelValue } from '../mat-edit-table/ColumnDefinition';
import { AlertService } from '../_services/alert.service';
import { UbicazioniArticoliService } from '../_services/ubicazioni.articoli.service';
import { UbicazioniService } from '../_services/ubicazioni.service';
import { ArticoliService } from '../_services/articoli.service';
import { UbicazioniArticoli } from '../_models/models';
import { MatEditTableComponent } from '../mat-edit-table/mat-edit-table.component';
import { Action } from '../mat-edit-table/Action';

@Component({
  selector: 'app-ubicazioni-articoli',
  templateUrl: './ubicazioni-articoli.component.html',
  styleUrls: ['./ubicazioni-articoli.component.css']
})
export class UbicazioniArticoliComponent implements OnInit, AfterViewInit {
  arrayAree: LabelValue[] = [];
  service: UbicazioniArticoliService;
  filter: any = {};
  alert: AlertService;

  columns: ColumnDefinition <UbicazioniArticoli>[] = [
    {
      title: 'Cod. Ubicazione',
      data: 'COD_UBICAZIONE',
      type: 'combo',
      reloadOptions: (row) => this.ubiSvc.getAll({ top: 15, search: row?.COD_UBICAZIONE == null ? '' : row?.COD_UBICAZIONE })
        .pipe(map(listBean => listBean.data.map(x => (
          {
            label: x.COD_UBICAZIONE + ' - ' + x.COD_CONTENITORE,
            value: x.COD_UBICAZIONE
          }
        )))),
      disabled: 'UPDATE', // UPDATE -> CHIAVE
      width: '10%'
    },
    {
      title: 'Codice Articolo',
      data: 'COD_ARTICOLO',
      type: 'combo',
      reloadOptions: (row) => this.articoliSvc.getAll({ top: 15, search: row?.COD_ARTICOLO == null ? '' : row?.COD_ARTICOLO })
        .pipe(map(listBean => listBean.data.map(x => (
          {
            label: x.ID_ARTICOLO,
            value: x.ID_ARTICOLO
          }
        )))),
      disabled: 'UPDATE', // UPDATE -> CHIAVE
      width: '10%',
      onChange: (value: string, col: ColumnDefinition<UbicazioniArticoli>, row: UbicazioniArticoli) => {
        this.articoliSvc.getArticolo(value)
          .subscribe(response => {
            row.DESCRIZIONE = response.value.DESCRIZIONE;
            row.DISEGNO = response.value.DISEGNO;
          },
          error => {
          });
      }
    },
    {
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
    },
    {
      title: 'Qnt. Prevista',
      data: 'QUANTITA_PREVISTA',
      type: 'number',
      width: '5%'
    },
    {
      title: 'Esaur.',
      data: 'SEGNALAZIONE_ESAURIMENTO',
      type: 'select',
      options: [{ label: 'Si', value: 'Y' }, { label: 'No', value: 'N' }],
      width: '5%',
      defaultValue: 'N'
    },
    {
      title: 'Note',
      data: 'NOTE',
      type: 'input',
      width: '20%'
    }
  ];

  // Questo è il bottone che azzera la segnalazione
  actions: Action<UbicazioniArticoli>[] = [
    {
      title: 'Azzera',
      icon: 'done',
      color: 'primary',
      onClick: (row: UbicazioniArticoli) => {
        row.SEGNALAZIONE_ESAURIMENTO = 'N';
        this.service.update(row).subscribe();
      }
    }
  ];

  @ViewChild('myTable')
  editTableComponent!: MatEditTableComponent<UbicazioniArticoli>;

  constructor(private ubiArtSvc: UbicazioniArticoliService,
              private alertService: AlertService,
              private ubiSvc: UbicazioniService,
              private articoliSvc: ArticoliService,
              private route: ActivatedRoute) {
    this.service = ubiArtSvc;
    this.alert = alertService;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.filter) {
        this.filter.search = params.filter;
      }
    });
  }

  ngAfterViewInit() {
    if (this.filter.search) {
      this.filterRow(this.editTableComponent);
    }
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
