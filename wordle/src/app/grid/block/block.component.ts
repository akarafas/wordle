import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  letter: string;
  state: string;
  constructor() {
    this.letter = "e";
    this.state = "empty"
  }

  ngOnInit(): void {
  }
/*   getBlock() {
    return BlockComponent;
  }
  setBlock(BlockComponent block) {
    this.BlockComponent = block;
  } */
}
