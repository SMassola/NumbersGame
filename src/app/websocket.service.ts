import { User } from './interfaces/user.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketService {

  private socket = io(environment.ws_url);

  constructor() {
    this.listenForNewUsers();
  }

  listenForNewUsers() {
    this.socket.on('connect', () => {
      this.socket.emit('new-user-connected', 'test-username');
      this.socket.emit('fetch-game-state', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      this.socket.emit('remove-user');
    });
  }

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

  resetGame(): void {
    this.socket.emit('new-game');
  }

  scorePoint(): void {
    this.socket.emit('point-scored', this.socket.id);
  }
}
