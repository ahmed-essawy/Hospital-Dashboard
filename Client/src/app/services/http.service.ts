import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class HttpService {
  private headers;
  private serverURL = "http://127.0.0.1:3000/";

  constructor(private http: Http) { }
  post(endPoint, data): Observable<any> {
    this.refreshToken();
    return this.http.post(this.serverURL + endPoint, data, { headers: this.headers }).map((response: Response) => response.json());
  }
  get(endPoint): Observable<any> {
    this.refreshToken();
    return this.http.get(this.serverURL + endPoint, { headers: this.headers }).map((response: Response) => response.json());
  }
  put(endPoint, data): Observable<any> {
    this.refreshToken();
    return this.http.put(this.serverURL + endPoint, data, { headers: this.headers }).map((response: Response) => response.json());
  }
  refreshToken() {
    let localAccount = localStorage.getItem('account');
    let token = localAccount ? JSON.parse(localAccount).token : null;
    this.headers = new Headers({ 'Authorization': 'JWT ' + token });
  }
}