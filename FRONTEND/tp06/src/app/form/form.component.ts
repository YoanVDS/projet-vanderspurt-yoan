import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from 'src/user.service';
import { PhonePipe } from '../phone.pipe';
import { UserState } from '../user.state';
import { User } from '../user.state.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() {
    this.loggedUser$.subscribe((value) =>{
      this.lastName = value.lastName;
      this.firstName = value.firstName;
      this.tel = value.phoneNumber;
      this.email = value.email;
      this.gender = value.gender;
      this.password = value.password;
      this.login = value.nickname;
      this.address = value.postalAddress.address;
      this.city = value.postalAddress.city;
      this.zip = value.postalAddress.zip;
      this.country = value.postalAddress.country;

      this.validateEmail();
      this.validatePassword();
      this.validatePhone();
    } );
   }

  @Select(UserState.GetLoggedUser) loggedUser$: Observable<User>;

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
