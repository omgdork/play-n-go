import { Component, OnInit } from '@angular/core';
import { Game } from './game.model';
import { GameService } from './game.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { GameDetailsDialogComponent } from './game-details-dialog.component';

@Component({
  selector: 'game-list',
  providers: [GameService],
  entryComponents: [GameDetailsDialogComponent],
  templateUrl: './game-list.component.html'
})
export class GameListComponent implements OnInit {
  public dialogRef: MdDialogRef<GameDetailsDialogComponent>;
  private games: Game[] = [];

  constructor(public dialog: MdDialog,
              private gameService: GameService) {}

  public ngOnInit() {
    console.log('Game List component created.');
    this.gameService.getGames().subscribe((games) => this.games = games);
  }

  public showGameDetails(game: Game): void {
    this.dialogRef = this.dialog.open(GameDetailsDialogComponent);
    this.dialogRef.componentInstance.game = game;
  }
}
