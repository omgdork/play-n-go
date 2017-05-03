import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Game } from './game.model';

@Component({
  selector: 'game-details-dialog',
  templateUrl: './game-details-dialog.component.html',
  styleUrls: ['./game-details-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameDetailsDialogComponent {
  @HostBinding('class') public classes = 'game-details-dialog';

  public game: Game;

  constructor(public dialogRef: MdDialogRef<GameDetailsDialogComponent>) {}

  public hideDetailsDialog(): void {
    this.dialogRef.close();
  }
}
