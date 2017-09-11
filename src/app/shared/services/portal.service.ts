import { Injectable } from '@angular/core';
import {HttpClientService} from './http-client.service';

@Injectable()
export class PortalService {

  constructor(private http: HttpClientService) { }

  getLevel(level) {
    const num = parseInt(level, 10) + 1;
    return 'LEVEL-' + num + ';';
  }

  getAnalyticsData (url) {
    return this.http.get( url );
  }

}
