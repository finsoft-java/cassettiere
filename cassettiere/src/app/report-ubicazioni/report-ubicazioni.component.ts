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
      title: 'In esaurimento',
      data: 'SEGNALAZIONE_ESAURIMENTO',
      render: (data: any) => (data === 'N' ? 'No' : 'Sì')
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
    editTableComponent.filter({ COD_AREA: codArea });
    this.showTable = true;
  }

  formattazioneCondizionale(row: Ubicazione): any {
    return { color: (row.SEGNALAZIONE_ESAURIMENTO === 'N') ? null : 'red' };
  }
}
