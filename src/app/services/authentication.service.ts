import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpService) { }

  login(user: { username: string, password: string, remember: boolean }): Observable<any> {
    return this.http.post('/authenticate/login', user)
      .map((response: Response) => {
        // login successful if there's a id in the response
        let responseObj = response.json();
        localStorage.setItem('loggedIn', responseObj.success);
        return responseObj;
      });
  }

  signup(user: { username: string, email: string, password1: string, password2: string, role: string }): Observable<any> {
    return this.http.post('/authenticate/register', user)
      .map((response: Response) => {
        // login successful if there's a id in the response
        let responseObj = response.json();
        localStorage.setItem('loggedIn', responseObj.success);
        return responseObj;
      });
  }

  logout(): void {
    this.http.get('/authenticate/logout');
    // clear id remove user from local storage to log user out
    localStorage.removeItem('loggedIn');
  }
}