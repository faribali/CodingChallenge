import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigurationService } from './configuration/configuration.service';
import { IHouse } from '../models/house';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  constructor(private http: HttpClient, private configService: ConfigurationService) {}

  //config = this.configService.getConfig();
  //apiUrl = this.config.apiUrl;

  GetAllHouses(): Observable<IHouse[]> {
    return this.http.get<IHouse[]>(`https://anapioficeandfire.com/api/houses`, {}).pipe(
      tap((houseList) => {
        if (houseList) {
          debugger;
        }
      })
    );
  }
}
