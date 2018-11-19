import { Injectable } from '@angular/core';
import { DROPZONES } from '../../constants/dropzones';

@Injectable()
export class TileService {

  moveTile(container: string, tile: HTMLElement): void {
    switch (container) {
      case DROPZONES.EQUATION:
        const { dropzone } = tile.dataset;
        if (dropzone === DROPZONES.NUMBER) {
          this.addElementToDropzone(DROPZONES.NUMBER, tile);
        } else if (dropzone === DROPZONES.OPERATOR) {
          this.removeElementFromDropzone(DROPZONES.EQUATION, tile);
        }
        return;
      case DROPZONES.OPERATOR:
        const copy = <HTMLElement>tile.cloneNode(true);
        this.addElementToDropzone(DROPZONES.EQUATION, copy);
        return;
      case DROPZONES.NUMBER:
        this.addElementToDropzone(DROPZONES.EQUATION, tile);
        return;
    }
  }

  private addElementToDropzone(dropzone: string, tile: HTMLElement): void {
    const container = document.getElementById(dropzone);
    container.appendChild(tile);
  }

  private removeElementFromDropzone(dropzone: string, tile: HTMLElement): void {
    const container = document.getElementById(dropzone);
    container.removeChild(tile);
  }
}
