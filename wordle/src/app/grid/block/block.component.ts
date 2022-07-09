import { Component, OnInit, Input } from '@angular/core';
import { LetterState } from  '../../Enums/LetterState';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  @Input() letter: string;
  @Input() state: LetterState;
  constructor() {
    this.letter = "";
    this.state = LetterState.EMPTY;
  }

  ngOnInit(): void {
  }

  getState(): LetterState {
    return this.state;
  }

  getLetter(): string {
    return this.letter;
  }

  setLetter (_letter: string) {
    console.log("set letter with " + _letter);
    this.letter = _letter;
  }
  setState (_state: LetterState) {
    this.state = _state;
  }

  clear () {
    this.setLetter("");
    this.setState(LetterState.EMPTY);
  }

  isCorrect() {
    return (this.getState() == LetterState.CORRECT);
  }
  isPartial() {
    return (this.getState() == LetterState.PARTIAL);
  }
  isEmpty() {
    return (this.getState() == LetterState.EMPTY);
  }

  isFalse() {
    return (this.getState() == LetterState.FALSE);
  }

}
