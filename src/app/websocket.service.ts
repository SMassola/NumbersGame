import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketService {

  connect$: Subject<void> = new Subject<void>();

  private socket = io(environment.ws_url);

  constructor() {
    this.listenForNewUsers();
  }

  listenForNewUsers() {
    this.socket.on('connect', this.handleConnection.bind(this));
  }

  connect(): Subject<MessageEvent> {
    const observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log('Received a message from websocket server');
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    };

    return Subject.create(observer, observable);
  }

  handleConnection() {
    this.connect$.next();
    this.socket.emit('helllo');
  }
}
