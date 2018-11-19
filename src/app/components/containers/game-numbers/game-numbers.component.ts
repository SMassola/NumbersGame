import { TileService } from './../../../services/tile/tile.service';
import { Component, ElementRef, Input } from '@angular/core';
import { DROPZONES } from '../../../constants/dropzones';

@Component({
  selector: 'app-game-numbers',
  templateUrl: './game-numbers.component.html',
  styleUrls: ['./game-numbers.component.scss']
})
export class GameNumbersComponent {

  sortableEl: any;

  @Input()
  numbers: number[];

  constructor(private tileService: TileService, private el: ElementRef) { }

  moveTile(event): void {
    const tile: HTMLElement = event.target.parentNode;

    if (tile.matches('app-tile')) {
      this.tileService.moveTile(DROPZONES.NUMBER, tile);
    }
  }
}
