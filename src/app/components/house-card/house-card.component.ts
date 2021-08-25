import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IHouse } from '../../models/house';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss'],
})
export class HouseCardComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() house: IHouse;

  ngOnInit(): void {}

  showDetailsPage(): void {
    this.router.navigateByUrl('/houseDetails/' + this.house.id);
  }
}
