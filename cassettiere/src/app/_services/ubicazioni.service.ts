import { Articolo } from './../_models/area';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCrudService } from './HttpCrudService';
import { Ubicazione, ListBean, ValueBean } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbicazioniService implements HttpCrudService<Ubicazione> {

  constructor(private http: HttpClient) { }
  isMock:boolean = true;

  mockData: ListBean<Articolo> = {
    data: [
      {
        ID_ARTICOLO: '1',
        DESCRIZIONE: 'PRODOTTO M1'
      },
      {
        ID_ARTICOLO: '2',
        DESCRIZIONE: 'PRODOTTO M2'
      },
      {
        ID_ARTICOLO: '3',
        DESCRIZIONE: 'PRODOTTO M3'
      },
      {
        ID_ARTICOLO: '4',
        DESCRIZIONE: 'PRODOTTO M4'
      },
      {
        ID_ARTICOLO: '5',
        DESCRIZIONE: 'PRODOTTO M5'
      }
    ],
    count: 5
  };

  getAll(): Observable<ListBean<Ubicazione>> {
    this.isMock = false;
    if(this.isMock){
      return new Observable( observer => {
        // JSON parse/stringify serve per eseguire una deep copy
        const list: ListBean<Ubicazione> = JSON.parse(JSON.stringify(this.mockData));
        observer.next(list);
        observer.complete();
      });
    } else {
      return this.http.get<ListBean<Ubicazione>>(environment.wsUrl+`Ubicazioni.php`);
    } 
  }

  create(obj: Ubicazione): Observable<ValueBean<Ubicazione>> {
    this.isMock = false;
    if(this.isMock){
      return new Observable( observer => {
        observer.next({ value: obj });
        observer.complete();
      });
    }else{
      return this.http.post<ValueBean<Ubicazione>>(environment.wsUrl+`Ubicazioni.php`,obj);
    }
  }

  update(obj: Ubicazione): Observable<ValueBean<Ubicazione>> {
    this.isMock = false;
    if(this.isMock){
      return new Observable( observer => {
        observer.next({ value: obj });
        observer.complete();
      });
    }else{
      return this.http.put<ValueBean<Ubicazione>>(environment.wsUrl+`Ubicazioni.php`,obj);
    }
  }

  delete(obj: Ubicazione): Observable<void> {
    console.log(obj);
    this.isMock = false;
    if(this.isMock){
      return new Observable( observer => {
        observer.next(undefined);
        observer.complete();
      });
    }else{      
      return this.http.delete<any>(environment.wsUrl+`Ubicazioni.php?COD_AREA=${obj.COD_AREA}`);
    }
  }
}
