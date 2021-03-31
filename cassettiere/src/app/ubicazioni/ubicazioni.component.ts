import { AreeService } from './../_services/aree.service';
import { ColumnDefinition, LabelValue } from './../mat-edit-table/ColumnDefinition';
import { DatePipe } from '@angular/common';
import { UbicazioniService } from './../_services/ubicazioni.service';
import { Component, OnInit } from '@angular/core';
import { Ubicazione } from '../_models';

@Component({
  selector: 'app-ubicazioni',
  templateUrl: './ubicazioni.component.html',
  styleUrls: ['./ubicazioni.component.css']
})
export class UbicazioniComponent implements OnInit {
  arrayAree: LabelValue[] = [];
  arrayEsaurimento: LabelValue[] = [];
  service:  UbicazioniService;
  columns: ColumnDefinition<Ubicazione>[] = [
    {
      title: 'Cod. Ubicazione',
      data: 'COD_UBICAZIONE',
      type: 'text',
      width: '20%',
      disabled: true
    },
    {
      title: 'Cod. Articolo',
      data: 'COD_ARTICOLO_CONTENUTO',
      type: 'text',
      width: '20%'
    },
    {
      title: 'Qnt. Prevista',
      data: 'QUANTITA_PREVISTA',
      type: 'text',
      width: '10%'
    },
    {
      title: 'Cod. Area',
      data: 'COD_AREA',
      type: 'select',
      options: this.arrayAree,//{label-value}
      width: '25%',
      render: (data,row) => row?.COD_AREA+" - "+row?.DESCRIZIONE_AREA
    },
    {
      title: 'Esaurimento',
      data: 'SEGNALAZIONE_ESAURIMENTO',
      type: 'select',
      options: this.arrayEsaurimento,//{label-value}
      width: '5%',
      render: (data) => data == 'N' ? 'No' : 'Si'
    }
  ];

  constructor(private ubicSvc: UbicazioniService,private areeSvc: AreeService) {
    this.service = ubicSvc;
  }

  ngOnInit(): void {
    this.areeSvc.getAll().subscribe(
      response => {
        console.log(response);
        for(let i =0; i < response.data.length; i++){
          this.arrayAree.push({label:response.data[i].COD_AREA+" - "+response.data[i].DESCRIZIONE,value:response.data[i].COD_AREA});
        }
      },
      error => {
        
      }
    );

    this.arrayEsaurimento.push({label:'No',value:'N'},{label:'Si',value:'Y'});
  }
}
