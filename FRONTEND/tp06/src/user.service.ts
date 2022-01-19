import { HttpClient } from '@angular/common/http';
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

  public postUser(login: String, password: String){
    return this.httpClient.post<String>(environment.apiUrl+"/user",{
      login: login,
      password: password      
    });
  }

  public login(login: String, password: String) : User {
    let user;
    this.httpClient.get<User>(environment.apiUrl + "/user/?login="+login+"&password="+password)
          .toPromise().then(user_returned => user = user_returned);
    if(user != null && (user as User).password != password){
      this.WRONG_PASSWORD = true;
      return null;
    }
    if(user == null){
      this.WRONG_LOGIN = true;
      return null;
    }
    //This logic may be refactored
    return user;
  }
}
