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
    return this.http.post(this.endPoint + 'login', user)
      .map((response: Response) => {
        // login successful if there's a id in the response
        let responseObj = response.json();
        if (responseObj.success) {
          localStorage.setItem('account', JSON.stringify(responseObj.account));
          return responseObj.account;
        }
        return responseObj;
      });
  }

  signup(user: FormData): Observable<any> {
    return this.http.post(this.endPoint + 'register', user)
      .map((response: Response) => {
        // login successful if there's a id in the response
        let responseObj = response.json();
        if (responseObj.success) {
          localStorage.setItem('account', JSON.stringify(responseObj.account));
          return responseObj.account;
        }
        return responseObj;
      });
  }

  logout(): Observable<any> {
    return this.http.get(this.endPoint + 'logout')
      .map((response: Response) => {
        localStorage.removeItem('account');
        return response.json();
      });
  }
}