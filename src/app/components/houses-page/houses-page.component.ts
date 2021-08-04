import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { IHouse } from '../../models/house';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-houses-page',
  templateUrl: './houses-page.component.html',
  styleUrls: ['./houses-page.component.scss'],
})
export class HousesPageComponent implements OnInit {
  constructor(private houseService: HouseService, private snackBar: MatSnackBar) {}
  houseList: IHouse[];
  ngOnInit(): void {
    let self = this;
    this.houseService.GetAllHouses().subscribe({
      next: (houseList) => {
        this.houseList = houseList;
      },
      error: (err) => {
        debugger;
        this.snackBar.open(err.message, 'close');
      },
    });
  }
}
