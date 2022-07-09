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
  canvas = document.querySelector('canvas')!;
  constructor() {
    this.submitCount = 0;
    this.wordFilled = false;
//     this.winningWord = this.getWord();
    this.winningWord = "abbey";
    for (let i = 0; i < 6; i++) {
      let row: BlockComponent[] = [];
      for (let j = 0; j < 5; j++) {
        row.push(new BlockComponent());
      }
      this.rows.push(row);
    }
     window.addEventListener("keypress", this.onKeyPressEvent.bind(this));
  }

  ngOnInit(): void {}

  public onKeyPressEvent(event: any){
    var letter: string;
    if (typeof event === "string") {
      letter = event;
    } else {
      letter = event.key;
    }
    if (letter == "Backspace") {
      if (this.currentIndex > 0) {
        this.rows[this.submitCount][this.currentIndex-1].clear();
        this.currentIndex--;
      }
    } else if (letter == "Enter") {
      if (this.currentIndex == 5) {this.submitWord();}
    } else if (!/\W|\d/g.test(letter)) {
      if (this.currentIndex < 5) {
        console.log(letter);
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
          if (this.countOfChar(letter.getLetter(), this.winningWord) == 1) { // winningWord has no duplicates
            if (this.countOfChar(letter.getLetter(), this.getWordAttempt()) > 1) {
              this.findDuplicates(i, LetterState.CORRECT);
              // we set first as partial
//               letter.setState(LetterState.PARTIAL);
              // find duplicates in attempt and set state to partial
              // add method to check if previous letters have state partial with same letter --> set to false
              this.findDuplicates(i, LetterState.PARTIAL);
            } else { // exactly no duplicates anywhere in guess or winningword  -simplest case
              letter.setState(LetterState.PARTIAL);
            }
          } else { // duplicates in winning word
            // duplicates in attempt
            if (this.countOfChar(letter.getLetter(), this.getWordAttempt()) > 1) {
              letter.setState(LetterState.PARTIAL);
              this.findDuplicates(i, LetterState.PARTIAL);
            } else {
              letter.setState(LetterState.PARTIAL); // no duplicates in attempt, so just set one to partial
            }
          }

//           if (this.countOfChar(letter.getLetter(), this.winningWord) == 1 && this.countOfChar(letter.getLetter(), this.getWordAttempt()) == 1) {
//             letter.setState(LetterState.PARTIAL);
//           } else {
//             if (this.countOfChar(letter.getLetter(), this.getWordAttempt()) <= this.countOfChar(letter.getLetter(), this.winningWord)) {
//               letter.setState(LetterState.PARTIAL);
//             } else {
//               letter.setState(LetterState.FALSE);
//             }
//           }
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

  countOfChar(letter: string, word: string): number {
    let count = 0;
    for (let i = 0; i < 5; i++) {
      if (word[i] == letter) {
        count+=1;
      }
    }
    console.log(word + " " + count);
    return count;
  }

  getWordAttempt() {
    let word = '';
    for (let i = 0; i < this.rows[this.submitCount].length; i++) {
         word += this.rows[this.submitCount][i].getLetter();
    }
    return word;
  }

  // add method to check if previous letters have state partial with same letter --> set to false
  findDuplicates(beforeNum: number, state: LetterState) {
   for (let i = 0; i < beforeNum; i++) {
    if (this.rows[this.submitCount][i].getLetter() == this.winningWord[beforeNum] && this.rows[this.submitCount][i].getState() == state) {
      // there are duplicates before
      this.rows[this.submitCount][i].setState(LetterState.FALSE);
    } else {

//       this.rows[this.submitCount][i].setState(LetterState.PARTIAL);
    }
   }
  }

  restart() {
    this.submitCount = 0;
    this.wordFilled = false;
//     this.winningWord = this.getWord();
    this.winningWord = "abbey";
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
        confetti.create(this.canvas, {resize: true})({
            particleCount: 1000,
            spread: 160,
        });
  }
}
