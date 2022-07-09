import { Component, OnInit } from '@angular/core';
import { GridComponent } from 'C:/Users/Angel/IdeaProjects/wordle/wordle/src/app/grid/grid.component';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {
  keyboard: string[][] = this.createKeyboard();
  grid: GridComponent;
  constructor() {
    this.grid = new GridComponent();
  }

  ngOnInit(): void {
  }

  createKeyboard() {
    return [ ["q","w","e","r","t","y","u","i","o","p"], ["a","s","d","f","g","h","j","k","l"], ["z","x","c","v","b","n","m"] ];
  }

  addLetter(letter: string) {
    this.grid.onKeyPressEvent(letter);
  }

}
