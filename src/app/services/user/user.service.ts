import { WebsocketService } from './../../websocket.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { User } from '../../interfaces/user.interface';

@Injectable()
export class UserService {

  users: Observable<User[]>;

  constructor(private websocketService: WebsocketService) {
    this.users = websocketService.connect('user-list-updated')
      .asObservable()
      .pipe(
        map(users => this.getArrayOfUsers(users))
      );
  }


  getArrayOfUsers(users): User[] {
    const userIndex = [];
    for (const id in users) {
      if (id) {
        userIndex.push(users[id]);
      }
    }

    return userIndex;
  }
}
