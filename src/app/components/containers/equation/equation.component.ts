import { EquationService } from './equation.service';
import { GameStateService } from './../../../services/game-state/game-state.service';
import { TileService } from './../../../services/tile/tile.service';
import { OnInit, AfterViewInit, Component, ElementRef } from '@angular/core';
import { DROPZONES } from '../../../constants/dropzones';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.scss']
})
export class EquationComponent implements OnInit, AfterViewInit {

  answer: number | 'No Tiles' = 'No Tiles';
  currentTarget: number;

  constructor(
    private equationService: EquationService,
    private gameStateService: GameStateService,
    private tileService: TileService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.subscribeToGameStateReset();
  }

  ngAfterViewInit() {
    const observer = new MutationObserver((mutations) => {
      this.calculateExpression();
    });

    observer.observe(this.el.nativeElement.querySelector('ul'), { childList: true });
  }

  moveTile(event): void {
    const tile = event.target.parentNode;

    if (tile.matches('app-tile')) {
      this.tileService.moveTile(DROPZONES.EQUATION, tile);
    }
  }

  calculateExpression(): void {
    const equationEl = this.el.nativeElement.querySelector('ul');

    const numberTilesInSuccession = this.checkForConsecutiveNumberTiles(equationEl);

    if (numberTilesInSuccession) {
      return;
    }

    try {
      // Gotta find a better solution than using eval
      this.answer = eval(equationEl.innerText.replace(/\s/g, '')) || 'No Tiles';
    } catch (e) {
    }

    if (this.answer === this.currentTarget) {
      this.equationService.scorePointForUser();
    }
  }

  checkForConsecutiveNumberTiles(el): boolean {
    for (let i = 1; i < el.children.length; i++) {
      if (!isNaN(el.children[i].innerText) && !isNaN(el.children[i - 1].innerText)) {
        return true;
      }
    }

    return false;
  }

  subscribeToGameStateReset(): void {
    this.gameStateService.gameState.subscribe((gameState) => {
      this.currentTarget = gameState.target;
      this.resetTiles();
    });
  }

  resetTiles(): void {
    const tiles = Object.assign([], ...this.el.nativeElement.querySelector('ul').children);

    tiles.forEach((tile) => {
      this.tileService.moveTile(DROPZONES.EQUATION, tile);
    });
  }
}
