import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCrudService } from './HttpCrudService';
import { Area, ListBean, ValueBean } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreeService implements HttpCrudService<Area> {

  constructor(private http: HttpClient) { }
  isMock:boolean = true;

  mockData: ListBean<Area> = {
    data: [
      {
        codice: 'M1',
        descrizione: 'Area M1',
        creationDate: new Date('2021-01-03')
      },
      {
        codice: 'M2',
        descrizione: 'Area M2',
        creationDate: new Date('2021-01-03')
      },
      {
        codice: 'M3',
        descrizione: 'Area M3',
        creationDate: new Date('2021-01-04')
      },
      {
        codice: 'M5',
        descrizione: 'Area M5',
        creationDate: new Date('2021-01-03')
      },
      {
        codice: 'M6',
        descrizione: 'Area M6',
        creationDate: new Date('2021-01-05')
      },
    ],
    count: 5
  };

  getAll(): Observable<ListBean<Area>> {
    // TODO return this.http.get<ListBean<Area>>('/some/url');
    this.isMock = false;
    if(this.isMock){
      return new Observable( observer => {
        // JSON parse/stringify serve per eseguire una deep copy
        const list: ListBean<Area> = JSON.parse(JSON.stringify(this.mockData));
        observer.next(list);
        observer.complete();
      });
    } else {
      return this.http.get<ListBean<Area>>(environment.wsUrl+`Aree.php`);
    } 
  }

  create(obj: Area): Observable<ValueBean<Area>> {
    // TODO return this.http.post<ValueBean<Area>>('/some/url');
    return new Observable( observer => {
      observer.next({ value: obj });
      observer.complete();
    });
  }

  update(obj: Area): Observable<ValueBean<Area>> {
    // TODO return this.http.put<ValueBean<Area>>('/some/url');
    return new Observable( observer => {
      observer.next({ value: obj });
      observer.complete();
    });
  }

  delete(obj: Area): Observable<void> {
    // TODO return this.http.delete<void>('/some/url');
    return new Observable( observer => {
      observer.next(undefined);
      observer.complete();
    });
  }
}
