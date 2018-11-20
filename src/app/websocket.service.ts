import { User } from './interfaces/user.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketService {

  private socket = io(environment.ws_url);

  constructor() {}

  connect(connection: string): Subject<MessageEvent> {
    const observable = new Observable(observer => {
      this.socket.on(connection, (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit(connection, JSON.stringify(data));
      }
    };

    return Subject.create(observer, observable);
  }

  joinGame(username: string): void {
    this.socket.emit('new-user-joined', username);
  }

  scorePoint(): void {
    this.socket.emit('point-scored', this.socket.id);
  }
}
