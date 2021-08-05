import { Component, OnInit, ViewChild } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { IHouse } from '../../models/house';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { customPaginatorIntl } from '../../classes/customPaginatorIntl';

@Component({
  selector: 'app-houses-page',
  templateUrl: './houses-page.component.html',
  styleUrls: ['./houses-page.component.scss'],
})
export class HousesPageComponent implements OnInit {
  customPaginatorIntl: customPaginatorIntl;

  constructor(private houseService: HouseService, private snackBar: MatSnackBar) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  houseList: IHouse[];
  linkHeaders: string = '';

  pageSizeOptions: number;
  pageSize: number = 10;
  length: number;
  pageIndex: number;
  parts: any = {};
  params: {};

  ngOnInit(): void {
    this.getAllHouses();
  }
  getAllHouses(): void {
    this.houseService.getAllHouses(this.params).subscribe({
      next: (res) => {
        this.houseList = res.body;
        this.linkHeaders = res.headers.get('link');
        this.splitLinkHeaders(this.linkHeaders);
      },
      error: (err) => {
        this.snackBar.open(err.message, 'close');
      },
    });
  }
  splitLinkHeaders(linkHeaders: string): void {
    this.parts = linkHeaders.split(',').reduce((acc, link) => {
      let match = link.match(/<(.*)>; rel="(\w*)"/);
      let url, rel;
      if (match) {
        url = match[1];
      }
      if (match) {
        rel = match[2];
      }
      // @ts-ignore
      acc[rel] = url;
      return acc;
    }, {});
    let length = this.parts.last.substring(
      this.parts.last.lastIndexOf('page=') + 5,
      this.parts.last.lastIndexOf('pageSize') - 1
    );
    this.length = +length * this.pageSize;
  }
  onPaginateChange($event: PageEvent): void {
    this.pageSize = $event.pageSize;
    this.params = { page: $event.pageIndex, pageSize: $event.pageSize };
    this.getAllHouses();
  }
}
