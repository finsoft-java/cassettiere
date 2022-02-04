import { UbicazioniArticoli } from './../_models/area';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListBean, UbicazionePerArea } from '../_models';
import { MockService } from '../mat-edit-table';

@Injectable({ providedIn: 'root' })
export class ReportUbicazioniService extends MockService<UbicazioniArticoli> {
  constructor(private http: HttpClient) { super(); }

  codContenitore?: string;

  getAll(filter: any): Observable<ListBean<UbicazioniArticoli>> {
    if (!filter) {
      filter = {};
    }
    console.log(filter);
    filter.COD_CONTENITORE = this.codContenitore;
    filter.orderby = 'SEGNALAZIONE_ESAURIMENTO DESC,COD_UBICAZIONE';
    return this.http.get<ListBean<any>>(environment.wsUrl + 'UbicazioniArticoli.php', { params: filter });
  }

  getUbicazioniPerArea(): Observable<ListBean<UbicazionePerArea>> {
    return this.http.get<ListBean<any>>(environment.wsUrl + 'UbicazioniPerArea.php');
  }
}
