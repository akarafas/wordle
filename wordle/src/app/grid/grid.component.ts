import { Component, OnInit } from '@angular/core';
import { BlockComponent } from "C:/Users/Angel/IdeaProjects/wordle/wordle/src/app/grid/block/block.component";
import { LetterState } from '../Enums/LetterState';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  winningWord: string = "hands";
  rows: any[] = [];
  submitCount: number;
  wordFilled: boolean;
  currentIndex: number = 0;
  constructor() {
    this.submitCount = 0;
    this.wordFilled = false;
    for (let i = 0; i < 6; i++) {
      let row: BlockComponent[] = [];
      for (let j = 0; j < 5; j++) {
        row.push(new BlockComponent());
      }
      this.rows.push(row);
    }
      window.addEventListener("keydown", this.onKeyPressEvent.bind(this));
  }

  ngOnInit(): void {  }

  onKeyPressEvent(event: any){
    const letter: string = event.key;
    if (letter == "Backspace") {
      // clear
      if (this.currentIndex > 0) {
        this.rows[this.submitCount][this.currentIndex-1].clear();
        this.currentIndex--;
      }
    } else if (letter == "Enter") {
      this.submitWord();
    } else if (!/\W|\d/g.test(letter)) {
      if (this.currentIndex < 5) {
        this.rows[this.submitCount][this.currentIndex].setLetter(letter);
        this.currentIndex++;
      }
    }
  }

  submitWord() {
    if (this.submitCount < 6) {
    for (let i = 0; i < this.rows[this.submitCount].length; i++) {
     const letter = this.rows[this.submitCount][i];
     if (letter.getLetter() == this.winningWord[i]) {
     // make sure using setters everywhere
      letter.setState(LetterState.CORRECT);
     } else if (this.winningWord.includes(letter.getLetter())) {
      letter.setState(LetterState.PARTIAL);
     } else {
      letter.setState(LetterState.FALSE);
     }
    console.log(letter);
    }
    this.submitCount += 1;
    this.currentIndex = 0;
    }
  }

}
