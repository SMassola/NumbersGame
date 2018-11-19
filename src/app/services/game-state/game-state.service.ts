import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { filter } from 'rxjs/operators/filter';
import { WebsocketService } from '../../websocket.service';

@Injectable()
export class GameStateService {

  gameState: Observable<any>;

  constructor(private websocketService: WebsocketService) {
    this.gameState = merge(
      websocketService.connect('game-state-updated'),
      websocketService.connect('game-state-fetched')
    ).pipe(
      filter((gameState) => gameState !== null)
    );
  }
}
