import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class HttpService {

  constructor(private http: Http) { }
  post(url, data) {
    return this.http.post(url, data);
  }
  get(url) {
    return this.http.get(url);
  }
}