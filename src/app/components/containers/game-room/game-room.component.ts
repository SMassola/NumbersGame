import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GameRoomService } from './game-room.service';
import { GameStateService } from '../../../services/game-state/game-state.service';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {

  gameState: Observable<any>;

  constructor(
    private gameRoomService: GameRoomService,
    private gameStateService: GameStateService
  ) { }

  ngOnInit() {
    this.subscribeToGameState();
    this.initializeService();
  }

  subscribeToGameState(): void {
    this.gameState = this.gameStateService.gameState;
  }

  initializeService(): void {
    this.gameRoomService.initialize();
  }
}
