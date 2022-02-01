import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ubicazione, ListBean, UbicazionePerArea } from '../_models';
import { MockService } from '../mat-edit-table';

@Injectable({ providedIn: 'root' })
export class ReportUbicazioniService extends MockService<Ubicazione> {
  constructor(private http: HttpClient) { super(); }

  codArea?: string;

  getAll(filter: any): Observable<ListBean<Ubicazione>> {
    if (!filter) {
      filter = {};
    }
    filter.COD_AREA = this.codArea;
    filter.orderby = 'SEGNALAZIONE_ESAURIMENTO DESC,COD_UBICAZIONE';
    return this.http.get<ListBean<any>>(environment.wsUrl + 'Ubicazioni.php', { params: filter });
  }

  getUbicazioniPerArea(): Observable<ListBean<UbicazionePerArea>> {
    return this.http.get<ListBean<any>>(environment.wsUrl + 'UbicazioniPerArea.php');
  }
}
