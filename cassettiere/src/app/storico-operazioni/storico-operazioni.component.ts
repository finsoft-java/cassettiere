import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { ColumnDefinition } from './../mat-edit-table/ColumnDefinition';
import { StoricoOperazione } from './../_models/area';
import { StoricoOperazioniService } from './../_services/storico-operazioni.service';
import { Component, OnInit } from '@angular/core';
import { startWith, map, filter } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-storico-operazioni',
  templateUrl: './storico-operazioni.component.html',
  styleUrls: ['./storico-operazioni.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})
export class StoricoOperazioniComponent implements OnInit {
  displayedColumns: string[] = ['ID_OPERAZIONE', 'COD_UTENTE', 'COD_OPERAZIONE', 'COD_ARTICOLO','COD_UBICAZIONE','COD_AREA','DATA'];
  dataSource:StoricoOperazione[] = [];
  filter:any={};
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  myControl = new FormControl();

  constructor(private storOpSvc: StoricoOperazioniService) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
  }

  ngOnInit(): void {
    
    this.storOpSvc.getAll(null).subscribe(
      response => {
        console.log(response);
        this.dataSource = response["data"];
        console.log(this.dataSource);
      },
      error => {
        
      }
    );
  }

  filterRow(){

    delete this.filter["DATA_INIZIO"];
    delete this.filter["DATA_FINE"];

    if(this.range.value.end != null)
      this.filter.DATA_FINE = formatDate(this.range.value.end ,"YYYY-MM-dd","en-GB");

    if(this.range.value.start != null)
      this.filter.DATA_INIZIO = formatDate(this.range.value.start ,"YYYY-MM-dd","en-GB");
    
    if(this.filter.searchString) 
      this.filter.searchString = this.filter.searchString.trim();
      
    this.storOpSvc.getAll(this.filter).subscribe(
      response => {
        console.log(response);
        this.dataSource = response["data"];
        console.log(this.dataSource);
      },
      error => {
        
      }
    );;
  }

}
