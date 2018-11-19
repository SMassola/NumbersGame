import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @HostBinding('attr.value')
  @Input()
  value: string;

  @HostBinding('attr.data-dropzone')
  @Input()
  type: 'operator' | 'number';

  @HostBinding('class.draggable')
  draggable = true;
}
