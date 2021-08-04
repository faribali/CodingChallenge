import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { IHouse } from '../../models/house';

@Component({
  selector: 'app-houses-page',
  templateUrl: './houses-page.component.html',
  styleUrls: ['./houses-page.component.scss'],
})
export class HousesPageComponent implements OnInit {
  constructor(private houseService: HouseService) {}
  houseList: IHouse[];
  ngOnInit(): void {
    this.houseService.GetAllHouses().subscribe({
      next: (houselist) => {
        debugger;
        this.houseList = houselist;
      },
    });
  }
}
