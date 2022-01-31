import { ContenitorePadre } from './../_models/area';
import { Articolo } from '../_models/area';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCrudService } from './HttpCrudService';
import { Ubicazione, ListBean, ValueBean } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContenitorePadreService implements HttpCrudService<ContenitorePadre> {

  constructor(private http: HttpClient) { }

  getAll(filter?: any): Observable<ListBean<ContenitorePadre>> {
    return this.http.get<ListBean<ContenitorePadre>>(environment.wsUrl + 'ContenitorePadre.php', { params: filter || {}});
  }

  create(obj: any): Observable<ValueBean<ContenitorePadre>> {
    return this.http.post<ValueBean<ContenitorePadre>>(environment.wsUrl + 'ContenitorePadre.php', obj);
  }

  update(obj: any): Observable<ValueBean<ContenitorePadre>> {
    return this.http.put<ValueBean<ContenitorePadre>>(environment.wsUrl + 'ContenitorePadre.php', obj);
  }

  delete(obj: any): Observable<void> {
    return this.http.delete<void>(environment.wsUrl + `ContenitorePadre.php?COD_CONTENITORE=${obj.COD_CONTENITORE}`);
  }
}