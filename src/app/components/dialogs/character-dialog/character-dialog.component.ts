import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICharacter } from '../../../models/character';

@Component({
  selector: 'app-character-dialog',
  templateUrl: './character-dialog.component.html',
  styleUrls: ['./character-dialog.component.scss'],
})
export class CharacterDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ICharacter) {}

  ngOnInit(): void {}
}
