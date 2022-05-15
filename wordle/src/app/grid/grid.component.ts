import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { BlockComponent } from "C:/Users/Angel/IdeaProjects/wordle/wordle/src/app/grid/block/block.component";
import { LetterState } from '../Enums/LetterState';
import * as confetti from 'canvas-confetti';
import * as wordGenerator from 'random-words';
declare var require: any;
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  winningWord: string;
  rows: any[] = [];
  submitCount: number;
  wordFilled: boolean;
  currentIndex: number = 0;
  numLettersCorrect: number = 0;
  private renderer2: Renderer2;
  private elementRef: ElementRef;
  constructor() {
    this.submitCount = 0;
    this.wordFilled = false;
    this.winningWord = this.getWord();
    for (let i = 0; i < 6; i++) {
      let row: BlockComponent[] = [];
      for (let j = 0; j < 5; j++) {
        row.push(new BlockComponent());
      }
      this.rows.push(row);
    }
     window.addEventListener("keydown", this.onKeyPressEvent.bind(this));
  }

  ngOnInit(): void {}

  onKeyPressEvent(event: any){
    const letter: string = event.key;
    if (letter == "Backspace") {
      if (this.currentIndex > 0) {
        this.rows[this.submitCount][this.currentIndex-1].clear();
        this.currentIndex--;
      }
    } else if (letter == "Enter") {
      if (this.currentIndex == 5) {this.submitWord();}
    } else if (!/\W|\d/g.test(letter)) {
      if (this.currentIndex < 5) {
        this.rows[this.submitCount][this.currentIndex].setLetter(letter);
        this.currentIndex++;
      }
    }
  }

  canSubmit() {
    return (this.currentIndex == 5);
  }

  submitWord() {
    this.numLettersCorrect = 0;
    if (this.submitCount < 6) {
      for (let i = 0; i < this.rows[this.submitCount].length; i++) {
       const letter = this.rows[this.submitCount][i];
       if (letter.getLetter() == this.winningWord[i]) {
        letter.setState(LetterState.CORRECT);
        this.numLettersCorrect++;
       } else if (this.winningWord.includes(letter.getLetter())) {
//         TODO: fix logic for partials
        letter.setState(LetterState.PARTIAL);
       } else {
        letter.setState(LetterState.FALSE);
       }
      }
     if (this.numLettersCorrect == 5) {
      this.createConfetti();
     }
    this.submitCount += 1;
    this.currentIndex = 0;
    }
  }

  restart() {
    this.submitCount = 0;
    this.wordFilled = false;
    this.winningWord = this.getWord();
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        this.rows[i][j] = new BlockComponent();
      }
    }
  }

  getWord(): string {
    let word = "";
    while (word.length !== 5) {
      let randomWords = require('random-words');
      word = randomWords();
    }
    return word;
  }

  createConfetti() {
//     var myCanvas = document.createElement('canvas')!;
//       document.body.appendChild(myCanvas);
//         confetti.create(myCanvas, {resize: true})({
//             particleCount: 1000,
//             spread: 160,
//         });
//     }
  }
}
