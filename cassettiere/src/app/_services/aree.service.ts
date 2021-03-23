import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area, ListBean } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AreeService {

  constructor(private http: HttpClient) { }

  get(): Observable<ListBean<Area>> {
    return this.http.get<ListBean<Area>>('/some/url');
  }

  getMockData(): Observable<ListBean<Area>> {
    const result: ListBean<Area> = {
      data: [
        {
          codice: 'M1',
          descrizione: 'Area M1'
        },
        {
          codice: 'M2',
          descrizione: 'Area M2'
        },
        {
          codice: 'M3',
          descrizione: 'Area M3'
        },
        {
          codice: 'M5',
          descrizione: 'Area M5'
        },
        {
          codice: 'M6',
          descrizione: 'Area M6'
        },
      ],
      count: 5
    };

    return new Observable( observer => {
      observer.next(result);
      observer.complete();
    });
  }
}
