import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHouse } from '../models/house';
import configuration from 'src/configuration.json';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  constructor(private http: HttpClient) {}

  apiUrl = configuration.apiUrl;

  GetAllHouses(): Observable<IHouse[]> {
    return this.http.get<IHouse[]>(this.apiUrl + '/housessss');
  }
}
