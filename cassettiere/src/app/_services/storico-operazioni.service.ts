import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MockService } from '../mat-edit-table';
import { ListBean, StoricoOperazione } from '../_models';

@Injectable({ providedIn: 'root' })
export class StoricoOperazioniService extends MockService<StoricoOperazione> {
  constructor(private http: HttpClient) {
    super();
  }

  getAll(filter: any): Observable<ListBean<StoricoOperazione>> {
    return this.http.get<ListBean<StoricoOperazione>>(environment.wsUrl + 'StoricoOperazioni.php', { params: filter });
  }
}
