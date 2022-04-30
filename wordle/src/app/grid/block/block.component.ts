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
//     console.log(this.state);
    return this.state;
  }

  getLetter(): string {
    return this.letter;
  }

  setLetter (_letter: string) {
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

  getStyle(): string {
      if (this.getState() == LetterState.CORRECT) {
        console.log("hi");
        return 'bg-success';
      } else if (this.getState() == LetterState.PARTIAL) {
        return 'bg-warning';
      } else if (this.getState() == LetterState.FALSE) {
        return 'bg-dark';
      } else if (this.getState() == LetterState.EMPTY) {
        return 'bg-secondary';
      }
      return 'bg-danger';
  }

}
