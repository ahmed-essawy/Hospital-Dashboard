import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class HttpService {
  private serverURL = "http://127.0.0.1:3000/"

  constructor(private http: Http) { }
  post(endPoint, data) {
    return this.http.post(this.serverURL + endPoint, data);
  }
  get(endPoint) {
    return this.http.get(this.serverURL + endPoint);
  }
}