import { Component, OnInit } from '@angular/core';
import { GameRoomService } from './game-room.service';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {

  containers;

  numbers: number[] = [];
  targetNumber: number;

  countOfSmalls: number;
  countOfBigs: number;

  constructor(private gameRoomService: GameRoomService) { }

  ngOnInit() {
    this.initializeRoom();
  }

  initializeRoom() {
    this.initializeService();
    this.getNumberDistribution();
    this.generateTargetNumber();
    this.generateNumbers();
  }

  initializeService() {
    this.gameRoomService.initialize();
  }

  getNumberDistribution(): void {
    this.countOfSmalls = Math.floor((Math.random() * 4)) + 3;
    this.countOfBigs = 6 - this.countOfSmalls;
  }

  generateTargetNumber() {
    this.targetNumber = Math.floor(Math.random() * 900) + 100;
  }

  generateNumbers(): void {
    for (let i = 0; i < this.countOfSmalls; i++) {
      this.numbers.push(Math.floor(Math.random() * 9) + 1);
    }

    for (let i = 0; i < this.countOfBigs; i++) {
      this.numbers.push((Math.floor(Math.random() * 4) + 1) * 25);
    }
  }
}
