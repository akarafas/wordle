import { Component, OnInit } from '@angular/core';
import { BlockComponent } from "C:/Users/Angel/IdeaProjects/wordle/wordle/src/app/grid/block/block.component";
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  word: string = "wordl";
  blocks: any[] = [];
  submitCount: number;
  wordFilled: boolean;
  constructor() {
    this.submitCount = 0;
    this.wordFilled = false;
    for (let i = 0; i <30; i++) {
      this.blocks.push(new BlockComponent());
    }
  }

  ngOnInit(): void {  }

  onKeypressEvent(event: any){
     event.target.value = event.target.value.replace(/\W|\d/g, '').substr(0, 1).toUpperCase();
     console.log(event.target.value);
     if (this.wordFilled) {
      if (this.submitCount == 0) {
          console.log("5");

      } else if (this.submitCount == 1) {
          console.log("5");

      } else if (this.submitCount == 2) {
          console.log("5");

      } else if (this.submitCount == 3) {
          console.log("5");

      } else if (this.submitCount == 4) {
          console.log("5");

      } else if (this.submitCount == 5) {
          console.log("5");
      }
     }
//      this.letter = event.target.value;
// set letter by replacing empty block with a new block with that letter
// if backspace is pressed, replace block with new empty block

  }
  submitWord() {
    this.submitCount+=1;
  }


}
