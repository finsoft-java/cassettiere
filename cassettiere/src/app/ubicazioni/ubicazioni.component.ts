import { FormControl } from '@angular/forms';
import { AlertService } from './../_services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { AreeService } from './../_services/aree.service';
import { ColumnDefinition, LabelValue } from './../mat-edit-table/ColumnDefinition';
import { DatePipe } from '@angular/common';
import { UbicazioniService } from './../_services/ubicazioni.service';
import { Component, OnInit } from '@angular/core';
import { Ubicazione } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ubicazioni',
  templateUrl: './ubicazioni.component.html',
  styleUrls: ['./ubicazioni.component.css']
})
export class UbicazioniComponent implements OnInit {
  arrayAree: LabelValue[] = [];
  arrayEsaurimento: LabelValue[] = [];
  service:  UbicazioniService;
  dataSource = new MatTableDataSource<[]>();
  search_box?: any[];
  displayedColumns: string[] = ['ubicazione','articolo', 'qnt','area','esaurimento', 'actions'];
  
  public bankCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  
  constructor(private ubicSvc: UbicazioniService,private areeSvc: AreeService, 
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) {
    this.service = ubicSvc;
  }

  getRecord(prgSpesa: any){
    prgSpesa.isEditable = true;
  }

  getUbicazioni(): void {
    this.ubicSvc.getAll()
      .subscribe(response => {
        console.log(response);
        this.dataSource = new MatTableDataSource<[]>(response["data"]);
      },
      error => {
        this.dataSource = new MatTableDataSource<[]>();
      });
  }
  
  deleteChange(prgSpesa:any){
    this.ubicSvc.delete(prgSpesa.ID_SPESA)
        .subscribe(response => {
        },
        error => {
          this.alertService.error("Impossibile eliminare il record");
        });
  }
  
  newUbicazione(){
    
  }
  salvaModifica(prgSpesa: any){
    if(prgSpesa.COD_UBICAZIONE == null){
        this.ubicSvc.create(prgSpesa)
        .subscribe(response => {
          this.dataSource.data.splice(-1, 1);
          this.dataSource.data.push(response["value"][0]);
          this.dataSource.data = this.dataSource.data;
          this.alertService.success("Ubicazione salvata con successo");
          prgSpesa.isEditable=false;
        },
        error => {
          this.alertService.error(error);
        });
    } else {
      if(prgSpesa.IMPORTO != '' || prgSpesa.IMPORTO != null){
        this.ubicSvc.update(prgSpesa)
        .subscribe(response => {
          this.alertService.success("Ubicazione modificata con successo");
          prgSpesa.isEditable=false;
        },
        error => {
          this.alertService.error(error);
        });
      }
    }
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
    this.getUbicazioni();
  }
  onSearchChange(event:any){
    console.log(event);
  }
}
