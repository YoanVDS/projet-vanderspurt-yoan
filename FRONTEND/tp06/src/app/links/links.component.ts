import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from '../user.state';
import { User } from '../user.state.model';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
  @Select(UserState.GetLoggedUser) loggedUser$: Observable<User>;
  constructor() { }

  ngOnInit() {
  }

}
