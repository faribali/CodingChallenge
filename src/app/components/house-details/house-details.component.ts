import { Component, Directive, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from '../../services/house.service';
import { IHouse } from '../../models/house';
import { Location } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { CharacterDialogComponent } from '../dialogs/character-dialog/character-dialog.component';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss'],
})
export class HouseDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: HouseService,
    private location: Location,
    private dialog: MatDialog
  ) {}

  @Input() house: any;

  ngOnInit(): void {
    this.house = this.location.getState();
  }

  showCharacterDetails(founder: string): void {
    this.dialog.open(CharacterDialogComponent, {
      maxHeight: '600px',
      data: {
        animal: 'panda',
      },
    });
  }
}
