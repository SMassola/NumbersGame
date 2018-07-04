import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ChatService {

  messages: Subject<any>;

  constructor(private websocketService: WebsocketService) {
    this.messages = websocketService
      .connect();
  }

  sendMessage(message: string): void {
    this.messages.next(message);
  }
}
