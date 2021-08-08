import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IHouse } from '../models/house';
import { DataService } from './data.service';
import { tap } from 'rxjs/operators';
import { IPaginatedList } from '../models/paginated-list';

const RESOURCE_NAME = 'houses';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  constructor(private dataService: DataService<IHouse>) {}

  apiUrl = environment.apiUrl;
  params = {};

  getAllHouses(params: {}): Observable<any> {
    return this.dataService.getList$(RESOURCE_NAME, params).pipe(
      tap((list: IPaginatedList<IHouse>) => {
        list?.items.forEach((house) => this.assignId(house));
      })
    );
  }
  getSpecificHouse(url: string): Observable<IHouse> {
    return this.dataService.getRaw$(url);
  }
  getHouseWithId(id: string): Observable<any> {
    return this.dataService.getSingle$(RESOURCE_NAME, id).pipe(tap((house: IHouse) => this.assignId(house)));
  }

  private assignId(house: IHouse) {
    let io = house.url.length;
    house.id = house.url.substring(house.url.lastIndexOf('houses/') + 7, io);
  }
}
