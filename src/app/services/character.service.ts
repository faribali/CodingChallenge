import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharacter } from '../models/character';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private dataService: DataService<any>) {}

  getCharacter(url: string): Observable<ICharacter> {
    return this.dataService.getRaw$(url);
  }
}
