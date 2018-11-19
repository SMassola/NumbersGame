import { TileService } from './../../../services/tile/tile.service';
import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { DROPZONES } from '../../../constants/dropzones';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {

  operators = [ '+', '-', '*', '/', '(', ')' ];

  constructor(private tileService: TileService) { }

  ngOnInit() {
  }

  moveTile(event): void {
    const tile = event.target.parentNode;

    if (tile.matches('app-tile')) {
      this.tileService.moveTile(DROPZONES.OPERATOR, tile);
    }
  }
}
