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

  async addUser(): Promise<void> {
    const postalAddress = new Address(this.address, this.city, this.zip,  this.country);
    const user = new User(this.login,this.password,[postalAddress],postalAddress,postalAddress,this.email,this.gender,this.firstName,this.lastName,this.tel,null);
    user.bddId = parseInt(await this.userService.postUser(user).toPromise().then(result => {
      return result;
    }));
    
    this.userService.postAddress(user.bddId, postalAddress, 'postal').subscribe();
    this.userService.postAddress(user.bddId, postalAddress, 'billing').subscribe();
    
    
    this.store.dispatch(new AddUser(user));
    this.store.dispatch(new SetLoggedUser(user));
    this.loggedUser$.subscribe(
      value => { alert("Bienvenue "+ value +"!");}
    );
  }

  async updateUser(): Promise<void> {
    const postalAddress = new Address(this.address, this.city, this.zip,  this.country);
    const user = new User(this.login,this.password,[postalAddress],postalAddress,postalAddress,this.email,this.gender,this.firstName,this.lastName,this.tel,null);
    user.bddId = parseInt(await this.userService.postUser(user).toPromise().then(result => {
      return result;
    }));
    
    this.userService.postAddress(user.bddId, postalAddress, 'postal').subscribe();
    this.userService.postAddress(user.bddId, postalAddress, 'billing').subscribe();
    
    
    this.store.dispatch(new AddUser(user));
    this.store.dispatch(new SetLoggedUser(user));
    this.loggedUser$.subscribe(
      value => { alert("Informations mises à jour!"); }
    );
  }
}
