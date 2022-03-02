import { Component, OnInit } from '@angular/core';
import { ColumnDefinition } from '../mat-edit-table';
import { UbicazionePerArea, UbicazioniArticoli } from '../_models';
import { AlertService } from '../_services/alert.service';
import { ReportUbicazioniService } from '../_services/report.ubicazioni.service';

@Component({
  selector: 'app-report-ubicazioni',
  templateUrl: './report-ubicazioni.component.html',
  styleUrls: ['./report-ubicazioni.component.css']
})
export class ReportUbicazioniComponent implements OnInit {
  columns: ColumnDefinition<UbicazioniArticoli>[] = [
    {
      title: 'Ubicazione',
      data: 'COD_UBICAZIONE'
    },
    {
      title: 'Articolo',
      data: 'COD_ARTICOLO'
    },
    {
      title: 'Descrizione',
      data: 'DESCRIZIONE'
    },
    {
      title: 'Cod. disegno',
      data: 'DISEGNO'
    },
    {
      title: 'Quantità prevista',
      data: 'QUANTITA_PREVISTA',
      width: '2cm'
    },
    {
      title: 'In esaurimento',
      data: 'SEGNALAZIONE_ESAURIMENTO',
      width: '2cm',
      render: (data: any) => ((data === 'N' || data === null) ? 'No' : 'Sì')
    }
  ];
  service: ReportUbicazioniService;
  ubicazioni: UbicazionePerArea[] = [];
  showTable = false;

  constructor(private ubicazioniService: ReportUbicazioniService,
    private alertService: AlertService) {
    this.service = ubicazioniService;
  }

  ngOnInit(): void {
    this.ubicazioniService.getUbicazioniPerArea().subscribe(
      response => {
        this.ubicazioni = response.data;
        console.log(this.ubicazioni);
      },
      error => {
        this.alertService.error(error);
        console.error(error); // FIXME
      }
    );
  }

  setArea(contenitore: string, editTableComponent: any): void {
    this.showTable = false;
    this.service.codContenitore = contenitore;
    editTableComponent.filter({ COD_CONTENITORE: contenitore });
    this.showTable = true;
  }

  formattazioneCondizionale(row: UbicazioniArticoli): any {
    return { color: (row.SEGNALAZIONE_ESAURIMENTO === 'N') ? null : 'red' };
  }
}
