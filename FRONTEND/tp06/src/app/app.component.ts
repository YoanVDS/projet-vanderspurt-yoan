import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from './user.state';
import { User } from './user.state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet';
  @Select(UserState.GetLoggedUser) loggedUser$: Observable<User>;
}
