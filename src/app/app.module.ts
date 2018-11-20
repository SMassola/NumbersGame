import { UserService } from './services/user/user.service';
import { GameStateService } from './services/game-state/game-state.service';
import { TileService } from './services/tile/tile.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ChatService } from './chat.service';
import { WebsocketService } from './websocket.service';
import { TileComponent } from './components/presentational/tile/tile.component';
import { EquationComponent } from './components/containers/equation/equation.component';
import { GameRoomComponent } from './components/containers/game-room/game-room.component';
import { GameNumbersComponent } from './components/containers/game-numbers/game-numbers.component';
import { OperatorsComponent } from './components/containers/operators/operators.component';
import { GameRoomService } from './components/containers/game-room/game-room.service';
import { UserIndexComponent } from './components/containers/user-index/user-index.component';
import { UserComponent } from './components/presentational/user/user.component';
import { EquationService } from './components/containers/equation/equation.service';
import { LoginComponent } from './components/modals/login/login.component';
import { TimerComponent } from './components/presentational/timer/timer.component';
import { TimerService } from './components/presentational/timer/timer.service';

@NgModule({
  declarations: [
    AppComponent,
    TileComponent,
    EquationComponent,
    GameRoomComponent,
    GameNumbersComponent,
    OperatorsComponent,
    UserIndexComponent,
    UserComponent,
    LoginComponent,
    TimerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    ChatService,
    WebsocketService,
    GameRoomService,
    TileService,
    UserService,
    GameStateService,
    EquationService,
    TimerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
