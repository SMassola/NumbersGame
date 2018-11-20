import { Injectable } from '@angular/core';
import { WebsocketService } from './../../../websocket.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TimerService {

  time: Subject<any>;

  constructor(private websocketService: WebsocketService) {
    this.time = websocketService.connect('timer');
  }
}
