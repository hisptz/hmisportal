import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/application.state';
import {Observable} from 'rxjs/Observable';
import * as selectors from '../store/selectors';
import * as dataactions from '../store/actions/store.data.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  years$: Observable<any[]>;
  organisationUnits$: Observable<any[]>;
  constructor(private store: Store<ApplicationState>) {
    this.store.dispatch(new dataactions.SetPageAction('dashboard'));
    this.years$ = this.store.select(selectors.getYears);
    this.organisationUnits$ = this.store.select(selectors.getOrganisationUnits);
  }

  ngOnInit() {
    this.store.select(selectors.getPortalItems).subscribe(
      (data) => {
        data.forEach( (item) => {
          console.log('item', item);
        });
      }
    );
  }

  updatePortal() {
    console.log('it works');
  }

  updateOrgunit(ou) {
    console.log(ou);
    this.updatePortal();
  }

  updatePeriod(pe) {
    console.log(pe);
    this.updatePortal();
  }
}
