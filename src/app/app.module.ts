import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChatService } from './chat.service';
import { WebsocketService } from './websocket.service';
import { TileComponent } from './components/presentational/tile/tile.component';
import { EquationComponent } from './components/containers/equation/equation.component';
import { GameRoomComponent } from './components/containers/game-room/game-room.component';
import { GameNumbersComponent } from './components/containers/game-numbers/game-numbers.component';
import { OperatorsComponent } from './components/containers/operators/operators.component';
import { GameRoomService } from './components/containers/game-room/game-room.service';

@NgModule({
  declarations: [
    AppComponent,
    TileComponent,
    EquationComponent,
    GameRoomComponent,
    GameNumbersComponent,
    OperatorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ChatService,
    WebsocketService,
    GameRoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
