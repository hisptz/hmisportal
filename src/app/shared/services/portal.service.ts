import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';

@Injectable()
export class PortalService {

  constructor(private http: HttpClientService) {
  }

  getLevel(level) {
    const num = parseInt(level, 10) + 1;
    return 'LEVEL-' + num + ';';
  }

  getAnalyticsData(url) {
    return this.http.get1(url);
  }

  getPeriodName(period) {
    let names = '';
    if (period.length === 4) {
      names = period;
    } else {
        const year = period.substring(0, 4);
        const quater = period.substring(4, 6);
        const time = '';
        if (quater === 'Q4') {
          names = 'Oct - Dec ' + year;
        } else if (quater === 'Q3') {
          names = 'July - Sept ' + year;
        } else if (quater === 'Q2') {
          names = 'Apr - Jun ' + year;
        } else if (quater === 'Q1') {
          names = 'Jan - Mar ' + year;
        }
    }
    return names;
  }

}
