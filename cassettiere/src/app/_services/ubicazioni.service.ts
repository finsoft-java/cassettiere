import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpCrudService } from './HttpCrudService';
import { Ubicazione, ListBean, ValueBean } from '../_models';

@Injectable({ providedIn: 'root' })
export class UbicazioniService implements HttpCrudService<Ubicazione> {
  constructor(private http: HttpClient) { }

  getAll(filter?: any): Observable<ListBean<Ubicazione>> {
    return this.http.get<ListBean<Ubicazione>>(environment.wsUrl + 'Ubicazioni.php', { params: filter || {} });
  }

  create(obj: any): Observable<ValueBean<Ubicazione>> {
    return this.http.post<ValueBean<Ubicazione>>(environment.wsUrl + 'Ubicazioni.php', obj);
  }

  update(obj: any): Observable<ValueBean<Ubicazione>> {
    return this.http.put<ValueBean<Ubicazione>>(environment.wsUrl + 'Ubicazioni.php', obj);
  }

  delete(obj: any): Observable<void> {
    return this.http.delete<void>(environment.wsUrl + `Ubicazioni.php?COD_UBICAZIONE=${obj.COD_UBICAZIONE}`);
  }
}
