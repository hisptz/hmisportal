import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpClientService {
  public APIURL = 'https://hmisportal.moh.go.tz/dhis/api/25/';
  // public APIURL = 'http://127.0.0.1:9000/dhis/';
  constructor(private http: HttpClient) {
    this.http = http;
  }

  createAuthorizationHeader() {
    const username = 'portal';
    const password = 'Portal123';

    const token = btoa(username + ':' + password);

    const headers = new HttpHeaders({ Authorization: 'Basic ' + token });
    // headers.set('Authorization', 'Basic ' + token);

    return headers;
  }

  get(url): any {
    const headers: HttpHeaders = this.createAuthorizationHeader();
    return this.http.get(this.APIURL + url, {
      headers: headers
    });
  }

  get2(url): any {
    const headers: HttpHeaders = this.createAuthorizationHeader();
    return this.http.get( url, {
      headers: headers
    });
  }

  get1(url) {
    return this.http.get('../../../' + url);
  }

  post(url, data, options?): any {
    const headers: HttpHeaders = this.createAuthorizationHeader();
    return this.http.post(this.APIURL + url, data, {
      headers: headers
    });
  }

  post1(url, data, options?) {
    return this.http.post(this.APIURL + url, data);
  }
  put(url, data, options?) {
    const headers: HttpHeaders = this.createAuthorizationHeader();
    return this.http.put(this.APIURL + url, data, {
      headers: headers
    });
  }
  delete(url, options?) {
    const headers: HttpHeaders = this.createAuthorizationHeader();
    this.createAuthorizationHeader();
    return this.http.delete(this.APIURL + url, {
      headers: headers
    });
  }

}
