import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './../../../interfaces/user.interface';
import { UserService } from './../../../services/user/user.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.users;
  }
}
