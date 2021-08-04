import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHouse } from '../../models/house';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss'],
})
export class HouseCardComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  @Input() house: IHouse;
  ngOnInit(): void {}
  showDetailsPage(): void {
    this.router.navigateByUrl('/houseDetails', { state: this.house });
  }
}
