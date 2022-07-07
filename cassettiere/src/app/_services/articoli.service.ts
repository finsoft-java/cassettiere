import { ValueBean } from './../_models/ValueBean';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Articolo, ListBean } from '../_models';
import { MockService } from '../mat-edit-table';

@Injectable({ providedIn: 'root' })
export class ArticoliService extends MockService<Articolo> {
  constructor(private http: HttpClient) { super(); }

  getAll(filter?: any): Observable<ListBean<Articolo>> {
    if (!filter) {
      filter = {};
    }
    if (!filter.top) {
      filter.top = 10;
    }
    return this.http.get<ListBean<any>>(environment.wsUrl + 'Articoli.php', { params: filter || {} });
  }

  getArticolo(codArticolo: string): Observable<ValueBean<Articolo>> {
    return this.http.get<ValueBean<Articolo>>(environment.wsUrl + 'Articoli.php',{ params: {'ID_ARTICOLO': codArticolo}});
  }
}
