import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  word: string = "wordl";
  constructor() {
  }

  ngOnInit(): void {

  }
      onKeypressEvent(event: any){
         event.target.value = event.target.value.replace(/\W|\d/g, '').substr(0, 1).toUpperCase();
         console.log(event.target.value);
//          this.letter = event.target.value;
      }

}
