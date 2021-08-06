import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICharacter } from '../models/character';
import configuration from 'src/configuration.json';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  apiUrl = configuration.apiUrl;
  params = {};

  getCharacter(url: string): Observable<ICharacter> {
    return this.http.get<any>(url);
  }
}
