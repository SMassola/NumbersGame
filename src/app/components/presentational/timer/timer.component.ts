import { TimerService } from './timer.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  time: Subject<number>;

  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.time = this.timerService.time;
  }
}
