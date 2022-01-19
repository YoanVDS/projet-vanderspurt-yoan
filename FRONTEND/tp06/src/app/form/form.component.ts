import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from 'src/user.service';
import { PhonePipe } from '../phone.pipe';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }

  lastName: string = "";
  firstName: string = "";
  address: string = "";
  zip: string = "";
  city: string = "";
  tel: string = "";
  email: string = "";
  gender: string = "";
  password: string = "";
  login: string = "";
  country: string = "";
  validated: boolean = false;
  validEmail: boolean = false;
  validPassword: boolean = false;
  validPhone: boolean = false;
  errorPassword: string = "Merci de saisir un mot de passe";

  validateEmail(){
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.validEmail = regexp.test(this.email);
  }

  validatePassword(){
    this.validPassword = false;
    var regexLength = new RegExp("(?=.{8,})");
    var regexMinMaj = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
    var regexNumber = new RegExp("(?=.*[0-9])");
    if(!regexLength.test(this.password)){
      this.errorPassword = "Merci de saisir un mot de passe de plus de 8 caractères.";
      return;
    }   
    if(!regexMinMaj.test(this.password)){
        this.errorPassword ="Merci de saisir un mot de passe contenant au moins une minuscule et une majuscule";
        return;
    }     
    if(!regexNumber.test(this.password)){
        this.errorPassword = "Merci de saisir un mot de passe contenant au moins un chiffre";
        return;
    }
    this.validPassword = true;
  }

  validatePhone(){
    this.validPhone = this.tel.length == 10;
  }
  onSubmit () {
    this.validated = true;
    }

  ngOnInit(): void {
  }

}
