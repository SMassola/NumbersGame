import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-numbers',
  templateUrl: './game-numbers.component.html',
  styleUrls: ['./game-numbers.component.scss']
})
export class GameNumbersComponent implements OnInit {

  sortableEl: any;

  @Input()
  numbers: number[];

  constructor(private el: ElementRef) { }

  ngOnInit() {

  }
}
