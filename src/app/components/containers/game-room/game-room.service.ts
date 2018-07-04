import { Injectable } from '@angular/core';
import { DROPZONES } from '../../../constants/dropzones';
import { DRAGGABLE_EVENTS, SORTABLE_EVENTS } from '../../../constants/events';

let Sortable = null;

if (typeof window !== 'undefined') {
  Sortable = require('@shopify/draggable').Sortable;
}

@Injectable()
export class GameRoomService {
  dropzones: any;
  currentTileType: string;
  answer: string;

  initialize() {
    this.setDropzones();
    this.setUpSortListeners();
  }

  private setDropzones(): void {
    this.dropzones = new Sortable(document.querySelectorAll('ul'), {
      draggable: '.draggable'
    });
  }

  private setUpSortListeners() {
    this.listenForDragStartEvent();
    this.listenForSortEvent();
    this.listenForDragStopEvent();
    this.listenForSortSortedEvent();
  }

  private listenForDragStartEvent(): void {
    this.dropzones.on(DRAGGABLE_EVENTS.START, (evt) => {
      this.currentTileType = evt.data.source.dataset.dropzone;
    });
  }

  private listenForSortEvent(): void {
    this.dropzones.on(SORTABLE_EVENTS.SORT, (evt) => {
      const sourceContainer = evt.data.dragEvent.data.sourceContainer;
      const overContainer = evt.data.dragEvent.data.overContainer;

      // Prevents operator tiles from sorting
      if (sourceContainer && sourceContainer.dataset.dropzone === DROPZONES.EQUATION &&
        overContainer.dataset.dropzone === DROPZONES.OPERATOR) {
        evt.cancel();
      }

      const dropzone = evt.dragEvent.overContainer.dataset.dropzone;

      // Allows sorting if the dropzone is the equation area or if the dropzone matches the current tile
      if (dropzone === this.currentTileType || dropzone === DROPZONES.EQUATION) {
         return;
      }

      evt.cancel();
    });
  }

  private listenForDragStopEvent(): void {
    this.dropzones.on(DRAGGABLE_EVENTS.STOP, (evt) => {
    });
  }

  private listenForSortSortedEvent(): void {
    this.dropzones.on(SORTABLE_EVENTS.SORTED, (evt) => {
      const oldDropzone = evt.data.oldContainer.dataset.dropzone;
      const newDropzone = evt.data.newContainer.dataset.dropzone;

      // Clones tile if an operator tile is dragged to equation dropzone
      if (oldDropzone === DROPZONES.OPERATOR && newDropzone === DROPZONES.EQUATION) {
        const original = evt.data.dragEvent.data.originalSource;
        const clone = original.cloneNode(true);


        // Remove display: none
        clone.style = '';
        evt.data.oldContainer.insertBefore(clone, original);
      }

      // Removes tile from opreator dropzone that is being dragged back in
      if (oldDropzone === DROPZONES.EQUATION && newDropzone === DROPZONES.OPERATOR) {
        const original = evt.data.dragEvent.data.originalSource;
        const clone = [].find.call(
          evt.data.newContainer.children,
          (node) => node.attributes.value.textContent === original.attributes.value.textContent
        );

        evt.data.newContainer.removeChild(clone);
      }
    });
  }
}
