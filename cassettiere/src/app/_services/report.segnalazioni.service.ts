import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListBean, Segnalazione } from '../_models';
import { MockService } from '../mat-edit-table';

@Injectable({ providedIn: 'root' })
export class ReportSegnalazioniService extends MockService<Segnalazione> {
  constructor(private http: HttpClient) { super(); }

  getAll(filter: any): Observable<ListBean<Segnalazione>> {
    return this.http.get<ListBean<Segnalazione>>(environment.wsUrl + 'SegnalazioniAttive.php', { params: filter });
  }
}
