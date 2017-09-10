/**
 * Created by kelvin on 9/9/17.
 */
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = 'kmbwilo';
    const password = 'DHIS2014';
    const token = btoa(username + ':' + password);
    const copiedReq = req.clone({headers: req.headers.set('Authorization', 'Basic ' + token)});
    console.log('Intercepted!', copiedReq);
    return next.handle(copiedReq);
    // return null;
  }

  createAuthorizationHeader() {
    const username = 'portal';
    const password = 'Portal123';

    const token = btoa(username + ':' + password);

    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + token);

    return headers;
  }
}
