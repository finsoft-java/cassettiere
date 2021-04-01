import { ColumnDefinition } from './../mat-edit-table/ColumnDefinition';
import { StoricoOperazione } from './../_models/area';
import { StoricoOperazioniService } from './../_services/storico-operazioni.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storico-operazioni',
  templateUrl: './storico-operazioni.component.html',
  styleUrls: ['./storico-operazioni.component.css']
})
export class StoricoOperazioniComponent implements OnInit {
  displayedColumns: string[] = ['ID_OPERAZIONE', 'COD_UTENTE', 'COD_OPERAZIONE', 'COD_ARTICOLO','COD_UBICAZIONE','COD_AREA','DATA'];
  dataSource:StoricoOperazione[] = [];

  constructor(private storOpSvc: StoricoOperazioniService) {
  }

  ngOnInit(): void {
    this.storOpSvc.getAll().subscribe(
      response => {
        console.log(response);
        this.dataSource = response["data"];
        console.log(this.dataSource);
      },
      error => {
        
      }
    );
  }

}
