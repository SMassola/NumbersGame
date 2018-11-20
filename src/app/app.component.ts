import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showLogin: boolean = true;

  constructor(
    private websocketService: WebsocketService
  ) {}

  ngOnInit() {
  }

  joinGame(username: string): void {
    this.showLogin = false;
    this.websocketService.joinGame(username);
  }
}
