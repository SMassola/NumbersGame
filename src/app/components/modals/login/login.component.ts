import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  @Output()
  joinSession: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  joinGame(): void {
    const { username } = this.form.value;

    this.joinSession.emit(username);
  }
}
