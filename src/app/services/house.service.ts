import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import configuration from 'src/configuration.json';
import { IHouse } from '../models/house';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  constructor(private http: HttpClient) {}

  apiUrl = configuration.apiUrl;
  params = {};

  getAllHouses(params: {}): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/houses', { observe: 'response', params: params });
  }
  getSpecificHouse(url: string): Observable<IHouse> {
    return this.http.get<IHouse>(url);
  }
}
