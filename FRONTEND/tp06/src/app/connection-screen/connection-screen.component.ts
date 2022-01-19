import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-connection-screen',
  templateUrl: './connection-screen.component.html',
  styleUrls: ['./connection-screen.component.css']
})
export class ConnectionScreenComponent implements OnInit {

  constructor(private userService: UserService) { }

  login: string = "";
  password: string = "";
  errorLogin: string = "Cet identifiant est inconnu, merci de vérifier ou de créer un compte.";
  errorPassword: string = "Le mot de passe est incorrect. Merci de réessayer.";
  validLogin: boolean = true;
  validPassword: boolean = true;

  ngOnInit() {
  }

  onSubmit (){
    if(this.userService.login(this.login,this.password) == null){
      if(this.userService.WRONG_LOGIN) this.validLogin = false;
      else if(this.userService.WRONG_PASSWORD) this.validPassword = false;
    }
    else{
      this.validPassword = true;
      this.validLogin = true;
      alert("Bon retour " + this.login + "!");
    }
  }

}
