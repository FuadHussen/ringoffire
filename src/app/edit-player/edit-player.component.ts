import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  allProfilePictures = [
    'profile.png',
    'profile1.png',
    'ghost.png',
    'penguin.png',
    'potato.png',
    'christmas.png',
    'avocado.jpg',
  ] 
}
