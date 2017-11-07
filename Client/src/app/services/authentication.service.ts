import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  private endPoint = "authenticate/";

  constructor(private http: HttpService) { }

  login(user: { username: string, password: string, remember: boolean }): Observable<any> {
    return this.http.post(this.endPoint + 'login', user).map(this.saveLoginResponse);
  }

  signup(user: FormData): Observable<any> {
    return this.http.post(this.endPoint + 'register', user).map(this.saveLoginResponse);
  }

  logout(): Observable<any> {
    return this.http.get(this.endPoint + 'logout')
      .map((response) => {
        localStorage.removeItem('account');
        return response;
      });
  }

  saveLoginResponse(response) {
    // login successful if there's a id in the response
    if (response.success) {
      let account = {
        name: response.account.name || response.account.firstname + " " + response.account.lastname,
        firstname: response.account.firstname,
        lastname: response.account.lastname,
        picture: response.account.picture,
        email: response.email,
        username: response.username,
        token: response.token
      };
      localStorage.setItem('account', JSON.stringify(account));
      return true;
    }
    return false;
  }
}