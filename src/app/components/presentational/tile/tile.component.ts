import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input()
  value: string;

  @HostBinding('attr.data-dropzone')
  @Input()
  type: 'operator' | 'number';

  @HostBinding('class.draggable')
  draggable = true;
}
