import { Component, OnInit, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserService } from 'src/user.service';
import { Address } from '../address';
import { BasketState } from '../basket.state';
import { AddUser, SetLoggedUser } from '../user.action';
import { UserState } from '../user.state';
import { User } from '../user.state.model';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {

  @Input() lastName: string = "";
  @Input() firstName: string = "";
  @Input() address: string = "";
  @Input() zip: string = "";
  @Input() city: string = "";
  @Input() tel: string = "";
  @Input() email: string = "";
  @Input() gender: string = "";
  @Input() password: string = "";
  @Input() login: string = "";
  @Input() country: string = "";

  constructor(private store: Store, private userService: UserService) { }

  @Select(UserState.GetLoggedUserNick) loggedUser$: Observable<string>;

  ngOnInit(): void {
  }

  addUser(): void {
    const postalAddress = new Address(this.address, this.city, this.zip,  this.country);
    const user = new User(this.login,this.password,[postalAddress],postalAddress,postalAddress,this.email,this.gender,this.firstName,this.lastName,this.tel);
    this.userService.postUser(user).toPromise().then(result => alert("User added to database successfully"));
    this.store.dispatch(new AddUser(user));
    this.store.dispatch(new SetLoggedUser(user));
    this.loggedUser$.subscribe(
      value => { alert("Bienvenue "+ value +"!");}
    );
  }
}
