import { WebsocketService } from './../../../websocket.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import * as io from 'socket.io-client';


@Injectable()
export class EquationService {

  constructor(private websocketService: WebsocketService) { }

  scorePointForUser(): void {
    this.websocketService.scorePoint();
  }

}
