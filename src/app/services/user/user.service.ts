import { WebsocketService } from './../../websocket.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  users: Subject<any>;

  constructor(private websocketService: WebsocketService) {
    this.users = websocketService
      .connect('user-list-updated');
  }
}
