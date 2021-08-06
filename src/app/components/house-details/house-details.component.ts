import { Component, Directive, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { HouseService } from '../../services/house.service';
import { IHouse } from '../../models/house';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICharacter } from '../../models/character';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CharacterDialogComponent } from '../dialogs/character-dialog/character-dialog.component';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss'],
})
export class HouseDetailsComponent implements OnInit {
  overLordName: string = '';
  swornMembersName: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private houseService: HouseService,
    private location: Location,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  house: any;

  ngOnInit(): void {
    this.house = this.location.getState();
    if (this.overlordExists()) {
      this.getOverLord(this.house.overlord);
    }
    if (this.swornListIsNOTEmpty()) {
      this.getSwornMembersName();
    }
  }
  swornListIsNOTEmpty(): boolean {
    return this.house.swornMembers[0] !== '' && this.house.swornMembers.length !== 0 ? true : false;
  }

  overlordExists(): boolean {
    return this.house.overlord !== '' ? true : false;
  }

  getSwornMembersName(): void {
    for (let characterUrl of this.house.swornMembers) {
      this.characterService.getCharacter(characterUrl).subscribe({
        next: (res: ICharacter) => {
          this.swornMembersName.push(res.name);
        },
        error: (err) => {
          this.snackBar.open(err.message, 'close');
        },
      });
    }
  }

  getOverLord(url: string): void {
    this.houseService.getSpecificHouse(url).subscribe({
      next: (res: IHouse) => {
        this.overLordName = res.name;
      },
      error: (err) => {
        this.snackBar.open(err.message, 'close');
      },
    });
  }

  getCharacterDetails(url: string): void {
    this.characterService.getCharacter(url).subscribe({
      next: (res: ICharacter) => {
        this.openCharacterDialog(res);
      },
      error: (err) => {
        this.snackBar.open(err.message, 'close');
      },
    });
  }

  openCharacterDialog(characterDetails: ICharacter): void {
    this.dialog.open(CharacterDialogComponent, {
      maxHeight: '600px',
      data: characterDetails,
    });
  }
}
