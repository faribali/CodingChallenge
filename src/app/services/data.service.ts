import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IHouse } from '../models/house';
import { IPaginatedList } from '../models/paginated-list';

const WEB_API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class DataService<T> {
  constructor(private http: HttpClient) {}

  getSingle$(resourceName: string, id: string): Observable<T> {
    const url = `${WEB_API_URL}/${resourceName}/${id}`;
    const action = this.http.get(url) as Observable<T>;
    return action.pipe(retry(1), catchError(this.handleError));
  }

  getRaw$(url: string): Observable<T> {
    const action = this.http.get(url) as Observable<T>;
    return action.pipe(retry(1), catchError(this.handleError));
  }

  getList$(resourceName: string, params: any): Observable<IPaginatedList<IHouse>> {
    const url = `${WEB_API_URL}/${resourceName}`;
    const action = this.http.get<IHouse[]>(url, { observe: 'response', params: params });
    return action.pipe(
      retry(1),
      catchError(this.handleError),
      map((res) => {
        return {
          items: res.body as IHouse[],
          lastPage: this.splitLinkHeaders(res.headers.get('link')),
        } as IPaginatedList<IHouse>;
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  private splitLinkHeaders(linkHeaders: string | null): number {
    if (!linkHeaders) return 0;
    let paginationObject = linkHeaders.split(',').reduce((acc, link) => {
      let match = link.match(/<(.*)>; rel="(\w*)"/);
      let url, rel;
      if (match) {
        url = match[1];
      }
      if (match) {
        rel = match[2];
      }
      // @ts-ignore
      acc[rel] = url;
      return acc;
    }, {});
    return this.findingLastPageNumber(paginationObject);
  }
  findingLastPageNumber(paginationObject: { last?: any }): number {
    if (paginationObject.last !== undefined) {
      let length = paginationObject.last.substring(
        paginationObject.last.lastIndexOf('page=') + 5,
        paginationObject.last.lastIndexOf('pageSize') - 1
      );
      let pageSize = paginationObject.last.substring(
        paginationObject.last.lastIndexOf('pageSize') + 9,
        paginationObject.last.length
      );
      return +length * pageSize;
    } else {
      return 0;
    }
  }
}
