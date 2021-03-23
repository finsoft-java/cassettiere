import { Observable } from 'rxjs';
import { ListBean, ValueBean } from '../_models';


export interface HttpCrudService<T> {
  getAll(page?: number, size?: number, ...args: any[]): Observable<ListBean<T>>;
  create(obj: T): Observable<ValueBean<T>>;
  update(obj: T): Observable<ValueBean<T>>;
  delete(obj: T): Observable<void>;
}
