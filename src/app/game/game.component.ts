import { Component, model, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { GameInfoComponent } from '../game-info/game-info.component';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  playedCards: string[] = [];
  game: Game;
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor() {
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  pickCard() {
    if (!this.pickCardAnimation) {
      let card = this.game.stack.pop();
      this.currentCard = card ?? '';
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCard.push(this.currentCard);
        this.pickCardAnimation = false;
        this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name: this.name(), animal: this.animal()},
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push(name);
      }
    });
  }
}