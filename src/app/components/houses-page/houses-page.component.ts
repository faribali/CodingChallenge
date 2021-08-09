import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { IHouse } from '../../models/house';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { customPaginatorIntl } from '../../classes/customPaginatorIntl';
import { IPaginatedList } from '../../models/paginated-list';

@Component({
  selector: 'app-houses-page',
  templateUrl: './houses-page.component.html',
  styleUrls: ['./houses-page.component.scss'],
})
export class HousesPageComponent implements OnInit {
  customPaginatorIntl: customPaginatorIntl;

  constructor(private houseService: HouseService, private snackBar: MatSnackBar) {}

  houseList: IHouse[];
  linkHeaders: string = '';
  pageSize: number = 10;
  length: number;
  showLoadingSpinner: boolean = false;
  params: {};

  ngOnInit(): void {
    this.getAllHouses();
  }

  getAllHouses(): void {
    this.showLoadingSpinner = true;
    this.houseService.getAllHouses(this.params).subscribe({
      next: (res: IPaginatedList<IHouse>) => {
        this.houseList = res.items;
        this.length = res.lastPage;
      },
      error: (err) => {
        this.snackBar.open(err.message, 'close');
      },
      complete: () => {
        this.showLoadingSpinner = false;
      },
    });
  }

  onPaginateChange($event: PageEvent): void {
    this.pageSize = $event.pageSize;
    this.params = { page: $event.pageIndex + 1, pageSize: $event.pageSize };
    this.getAllHouses();
  }
}
