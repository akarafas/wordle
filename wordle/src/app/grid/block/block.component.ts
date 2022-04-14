import { Component, OnInit, Input } from '@angular/core';
import { LetterState } from  '../../Enums/LetterState';
@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  @Input() letter: string;
  state: LetterState;
  constructor() {
    this.letter = "";
    this.state = LetterState.EMPTY;
  }

  ngOnInit(): void {
  }
/*   getBlock() {
    return BlockComponent;
  }
  setBlock(BlockComponent block) {
    this.BlockComponent = block;
  } */
  setLetter (_letter: string) {
    this.letter = _letter;
  }
  setState (_state: LetterState) {
    this.state = _state;
  }

  clear () {
    this.letter = "";
    this.state = LetterState.EMPTY;
  }
  isCorrect() {
    return this.state = LetterState.CORRECT;
  }
  isPartial() {
    return this.state = LetterState.PARTIAL;
  }
  isFalse() {
    return this.state = LetterState.FALSE;
  }
  isEmpty() {
    return this.state = LetterState.EMPTY;
  }

  getStyle() {
      if (this.state = LetterState.CORRECT) {

      } else if (this.state = LetterState.PARTIAL) {

      } else if (this.state = LetterState.FALSE) {

      } else if (this.state = LetterState.EMPTY) {

      }

  }

}
