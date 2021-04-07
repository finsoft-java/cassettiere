import { Component, OnInit } from '@angular/core';
import { ColumnDefinition } from '../mat-edit-table';
import { Ubicazione, UbicazionePerArea } from '../_models';
import { ReportUbicazioniService } from '../_services/report.ubicazioni.service';

@Component({
  selector: 'app-report-ubicazioni',
  templateUrl: './report-ubicazioni.component.html',
  styleUrls: ['./report-ubicazioni.component.css']
})
export class ReportUbicazioniComponent implements OnInit {

  columns: ColumnDefinition<Ubicazione>[] = [
    {
      title: 'Area',
      data: 'COD_AREA',
      render: (data, row) => data + ' ' + row?.DESCRIZIONE_AREA
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
      title: 'Quantità prevista',
      data: 'QUANTITA_PREVISTA'
    },
    {
      title: 'Utente segnalante',
      data: 'COD_UTENTE'
    },
    {
      title: 'Timestamp segnalazione',
      data: 'TIMESTAMP'
    }
  ];
  service: ReportUbicazioniService;
  ubicazioni: UbicazionePerArea[] = [];
  showTable = false;

  constructor(private ubicazioniService: ReportUbicazioniService) {
    this.service = ubicazioniService;
   }

  ngOnInit(): void {
    this.ubicazioniService.getUbicazioniPerArea().subscribe(
      response => {
        this.ubicazioni = response.data;
      },
      error => {
        console.error(error); // FIXME
      }
    );
  }

  setArea(codArea: string, editTableComponent: any): void {
    this.showTable = false;
    this.service.codArea = codArea;
    editTableComponent.filter({
      COD_AREA: codArea
    });
    this.showTable = true;
  }

}
