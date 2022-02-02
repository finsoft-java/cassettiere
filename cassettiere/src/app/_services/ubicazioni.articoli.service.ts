import { UbicazioniArticoli, Articolo } from './../_models/area';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCrudService } from './HttpCrudService';
import { ListBean, ValueBean } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbicazioniArticoliService implements HttpCrudService<UbicazioniArticoli> {

  constructor(private http: HttpClient) { }

  getAll(filter?: any): Observable<ListBean<UbicazioniArticoli>> {
    return this.http.get<ListBean<UbicazioniArticoli>>(environment.wsUrl + 'UbicazioniArticoli.php', { params: filter || {}});
  }

  create(obj: any): Observable<ValueBean<UbicazioniArticoli>> {
    return this.http.post<ValueBean<UbicazioniArticoli>>(environment.wsUrl + 'UbicazioniArticoli.php', obj);
  }

  update(obj: any): Observable<ValueBean<UbicazioniArticoli>> {
    return this.http.put<ValueBean<UbicazioniArticoli>>(environment.wsUrl + 'UbicazioniArticoli.php', obj);
  }

  delete(obj: any): Observable<void> {
    return this.http.delete<void>(environment.wsUrl + `UbicazioniArticoli.php?COD_UBICAZIONE=${obj.COD_UBICAZIONE}&COD_ARTICOLO=${obj.COD_ARTICOLO}`);
  }
}
