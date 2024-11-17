import { Component, OnInit } from '@angular/core';
import { addDoc, doc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection, setDoc } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})

export class StartScreenComponent implements OnInit {

  constructor(private router: Router, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  async newGame() {
    let game = new Game();

    this.firestore
      .collection('games')
      .add(game.toJson())
      .then((gameInfo: any) => {
        this.router.navigate(['/game', gameInfo.id]);
      })


    // const coll = collection(this.firestore, 'games');
    // console.log("Document written with ID: ", coll);

    // let gameInfo = await addDoc(coll, { game: game.toJson() });
    // console.log("Document written with ID: ", gameInfo);
  }
}
