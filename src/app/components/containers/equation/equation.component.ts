import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TileComponent } from '../../presentational/tile/tile.component';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.scss']
})
export class EquationComponent implements AfterViewInit {

  answer = 'No Tiles';

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const observer = new MutationObserver((mutations) => {
      this.calculateExpression();
    });

    observer.observe(this.el.nativeElement.querySelector('ul'), { childList: true });
  }

  calculateExpression() {
    const equationEl = this.el.nativeElement.querySelector('ul');
    this.answer = 'No Tiles';

    const numberTilesInSuccession = this.checkForConsecutiveNumberTiles(equationEl);

    if (numberTilesInSuccession) {
      this.answer = 'Invalid!';
      return;
    }

    try {
      // Gotta find a better solution than using eval
      this.answer = eval(equationEl.innerText.replace(/\s/g, '')) || 'No Tiles';
    } catch (e) {
      this.answer = 'Invalid!';
    }
  }

  checkForConsecutiveNumberTiles(el) {
    for (let i = 1; i < el.children.length; i++) {
      if (!isNaN(el.children[i].innerText) && !isNaN(el.children[i - 1].innerText)) {
        return true;
      }
    }

    return false;
  }
}
