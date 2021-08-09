import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { IHouse } from '../../models/house';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { customPaginatorIntl } from '../../classes/customPaginatorIntl';
import { IPaginatedList } from '../../models/paginated-list';
import { ActivatedRoute, NavigationStart, Router, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-houses-page',
  templateUrl: './houses-page.component.html',
  styleUrls: ['./houses-page.component.scss'],
})
export class HousesPageComponent implements OnInit {
  customPaginatorIntl: customPaginatorIntl;

  constructor(
    private houseService: HouseService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        if (event.url) {
          if (event.url.includes('page=') && event.url.includes('pageSize=')) {
            this.pageIndex =
              Number(event.url.substring(event.url.lastIndexOf('page=') + 5, event.url.lastIndexOf('&'))) - 1;
            this.pageSize = Number(event.url.substring(event.url.lastIndexOf('pageSize') + 9, event.url.length));
          } else {
            if (!event.url.includes('page=') || !this.pageIndex) {
              debugger;
              this.pageIndex = 0;
            }
            if (!event.url.includes('pageSize=')) {
              this.pageSize = 10;
            }
          }
        } else {
          this.pageIndex = 0;
          this.pageSize = 10;
        }
        this.getAllHouses();
      }
    });
  }

  houseList: IHouse[];
  linkHeaders: string = '';
  pageSize: number;
  length: number;
  pageIndex: number;
  showLoadingSpinner: boolean = false;
  params: {};

  ngOnInit(): void {
    this.getPagingParameterFromURL();
    this.getAllHouses();
  }

  getPagingParameterFromURL(): void {
    if (this.route.snapshot.queryParams.pageSize) {
      this.pageSize = Number(this.route.snapshot.queryParams.pageSize);
    } else {
      this.pageSize = 10;
    }
    if (this.route.snapshot.queryParams.page) {
      this.pageIndex = Number(this.route.snapshot.queryParams.page) - 1;
    } else {
      this.pageIndex = 0;
    }
  }
  getAllHouses(): void {
    this.params = { page: this.pageIndex + 1, pageSize: this.pageSize };
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
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { page: $event.pageIndex + 1, pageSize: $event.pageSize },
    });
  }
}
