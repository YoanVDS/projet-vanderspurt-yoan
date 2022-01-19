import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './app/user.state.model';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public WRONG_LOGIN: boolean = false;
  public WRONG_PASSWORD: boolean = false;

  constructor(private httpClient: HttpClient) { }

  public postUser(user: User){
    return this.httpClient.post<String>(environment.apiUrl+"/user",{
      login: user.nickname,
      password: user.password,
      email: user.email,
      gender: user.gender,
      phone: user.phoneNumber,
      lastname: user.lastName,
      firstname: user.firstName,
      postaladdress: user.postalAddress.toString(),
      billingaddress: user.billingAddress.toString()
    });
  }

  public login(login: String, password: String){
    let httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
    };
    return this.httpClient.post<User>(environment.apiUrl + "/login",{
        login,
        password
    },httpOptions);
  }
}
