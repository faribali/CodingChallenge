import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IHouse } from '../models/house';
import { tap } from 'rxjs/internal/operators/tap';
import configuration from 'src/configuration.json';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  constructor(private http: HttpClient) {}

  apiUrl = configuration.apiUrl;

  GetAllHouses(): Observable<IHouse[]> {
    console.log(this.apiUrl);
    return this.http.get<IHouse[]>(this.apiUrl + '/houses', {}).pipe(
      tap((houseList) => {
        if (houseList) {
          debugger;
        }
      })
    );
  }
}
