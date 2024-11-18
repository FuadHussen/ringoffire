import { Component, model, inject, OnInit, signal, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, PlayerMobileComponent, MatButtonModule, MatIconModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {

  playedCards: string[] = [];
  game: Game;
  gameId: string = '';
  gameOver: boolean = false;
  readonly animal = signal('');
  readonly name = model('');
  // readonly dialog = inject(MatDialog);

  constructor(private firestore: AngularFirestore, public dialog: MatDialog, private route: ActivatedRoute) {
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];

      this.firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log('game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCard = game.playedCard;
          this.game.players = game.players;
          this.game.playerImages = game.playerImages;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
    });
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      let card = this.game.stack.pop();
      this.game.currentCard = card ?? '';
      this.game.pickCardAnimation = true;
      this.updateGame();

      setTimeout(() => {
        this.game.playedCard.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
        this.updateGame();
      }, 1000);
    }
  }

  editPlayer(playerId: number) {
    console.log('edit player', playerId);

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.playerImages.splice(playerId, 1);
          this.game.players.splice(playerId, 1);
        } else {
          console.log('Recived Change', change);
          this.game.playerImages[playerId] = change;
        }
        this.updateGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.playerImages.push('profile.png');
        this.updateGame();
      }
    });
  }

  updateGame() {
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }
}