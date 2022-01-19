import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserService } from 'src/user.service';
import { Address } from '../address';
import { AddUser, SetLoggedUser } from '../user.action';
import { UserState } from '../user.state';
import { User } from '../user.state.model';

@Component({
  selector: 'app-connection-screen',
  templateUrl: './connection-screen.component.html',
  styleUrls: ['./connection-screen.component.css']
})
export class ConnectionScreenComponent implements OnInit {

  constructor(private store: Store, private userService: UserService) { }

  login: string = "";
  password: string = "";
  errorLogin: string = "Cet identifiant est inconnu, merci de vérifier ou de créer un compte.";
  errorPassword: string = "Le mot de passe est incorrect. Merci de réessayer.";
  validLogin: boolean = true;
  validPassword: boolean = true;

  @Select(UserState.GetLoggedUserNick) loggedUser$: Observable<string>;

  ngOnInit() {
  }

  onSubmit (){
    this.userService.login(this.login,this.password).subscribe((user)=>{
      this.userService.getAddress(user.bddId, 'postal').subscribe((address =>{
        user.postalAddress = address;
        user.addresses = new Array<Address>();
        user.addresses.push(address);
      }));
      this.userService.getAddress(user.bddId, 'billing').subscribe((address =>{
        user.billingAddress = address;
        if(!user.addresses.includes(address)) user.addresses.push(address);
      }));
      this.store.dispatch(new AddUser(user));
      this.store.dispatch(new SetLoggedUser(user));
      this.loggedUser$.subscribe(
        value => { alert("Bonjour "+ value +"!");}
      );
    }, (error) => { alert("Utilisateur non reconnu")});
  }

}
