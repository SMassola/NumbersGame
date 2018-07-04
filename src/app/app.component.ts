import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private websocketService: WebsocketService,
    private chat: ChatService
  ) {}

  ngOnInit() {
    this.websocketService.connect$.subscribe(() => {

    });

    this.chat.messages.subscribe((message: string) => {
      console.log(message);
    });
  }

  sendMessage(): void {
    this.chat.sendMessage('Test Message');
  }
}
