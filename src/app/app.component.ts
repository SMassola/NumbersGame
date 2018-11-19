import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { WebsocketService } from './websocket.service';
import { GameStateService } from './services/game-state/game-state.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private websocketService: WebsocketService,
    private chat: ChatService,
    private gameStateService: GameStateService
  ) {}

  ngOnInit() {
    // this.websocketService.connect$.subscribe(() => {

    // });

    this.chat.messages.subscribe((message: string) => {
      console.log(message);
    });
  }

  // sendMessage(): void {
  //   this.chat.sendMessage('Test Message');
  // }

  resetGame() {
    this.websocketService.resetGame();
  }
}
